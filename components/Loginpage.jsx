import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, TextInput, IconButton ,Text,Button} from "@react-native-material/core";
import axios from 'axios';
const Loginpage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailerrorMessage,setemailErrorMessage]=useState('');
  const [passworderrorMessage,setpasswordErrorMessage]=useState('');
  const [errorMessage,setErrorMessage]=useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === JSON.stringify(true)) {
          navigation.navigate('Dashboard'); // Redirect to dashboard if logged in
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
  
    checkLogin();
  }, []);
  
  const isValidEmail=(email)=>{
    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(email);
    return isValidEmail;
  }
  const handleEmailChange = (text) => {
    setEmail(text);
    if(!isValidEmail(email)){
      setemailErrorMessage('please enter valid email');
    }
    else{
      setemailErrorMessage('');
    }
    validateForm(email, password);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    if(text.length<8){
      setpasswordErrorMessage('please enter correct password');
      setErrorMessage('');
    }
    else{
      setpasswordErrorMessage('');
    }
    validateForm(email,text);
  };
  const validateForm = (email, password) => {
    if (password.length<8 || !isValidEmail(email)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };
  const handleLogin = async () => {
    axios.post('https://enmovil.io/haka/common/apploginnew',{"email":email,"password":password})
    .then(async response => {
      if (response.data.msg=="Success") {
        try {
           await AsyncStorage.setItem('username', email);
          await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          navigation.navigate('Dashboard');
        } catch (error) {
          console.error('Error saving user details:', error);
        }
      } else {
        setErrorMessage('Invalid Credentials');
      }
    })
    .catch(error => {
      console.error("Error sending data: ", error);
    });
  };

  return (
   <View style={styles.container1}>
      <View style={styles.container}>
            <Text variant="h4" style={styles.logo}>Login</Text>
            {/* //onBlur={handleEmailBlur}  onBlur={handlePasswordBlur}*/}
            <TextInput label="Email" value={email} variant="outlined" style={styles.inputView}  onChangeText={handleEmailChange}/>
            <View style={styles.msgcl}><Text  style={styles.errormsg}>{emailerrorMessage}</Text></View>
            <TextInput label="Password" value={password} variant="outlined" secureTextEntry={true} style={styles.inputView} onChangeText={handlePasswordChange}/>
            <View style={styles.msgcl}><Text  style={styles.errormsg}>{passworderrorMessage}{errorMessage}</Text></View>
            <Button title="sign in" style={styles.loginBtn} onPress={handleLogin} disabled={isButtonDisabled}/>
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor:'black',
  },
  buttonText:{
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  login:{
    margin:20,
      backgroundColor:'black',
      width:215,
      height:50,
      borderRadius:15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    marginTop:'30%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius:130,
    height:500,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    marginBottom: 30,
  },
  inputView: {
      width:'90%',
      marginTop:10,
      borderBlockColor:'black',
      borderColor:'black',
  },
  msgcl:{
    alignSelf: 'flex-start',
    marginLeft:'5%',
  },
  errormsg:{
    color:'red',
    fontSize:12,
    textAlign:'right',
  },
  loginBtn: {
    width: '90%',
    fontWeight: 'bold',
    backgroundColor: 'black',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },  
});

export default Loginpage;