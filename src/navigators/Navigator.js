import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import LoginPage from '../screens/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from '../screens/StartScreen';
import DashboardPage from '../screens/DashboardPage';
import CoursePage from '../screens/CoursePage';
import DocumentFolderPage from '../screens/DocumentFolderPage';
import DocumentPage from '../screens/DocumentPage';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
      rut: state.user.rut
    }
};

const Stack = createStackNavigator();

const HeaderOptions = {
    headerStyle: {
        backgroundColor: '#263859',
        borderColor: 'red',
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

const RootStack = props => {
  if(props.rut && props.rut !== ''){
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={HeaderOptions}>
              <Stack.Screen
                  name="Dashboard"
                  component={DashboardPage}
                  options={{ title: 'Mis cursos', headerShown: false }}
              />
              <Stack.Screen
                  name="Course"
                  component={CoursePage}
                  options={{ title: 'Course' }}
              />
              <Stack.Screen
                  name="CourseFolder"
                  component={DocumentFolderPage}
                  options={{ title: 'Course Folder' }}
              />
              <Stack.Screen
                  name="Document"
                  component={DocumentPage}
                  options={{ title: 'Document' }}
              />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }else{
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={HeaderOptions} initialRouteName='Start'>
              <Stack.Screen
                  name="Login"
                  component={LoginPage}
                  options={{headerShown: false}}
              />
              <Stack.Screen
                  name="Start"
                  component={StartScreen}
                  options={{headerShown: false}}
              />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps)(RootStack)