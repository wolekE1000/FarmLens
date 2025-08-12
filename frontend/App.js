import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CropsScreen from './screens/CropsScreen';
import LivestockScreen from './screens/LivestockScreen';
import SolarScreen from './screens/SolarScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Crops" component={CropsScreen} />
        <Tab.Screen name="Livestock" component={LivestockScreen} />
        <Tab.Screen name="Solar" component={SolarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
