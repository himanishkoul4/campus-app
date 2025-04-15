import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppButton from '@/components/Shared/AppButton'
import { useRouter } from 'expo-router'
import axios from 'axios'
import EventCard from '@/components/Events/EventCard'
import Colors from '@/data/Colors'
import { AuthContext } from '@/context/AuthContext'

export default function Event() {
  const router = useRouter()
  const [eventList, setEventList] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    GetAllEvents()
  }, [])

  const GetAllEvents = async () => {
    setLoading(true)
    const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL + "/events")
    setEventList(result.data)
    setLoading(false)
  }

  const GetUserEvents = async () => {
    setLoading(true)
    const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL + "/event-register?email=" + user?.email)
    setEventList(result.data)
    setLoading(false)
  }

  const handleUnregister = (eventId: number) => {
    setEventList((prev) => prev.filter((event: any) => event.id !== eventId))
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.CHARCOAL }}>
      <View style={{
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: Colors.PRIMARY
        }}>Events</Text>
        <AppButton text='  +  ' onPress={() => router.push('/add-event')} />
      </View>

      <View style={{
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        padding: 10
      }}>
        <Pressable onPress={() => { setSelectedTab(0); GetAllEvents() }}>
          <Text style={[styles.tabText, {
            backgroundColor: selectedTab === 0 ? Colors.PRIMARY : Colors.WHITE,
            color: selectedTab === 0 ? Colors.WHITE : Colors.PRIMARY
          }]}>Upcoming</Text>
        </Pressable>
        <Pressable onPress={() => { setSelectedTab(1); GetUserEvents() }}>
          <Text style={[styles.tabText, {
            backgroundColor: selectedTab === 1 ? Colors.PRIMARY : Colors.WHITE,
            color: selectedTab === 1 ? Colors.WHITE : Colors.PRIMARY
          }]}>Registered</Text>
        </Pressable>
      </View>

      <FlatList
        data={eventList}
        onRefresh={selectedTab === 0 ? GetAllEvents : GetUserEvents}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <View style={{ paddingHorizontal: 25, marginTop: 12 }}>
            <EventCard
              {...item as any}
              key={index}
              isRegistered={selectedTab === 1}
              onUnregister={selectedTab === 1 ? handleUnregister : undefined}
            />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  tabText: {
    padding: 4,
    fontSize: 20,
    paddingHorizontal: 15,
    borderRadius: 99
  }
})
