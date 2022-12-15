
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

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')



    const handleRegister = (state) => {
        axios.post('http://103.197.184.55:8080/api/register', {
            "username": username,
            "password": password
        }).
            then((res) => {
                console.log(res.data)

                //navogato to login
                navigation.navigate('Login')
            }).
            catch((err) => alert("something wrong"))
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
                    Register
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

                    fieldButtonFunction={() => { }}
                />

                <InputField
                    label={'Confirm password'}
                    onChange={(value) => { setConfirmPassword(value) }}
                    value={confirmPassword}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    fieldButtonFunction={() => { }}
                />

                <CustomButton label={"Register"} onPress={() => {

                    let errorFlag = false;
                    // input validation
                    if (username.length == 0 || password.length == 0) {
                        alert("username and password can't null")
                    }

                    else {
                        if (password.length > 7 && password.length < 20) {
                            if (password == confirmPassword) {

                                handleRegister({ username: username, password: password })
                            }
                            else {
                                alert("password and confirmPassword not matched")
                            }
                        }
                        else {
                            alert("password was wrong format")
                        }
                    }


                }} />

                <Text style={{ textAlign: 'center', color: '#666', marginBottom: -40 }}>
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}>
                    <Text>Already has account? return to</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;