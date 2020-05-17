import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Button } from 'react-native-elements';
const { height, width } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {
  View,
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';


export default class Onboarding extends React.Component {
  state = {
    email: '',
    password: '',
    spinner: false,
  };



  async onLogin() {
    const { email, password } = this.state;

    AsyncStorage.setItem('ip', '192.168.0.111')

    if (email != "") {
      if (password != "") {
        // this.setState({
        //   spinner: true
        // });

        alert(email+ password)

        await fetch('http://192.168.0.111:3006/userlogin?Email=' + email + '&Password=' + password + ' ')
          .then(res => res.json())
          .then(users => {

            if (users == 0) {
              alert("invalid credentials");

              
            }
            else {
              alert("success");
              AsyncStorage.setItem('Email', users[0].Email.toString());
              this.props.navigation.navigate('Home');
            }
          })

        // this.setState({
        //   spinner: false
        // });
      }
      else {
        alert("Please enter password.");
      }
    }
    else {
      alert("Please enter email.");
    }



  }

  handleSubmitSignup = () => {
    this.props.navigation.navigate('Register');
  }

  render() {

    return (
      <Block style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/hello.jpg')}
          style={styles.background}
        //resizeMode="cover"
        >
          <Block style={styles.logoContainer}>
            <Image
              source={require('../assets/icon.png')}
              resizeMode="contain"
            />
          </Block>

          <Block style={styles.inputContainer}>
            <Block style={styles.input}>
              <Image style={styles.inputIcon} source={require('../assets/email.png')} />
              <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({ email })}
              />
            </Block>

            <Block style={styles.input}>
              <Image style={styles.inputIcon} source={require('../assets/password.png')} />
              <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({ password })}
              />
            </Block>
          </Block>

          <Block style={styles.registerContainer}>
            <TouchableHighlight style={styles.buttonContainer} onPress={this.handleSubmitSignup}>
              <Text color="white" size={16} style={{ fontFamily: 'montserrat-regular' }, styles.underline}>Create New Account</Text>
            </TouchableHighlight>
          </Block>

          <Block style={styles.buttonLogin}>
            <Button
              type="solid"
              iconLeft
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
              title="LOGIN"
              onPress={this.onLogin.bind(this)}
            />
          </Block>


        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'double'
  },
  background: {
    width: width,
    height: height,
  },
  buttonLogin: {
    paddingHorizontal: theme.SIZES.BASE * 4,
    marginBottom: theme.SIZES.BASE,
    justifyContent: "center",
    width: width,
    height: theme.SIZES.BASE * 4,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logoContainer: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.SIZES.BASE * 2
  },
  inputContainer: {
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: theme.SIZES.BASE * 2

  },
  registerContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'center'
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginBottom: '20%',
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },

  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginLeft: '9%'
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  },

  input: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',

  },

  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },

  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: '17%',
    width: 250,
    borderRadius: 30,
  },

  loginButton: {
    backgroundColor: "#00b5ec",
  },

  loginText: {
    color: 'white',
  }
});