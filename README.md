# General
Hodlim app was created using react-native init with a typescript template.

Classic libraries were used in the app such as moment.js, numeral, axios, react-navigation and further. Didn't use any state management since the app has only 2 request without any need in storage, otherwise it is an overkill imho (btw MobX rocks)

# Install

## MacOS
```
npm i
cd ios
pod install
```

### Apple M1 installation
Before installing pods run

```
gem install --user-install ffi -- --enable-libffi-alloc
```

# App details
The app has 3 navigation stacks: Home, Search and Profile.

Profile page consists of some user info and portfolio of DAO tokens and details about them

Search page is used for navigation, searching (obvious) for new and interesting DAOs. For the hackaton it was mocked using an image

Home page works like a feed for proposals with ability to expand it and learn more. And the **killer feature** is that you can see TL:DR for the proposal without diving deeply into it using Open AI. You will understand what is it about and simply decide what to vote for.
