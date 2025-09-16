import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import EditorScreen from './screens/EditorScreen';
import ExamplesScreen from './screens/ExamplesScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName: string;

              switch (route.name) {
                case 'Editor':
                  iconName = 'code';
                  break;
                case 'Examples':
                  iconName = 'folder';
                  break;
                case 'Settings':
                  iconName = 'settings';
                  break;
                default:
                  iconName = 'circle';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#7A5CFF',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#7A5CFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}>
          <Tab.Screen
            name="Editor"
            component={EditorScreen}
            options={{title: 'Synapse Editor'}}
          />
          <Tab.Screen
            name="Examples"
            component={ExamplesScreen}
            options={{title: 'Example Gallery'}}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{title: 'Settings'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;