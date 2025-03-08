import React, { useState, useEffect } from "react";
import { Stack, Redirect } from "expo-router";

export default function RootLayout() {
  const [isLogin, setIsLogin] = useState(true); // Set to true by default
  const [isLoading, setIsLoading] = useState(false); // Set loading to false to skip the loading state

  // useEffect(() => {
  //   // Simulate checking login status
  //   // Replace this with your actual authentication check when you're ready
  //   const checkLoginStatus = async () => {
  //     try {
  //       // Example: const token = await AsyncStorage.getItem('userToken');
  //       // setIsLogin(token !== null);

  //       // For now, we're always logged in:
  //       setIsLogin(true);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Failed to get login status:", error);
  //       setIsLogin(false);
  //       setIsLoading(false);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  if (isLoading) {
    // You could return a loading screen here
    return null;
  }

  // Redirect based on login status
  return (
    <>
      {!isLogin ? <Redirect href="/login" /> : null}

      <Stack
        screenOptions={{
          headerShown: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="profile" />
      </Stack>
    </>
  );
}
