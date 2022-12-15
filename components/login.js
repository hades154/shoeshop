
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';
import InputField from './InputField';
import TabNavigator from './navigator/tabs';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = (state) => {
    axios.post('http://103.197.184.55:8080/api/login', {}, { params: state }).
      then((res) => {
        console.log(res.data)

        //luu data
        const currentUser = res.data
        //save to storage
        AsyncStorage.setItem('address', currentUser.address)
        AsyncStorage.setItem('avatar', currentUser.avatar)
        AsyncStorage.setItem('numberPhone', currentUser.numberPhone)
        AsyncStorage.setItem('username', currentUser.username)


        //navogato to home
        navigation.navigate('home')
      }).
      catch((err) => alert("usename or password incorrect"))
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>

          <Image
            height={200}
            width={200}
            style={{ transform: [{ rotate: '-5deg' }] }}
            source={require('../assets/images/login.png')}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          onChange={(value) => { setUsername(value) }}
          value={username}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          onChange={(value) => { setPassword(value) }}
          value={password}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { }}
        />

        <CustomButton label={"Login"} onPress={() => { handleLogin({ username: username, password: password }) }} />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 50,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;