import { Stack } from "expo-router";
import { useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Colors from "@/data/Colors";
import { StatusBar } from 'react-native';


interface USER {
  id: number,
  name: string,
  email: string,
  image: string
}

export default function RootLayout() {
  const [user, setUser] = useState<USER | undefined>(undefined)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <StatusBar backgroundColor={Colors.CHARCOAL} barStyle="light-content" />
      <Stack>
        <Stack.Screen name='landing'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name='(auth)/SignUp' options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.PRIMARY
        }} />
        <Stack.Screen name='(auth)/SignIn' options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.PRIMARY
        }} />
        <Stack.Screen name='(tabs)' options={{
          headerShown: false
        }} />
        <Stack.Screen name='add-post/index' options={{
          headerTitle: 'Add New Post',
          headerStyle: {
            backgroundColor: Colors.CHARCOAL
          },
          headerTitleStyle: {
            color: Colors.PRIMARY
          },
          headerTintColor: Colors.PRIMARY
        }} />
        <Stack.Screen name='explore-clubs/index' options={{
          headerTitle: 'Explore Club',
          headerStyle: {
            backgroundColor: Colors.CHARCOAL
          },
          headerTitleStyle: {
            color: Colors.PRIMARY
          },
          headerTintColor: Colors.PRIMARY
        }} />
        <Stack.Screen name='add-event/index' options={{
          headerTitle: 'Add New Event',
          headerStyle: {
            backgroundColor: Colors.CHARCOAL
          },
          headerTitleStyle: {
            color: Colors.PRIMARY
          },
          headerTintColor: Colors.PRIMARY
        }} />
      </Stack>
    </AuthContext.Provider >
  )
}
