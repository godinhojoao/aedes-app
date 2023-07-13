import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import { ComplaintsProvider } from './src/core/context/Complaints';
import { AllComplaints } from './src/pages/AllComplaints';
import { AddComplaint } from './src/pages/AddComplaint';
import LOCATIONS from './src/data/locations.json';

export default function App() {
  const [complaints, setComplaints] = useState(LOCATIONS)
  const Drawer = createDrawerNavigator();

  return (
    <ComplaintsProvider complaints={complaints} setComplaints={setComplaints}>
      <StatusBar />
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Denúncias" component={AllComplaints} />
          <Drawer.Screen name="Criar denúncia" component={AddComplaint} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ComplaintsProvider>
  );
}

