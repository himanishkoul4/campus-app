import { Redirect, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator, Text, View } from "react-native";
import { auth } from '@/configs/FirebaseConfig'
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Index() {
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter();

  onAuthStateChanged(auth, async (userData) => {
    // console.log(userData?.email);
    if (userData && userData?.email) {
      const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL + "/user?email=" + userData?.email)
      console.log(result.data)
      setUser(result.data)
      router.replace('/(tabs)/Home');
    }
    else {
      router.replace('/landing');
    }
  })
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
