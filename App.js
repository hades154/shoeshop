import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./components/navigator/tabs";
import LoginScreen from "./components/login";
import AppStack from "./components/navigator/appStack";

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
      {/* <LoginScreen /> */}
    </NavigationContainer>
  );
}

export default App;