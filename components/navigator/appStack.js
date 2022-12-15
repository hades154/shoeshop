import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../login';
import HomePage from '../home';
import TabNavigator from './tabs';
import RegisterScreen from '../register';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="home" component={TabNavigator} />
            <Stack.Screen name="Register" component={RegisterScreen} />

        </Stack.Navigator>
    );
};

export default AppStack;