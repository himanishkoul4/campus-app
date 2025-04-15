import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import Colors from '@/data/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/configs/FirebaseConfig';

const profileOptions = [
  {
    name: 'Add Post',
    path: '/add-post',
    icon: 'add-circle-outline'
  },
  {
    name: 'My Events',
    path: '/Event',
    icon: 'calendar-outline'
  },
  {
    name: 'Logout',
    path: 'logout',
    icon: 'log-out-outline'
  },
]

export default function Profile() {
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter()
  const OnPressOption = (item: any) => {
    if (item.path == 'logout') {
      signOut(auth).then(() => {
        setUser(null);
        router.replace('/landing')
        return;
      }).catch((error) => {})
    } else {
      router.push(item.path)
    }
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.CHARCOAL,
      padding: 20,
    }}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.CREAM
      }}>Profile</Text>

      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 30
      }}>
        <Image source={{ uri: user?.image }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 99
          }}
        />

        <Text style={{
          marginTop: 7,
          fontSize: 25,
          fontWeight: 'bold',
          color: Colors.CREAM
        }}>{user?.name}</Text>
        <Text style={{
          color: Colors.GRAY,
          marginTop: 7,
          fontSize: 18
        }}>{user?.email}</Text>
      </View>

      <FlatList
        data={profileOptions}
        style={{
          marginTop: 25
        }}
        renderItem={({ item }: any) => (
          <TouchableOpacity onPress={() => OnPressOption(item)} style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            padding: 15,
            margin: 6,
            borderWidth: 0.4,
            borderRadius: 8,
            alignItems: 'center',
            borderColor: Colors.GRAY,
            backgroundColor: '#3a3a3a' // slightly lighter than charcoal for contrast
          }}>
            <Ionicons name={item.icon} size={34} color={Colors.PRIMARY} />
            <Text style={{
              fontSize: 20,
              color: Colors.CREAM
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
