import * as React from 'react'
import { View, Text, Image, StatusBar } from 'react-native'
import { NavigationContainer, DefaultTheme, RouteProp, ParamListBase } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import ProposalScreen from './src/screens/proposal'
import FeedScreen from './src/screens/feed'
import SearchScreen from './src/screens/search'
import ProfileScreen from './src/screens/profile'
import DAOScreen from './src/screens/dao'
import FullProposalScreen from './src/screens/fullProposal'

const feedIcon = require('./src/assets/icons/feed.png')
const feedFocusedIcon = require('./src/assets/icons/feedFocused.png')
const profileIcon = require('./src/assets/icons/profile.png')
const profileFocusedIcon = require('./src/assets/icons/profileFocused.png')
const searchIcon = require('./src/assets/icons/search.png')
const searchFocusedIcon = require('./src/assets/icons/searchFocused.png')


const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000',
  },
};


const Tab = createBottomTabNavigator()

const HomeStack = createNativeStackNavigator()

const headerOptions = {
  headerStyle: {
    backgroundColor: 'rgba(28, 28, 28, 0.9)',
  },
  headerTintColor: 'white',
  headerBackTitleVisible: false
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen name="Feed" component={FeedScreen} />
      <HomeStack.Screen name="Proposal" component={ProposalScreen} options={{
        headerTitle: 'Snapshot voting',
      }}/>
      <HomeStack.Screen name="FullProposal" component={FullProposalScreen} options={{
        headerTitle: 'Snapshot voting',
      }}/>
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator()

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={headerOptions}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="DAO" component={DAOScreen} />
    </ProfileStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator()

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={headerOptions}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' />
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator screenOptions={() => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#151515',
            borderTopColor: '#151515',
          },
        })}>
          <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: size * 0.9, height: size * 0.9 }}
                  source={focused ? feedFocusedIcon : feedIcon}
                />
              )
            },
          }} />
          <Tab.Screen name="SearchStack" component={SearchStackScreen} options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: size * 0.9, height: size * 0.9 }}
                  source={focused ? searchFocusedIcon : searchIcon}
                />
              )
            },
          }} />
          <Tab.Screen name="ProfileStack" component={ProfileStackScreen}  options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: size * 0.9, height: size * 0.9 }}
                  source={focused ? profileFocusedIcon : profileIcon}
                />
              )
            },
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
