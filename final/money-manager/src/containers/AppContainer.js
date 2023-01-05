import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { Root } from "react-native-popup-confirm-toast";

import { ApplicationNavigator, AuthencationNavigator } from "@navigation";
import { ScrollView, StyleSheet, Dimensions, View } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthencation from "@hooks/useAuthencation";

const style = StyleSheet.create({
  rootLayout: {
    width: "100%",
    height: Dimensions.get("window").height,
  }
});

const { Navigator, Screen } = createStackNavigator();

const AppContainer = () => {
  const { signInAppUser, status } = useAuthencation();

  const [cacheLoading, setCacheLoading] = React.useState(true);
  const [signInProcessing, setSignInProcessing] = React.useState(false);
  const [cacheData, setCacheData] = React.useState(null);
  const [cacheLoaded, setCacheLoaded] = React.useState(false);

  React.useEffect(() => {
    const getUserData = async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const user_name = await AsyncStorage.getItem('@user_name');
          const user_password = await AsyncStorage.getItem('@user_password');
          if (user_name !== null && user_password !== null) {
            setCacheData({ user_name, user_password });
            signInAppUser({
              variables: {
                user_name,
                user_password,
              }
            }, setSignInProcessing);
          } else {
            reject();
          }
          resolve();
        } catch (e) {
          reject();
        }
      });
    }
    getUserData().then(() => {
      setCacheLoading(false);
    }).catch(() => {
      setCacheLoading(false);
    });
  }, []);

  return (
    <Root>
      <ScrollView>
        <View style={style.rootLayout}>
          <NavigationContainer>
            {
              !cacheLoaded ? (
                <Navigator>
                  <Screen
                    name="AuthencationNavigator"
                    component={AuthencationNavigator}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Screen
                    name="ApplicationNavigator"
                    component={ApplicationNavigator}
                    options={{
                      headerShown: false,
                    }}
                  />
                </Navigator>
              ) : null
            }
          </NavigationContainer>
        </View>
      </ScrollView>
    </Root>
  )
};

export default AppContainer;