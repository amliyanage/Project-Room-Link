import { ImageBackground, View, StyleSheet , Text , TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const LoginPage = () => {
    return (
        <ImageBackground
            source={require('../../assets/page-bg/login-page.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.mainText}>Login to Room Link</Text>
                <Text style={styles.para}>“ Login to System to get a control ”</Text>
                <TextInput style={styles.input} placeholder="System Email" placeholderTextColor={"#fff"} />
                <TextInput style={styles.input} placeholder="System Password" placeholderTextColor={"#fff"} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
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
    },
    input : {
        backgroundColor: 'rgba(191, 151, 107, 0.6)',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 11,
        marginBottom: 27,
        color: '#fff',
        fontSize: 13,
        borderRadius: 10
    }
  });

export default LoginPage;