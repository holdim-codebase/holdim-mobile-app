#!/bin/sh

# Disable automatic `brew cleanup` 
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
# Instal CocoaPods from Homebrew
brew install cocoapods
# Instal NodeJS from Homebrew
brew install node@14
# Link NodeJS
brew link node@14
# Instal yarn from Homebrew
brew install yarn

# Install NodeJS dependencies
yarn
# Install pods
pod install

# the sed command from RN cant find the file... so we have to run it ourselves
sed -i -e  $'s/ && (__IPHONE_OS_VERSION_MIN_REQUIRED < __IPHONE_10_0)//' /Volumes/workspace/repository/ios/Pods/RCT-Folly/folly/portability/Time.h
