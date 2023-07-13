import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import { AsyncStorageManager } from './src/core/shared/AsyncStorageManager';
import { AllComplaints } from './src/pages/AllComplaints';
import { AddComplaint } from './src/pages/AddComplaint';
import { SignIn } from './src/pages/SignIn';
import { SignUp } from './src/pages/SignUp';
import { LogoutButton } from './src/core/components/LogoutButton';

export default function App() {
  const Drawer = createDrawerNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = async () => {
    await AsyncStorageManager.removeItem("aedes-token");
    await AsyncStorageManager.removeItem("aedes-account");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    (async () => {
      const token = await AsyncStorageManager.getItem("aedes-token");
      const account = await AsyncStorageManager.getItem("aedes-account", true);
      const hasAuthCredentials = !!token && !!account;
      setIsAuthenticated(true)
      // setIsAuthenticated(hasAuthCredentials)
    })()
  }, []);

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerRight: () => <LogoutButton handleLogout={handleLogout} isAuthenticated={isAuthenticated} />,
          }}>
          {isAuthenticated ? (
            <>
              <Drawer.Screen name="Denúncias" component={AllComplaints} />
              <Drawer.Screen name="Criar denúncia" component={AddComplaint} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Entrar" component={SignIn} />
              <Drawer.Screen name="Cadastrar" component={SignUp} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
