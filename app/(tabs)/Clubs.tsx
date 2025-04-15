import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import EmptyState from '@/components/Clubs/EmptyState'
import axios from 'axios'
import PostList from '@/components/Post/PostList'
import AppButton from '@/components/Shared/AppButton'
import { useRouter, useFocusEffect } from 'expo-router'
import { useContext, useCallback } from 'react'
import { AuthContext } from '@/context/AuthContext'
import Colors from '@/data/Colors'

export default function Clubs() {
  const [followedClubIds, setFollowedClubIds] = useState<number[]>([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useContext(AuthContext)

  useFocusEffect(
    useCallback(() => {
      GetFollowedClubs()
    }, [])
  )

  const GetFollowedClubs = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_HOST_URL + '/clubfollower?u_email=' + user?.email
      )
      const ids = response.data.map((item: any) => item.club_id)
      setFollowedClubIds(ids)
      if (ids.length > 0) {
        GetPosts(ids)
      } else {
        setPosts([])
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const GetPosts = async (clubIds: number[]) => {
    try {
      const idString = clubIds.join(',')
      const response = await axios.get(
        process.env.EXPO_PUBLIC_HOST_URL + `/post?club=${idString}&orderField=post.id`
      )
      setPosts(response.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.CHARCOAL }}>
      <FlatList
        ListHeaderComponent={
          <View style={{ padding: 20, paddingTop: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: 'bold',
                  color: Colors.PRIMARY
                }}>
                Clubs
              </Text>
              <AppButton text='Explore Clubs' onPress={() => router.push('/explore-clubs')} />
            </View>
            {followedClubIds.length === 0 && <EmptyState />}
          </View>
        }
        ListFooterComponent={
          <View style={{ paddingHorizontal: 20 }}>
            <PostList posts={posts} loading={loading} OnRefresh={GetFollowedClubs} />
          </View>
        }
        data={[]} // dummy
        renderItem={null}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}
