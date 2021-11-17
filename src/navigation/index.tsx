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

const BleComponent = props => {
  const {name} = props.route;
  switch (name) {
    case routes.PERMISSION_SCREEN: {
      return <BlePermissionScreen tabName={routes.PERMISSION_SCREEN} />;
    }
    case routes.DEVICE_LIST_SCREEN: {
      return <DeviceListScreen tabName={routes.DEVICE_LIST_SCREEN} />;
    }
    case routes.DEVICE_LOG_SCREEN: {
      return <DeviceLogScreen tabName={routes.DEVICE_LIST_SCREEN} />;
    }
    default: {
      return <></>;
    }
  }
};

const BleStackScreen = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen name={routes.PERMISSION_SCREEN} component={BleComponent} />
      {/* <Tab.Screen name={routes.DEVICE_LIST_SCREEN} component={BleComponent} />
      <Tab.Screen name={routes.DEVICE_LOG_SCREEN} component={BleComponent} /> */}
    </Tab.Navigator>
  );
};

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
        />
        <Stack.Screen
          name={routes.DEVICE_LOG_SCREEN}
          component={DeviceLogScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
