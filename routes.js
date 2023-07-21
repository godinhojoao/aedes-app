import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AllComplaints } from './src/pages/AllComplaints';
import { AddComplaint } from './src/pages/AddComplaint';
import { SignIn } from './src/pages/SignIn';
import { SignUp } from './src/pages/SignUp';
import { LogoutButton } from './src/core/components/LogoutButton';
import { AuthContext } from './src/core/context/AuthContext';
import { useContext, useEffect } from 'react';
import { AsyncStorageManager } from './src/core/shared/AsyncStorageManager';

export function Routes() {
  const { isAuthenticated, account, token, setIsAuthenticated, setAccount, setToken } = useContext(AuthContext)
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorageManager.getItem("aedes-token");
      const account = await AsyncStorageManager.getItem("aedes-account", true);
      const hasAuthCredentials = !!token && !!account;
      setIsAuthenticated(hasAuthCredentials);
      setToken(token);
      setAccount(account);
    })()
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerRight: () => <LogoutButton />,
        }}>
        {isAuthenticated && account && account.id && token ? (
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
  )
}