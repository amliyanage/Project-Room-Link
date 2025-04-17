import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView , Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { get, getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';

interface UnitProps {
  number: number;
  power: boolean;
  onPress: () => void;
}

const firebaseConfig = {
  apiKey: "AIzaSyDFlIfVGNnMghi1mCYpIwBP7K-Nn7dnxsw",
  authDomain: "room-controller-455409.firebaseapp.com",
  databaseURL: "https://room-controller-455409-default-rtdb.firebaseio.com",
  projectId: "room-controller-455409",
  storageBucket: "room-controller-455409.firebasestorage.app",
  messagingSenderId: "61515720724",
  appId: "1:61515720724:web:05aeee59a97ee9c4085f01"
};

const Unit = ({ number, power, onPress }: UnitProps) => (
  <TouchableOpacity style={[styles.unit , { borderColor: power ? '#4CAF50' : '#F44336' }]} onPress={onPress}>
    <Text style={styles.unitText}>U{number}</Text>
    <Text style={styles.powerText}>
      Power: <Text style={{ color: power ? '#4CAF50' : '#F44336' }}>{power ? 'ON' : 'OFF'}</Text>
    </Text>
  </TouchableOpacity>
);

export default function HomePage() {
  const [mainPower, setMainPower] = React.useState(false);
  const [units, setUnits] = React.useState(Array(6).fill(true));
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app); 

  const toggleUnit = (index: number) => {
    const result = units[index] ? 'OFF' : 'ON';
    const relayRef = ref(database, `/relayArry/relay${index + 1}`);
    
    set(relayRef, result)
      .then(() => {
        const updatedUnits = [...units];
        updatedUnits[index] = !units[index];
        setUnits(updatedUnits);
      })
      .catch((error) => {
        console.error('Error writing to database:', error);
      });
  };
  

  useEffect(() => {
    const relayArry = ref(getDatabase(), '/relayArry');

    get(relayArry).then((snapshot) => {
      if (snapshot.exists()){
        console.log(snapshot.val())
        const result : {
          relay1 : string,
          relay2 : string,
          relay3 : string,
          relay4 : string,
        } = snapshot.val();

        setUnits(
          [result.relay1 === 'ON', result.relay2 === 'ON', result.relay3 === 'ON', result.relay4 === 'ON']
        )

        setMainPower(result.relay1 === 'ON' && result.relay2 === 'ON' && result.relay3 === 'ON' && result.relay4 === 'ON')

      }
    });


  }, []);

  const toggleMainPower = () => {
    const result = mainPower ? 'OFF' : 'ON';
    const newUnits = [...units];
  
    const updates = units.map((_, index) => {
      const relayRef = ref(database, `/relayArry/relay${index + 1}`);
      return set(relayRef, result)
        .then(() => {
          newUnits[index] = result === 'ON';
        });
    });
  
    Promise.all(updates)
      .then(() => {
        setUnits(newUnits);
        setMainPower(result === 'ON');
      })
      .catch((error) => {
        console.error('Error updating all relays:', error);
      });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RoomLink</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Remote Is Ready</Text>

      <View style={styles.mainPowerContainer}>
        <TouchableOpacity
          style={[styles.mainPowerButton, { opacity: mainPower ? 1 : 0.7 }, { borderColor: mainPower ? '#4CAF50' : '#F44336' }]}
          onPress={() => toggleMainPower()}
        >
          <Ionicons name="power" size={40} color={mainPower ? '#4CAF50' : '#F44336'} />
        </TouchableOpacity>
        <Text style={styles.powerStatus}>
          Power: <Text style={{ color: mainPower ? '#4CAF50' : '#F44336' }}>{mainPower ? 'ON' : 'OFF'}</Text>
        </Text>
      </View>

      <View style={styles.unitsGrid}>
        {units.map((power, index) => (
          <Unit
            key={index}
            number={index + 1}
            power={power}
            onPress={() => toggleUnit(index)}
          />
        ))}
      </View>

      <LinearGradient
        colors={['#00D2FF', '#3A7BD5']}
        style={styles.temperatureCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.temperatureContent}>
        <Image
        source={require('../../assets/sun-icon.png')}
        style={styles.img}
      />
          <Text style={styles.temperature}>27°</Text>
          <View>
            <Text style={styles.tempLabel}>Normal Temp</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color="white" />
              <Text style={styles.location}>In Your Room</Text>
            </View>
          </View>
          <Ionicons name="sunny" size={44} color="white" />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2B48C',
    padding: 20,
    paddingVertical: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 8,
  },
  mainPowerContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  mainPowerButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  powerStatus: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  unitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  unit: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
  },
  unitText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  powerText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  temperatureCard: {
    borderRadius: 20,
    padding: 20,
    height: 130,
    marginTop: 'auto',
  },
  temperatureContent: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temperature: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  tempLabel: {
    color: 'white',
    fontSize: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    color: 'white',
    marginLeft: 5,
  },
  img : {
    position: 'absolute',
    top: -20,
    left: 120,
  }
}); 