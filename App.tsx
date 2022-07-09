import * as React from 'react'
import {Image, StatusBar} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ApolloProvider} from '@apollo/client'

import ProposalScreen from './src/screens/proposal'
import FeedScreen from './src/screens/feed'
import SearchScreen from './src/screens/search'
import ProfileScreen from './src/screens/profile'
import DAOScreen from './src/screens/dao'
import FullProposalScreen from './src/screens/fullProposal'
import OnboardingScreen from './src/screens/onboarding'
import LoginScreen from './src/screens/login'
import {client} from './src/services/api'

const feedIcon = require('./src/assets/icons/feed.png')
const feedFocusedIcon = require('./src/assets/icons/feedFocused.png')
const profileIcon = require('./src/assets/icons/profile.png')
const profileFocusedIcon = require('./src/assets/icons/profileFocused.png')
const searchIcon = require('./src/assets/icons/search.png')
const searchFocusedIcon = require('./src/assets/icons/searchFocused.png')

const tabIconSizeMultiplier = 0.9

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000',
  },
}

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

const HomeStack = createNativeStackNavigator()

const headerOptions = {
  headerStyle: {
    backgroundColor: 'rgba(22, 22, 22, 1)',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerBackTitleVisible: false,
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen name="Feed" component={FeedScreen} />
      <HomeStack.Screen
        name="Proposal"
        component={ProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
      <HomeStack.Screen
        name="FullProposal"
        component={FullProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
      <HomeStack.Screen name="DAO" component={DAOScreen} />
    </HomeStack.Navigator>
  )
}

const ProfileStack = createNativeStackNavigator()

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={headerOptions}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="DAO" component={DAOScreen} />
    </ProfileStack.Navigator>
  )
}

const SearchStack = createNativeStackNavigator()

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={headerOptions}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="DAO" component={DAOScreen} />
    </SearchStack.Navigator>
  )
}

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(22, 22, 22, 1)',
          borderTopColor: 'rgba(22, 22, 22, 1)',
        },
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{
                  width: size * tabIconSizeMultiplier,
                  height: size * tabIconSizeMultiplier,
                }}
                source={focused ? feedFocusedIcon : feedIcon}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{
                  width: size * tabIconSizeMultiplier,
                  height: size * tabIconSizeMultiplier,
                }}
                source={focused ? searchFocusedIcon : searchIcon}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{
                  width: size * tabIconSizeMultiplier,
                  height: size * tabIconSizeMultiplier,
                }}
                source={focused ? profileFocusedIcon : profileIcon}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState<boolean>(false)
  const [alreadyLoggedIn, setAlreadyLoggedIn] = React.useState<boolean>(false)

  // CLear data to test login
  // React.useEffect(() => {
  //   AsyncStorage.clear()
  //   auth().currentUser &&
  //     auth()
  //       .signOut()
  //       .then(() => console.log('User signed out!'))
  // }, [])

  React.useEffect(() => {
    // check if the application has already been launched
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])

  // check if user id already exists
  React.useEffect(() => {
    auth().currentUser ? setAlreadyLoggedIn(true) : setAlreadyLoggedIn(false)
  }, [auth().currentUser])

  // hide splash screen
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(22, 22, 22, 1)"
        />
        <NavigationContainer theme={navTheme}>
          {isFirstLaunch && (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
              />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
          )}
          {!isFirstLaunch && !alreadyLoggedIn && (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
          )}
          {!isFirstLaunch && alreadyLoggedIn && (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
