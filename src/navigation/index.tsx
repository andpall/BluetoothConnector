import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import BlePermissionScreen from '../containers/ble/blePermissionScreen';
import DeviceListScreen from '../containers/ble/deviceListScreen';
import DeviceLogScreen from '../containers/ble/logScreen';

import * as routes from '../constants/routes';
import {RootStackParamList} from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={routes.PERMISSION_SCREEN}
          component={BlePermissionScreen}
        />
        <Stack.Screen
          name={routes.DEVICE_LIST_SCREEN}
          component={DeviceListScreen}
          options = {{headerShown: true}}
        />
        <Stack.Screen
          name={routes.DEVICE_LOG_SCREEN}
          component={DeviceLogScreen}
          options = {{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
