import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import LoginPage from '../screens/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from '../screens/StartScreen';
import DashboardPage from '../screens/DashboardPage';
import CoursePage from '../screens/CoursePage';
import DocumentFolderPage from '../screens/DocumentFolderPage';
import DocumentPage from '../screens/DocumentPage';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
            <Stack.Screen
                name="Document"
                component={DocumentPage}
                options={{ title: 'Document' }}
            />
            <Stack.Screen
                name="CourseFolder"
                component={DocumentFolderPage}
                options={{ title: 'Course Folder' }}
            />
            <Stack.Screen
                name="Course"
                component={CoursePage}
                options={{ title: 'Course' }}
            />
            <Stack.Screen
                name="Dashboard"
                component={DashboardPage}
            />
            <Stack.Screen
                name="Start"
                component={StartScreen}
            />
            <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{ title: 'Login' }}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
}