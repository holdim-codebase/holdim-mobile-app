import * as React from 'react'
import {StatusBar} from 'react-native'
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

// icons svg
import FeedIcon from './src/assets/images/svg/Home.gray.svg'
import SearchIcon from './src/assets/images/svg/Search.gray.svg'
import ProfileIcon from './src/assets/images/svg/Profile.gray.svg'
import FeedIconFocused from './src/assets/images/svg/Home.purple.svg'
import SearchIconFocused from './src/assets/images/svg/Search.purple.svg'
import ProfileIconFocused from './src/assets/images/svg/Profile.purple.svg'

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
      <ProfileStack.Screen
        name="Proposal"
        component={ProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
      <ProfileStack.Screen
        name="FullProposal"
        component={FullProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
    </ProfileStack.Navigator>
  )
}

const SearchStack = createNativeStackNavigator()

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={headerOptions}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="DAO" component={DAOScreen} />
      <SearchStack.Screen
        name="Proposal"
        component={ProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
      <SearchStack.Screen
        name="FullProposal"
        component={FullProposalScreen}
        options={{
          headerTitle: 'Snapshot voting',
        }}
      />
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
            return focused ? (
              <FeedIconFocused
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            ) : (
              <FeedIcon
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
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
            return focused ? (
              <SearchIconFocused
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            ) : (
              <SearchIcon
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
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
            return focused ? (
              <ProfileIconFocused
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
              />
            ) : (
              <ProfileIcon
                width={size * tabIconSizeMultiplier}
                height={size * tabIconSizeMultiplier}
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
            <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
              <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
              />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
          )}
          {!isFirstLaunch && !alreadyLoggedIn && (
            <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
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
