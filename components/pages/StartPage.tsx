import { Text, View, StyleSheet, ImageBackground , TouchableOpacity } from "react-native";

const StartPage = () => {
    return (
        <ImageBackground
            source={require('../../assets/page-bg/start-page.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.mainText}>Welcome to Room Link</Text>
                <Text style={styles.para}>" Control your lights and plugs, automate your home, and monitor energy usage effortlessly. "</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get Start</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    container : {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingBottom: 105,
        width: '100%',
    },
    mainText : {
        color: '#fff',
        fontSize: 23,
        fontWeight: 600,
        paddingBottom: 20,
    },
    para : {
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        paddingBottom: 29,
        fontWeight: 400,
    },
    button : {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: "#4C3D32",
        borderRadius: 130,
        width: "100%",
        alignItems: 'center',
    },
    buttonText : {
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        paddingVertical: 14,
        letterSpacing: 0.42
    }
  });

export default StartPage;