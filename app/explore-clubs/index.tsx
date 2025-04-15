import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import ClubCard from '@/components/Clubs/ClubCard'
import AppButton from '@/components/Shared/AppButton'
import Colors from '@/data/Colors'
import { AuthContext } from '@/context/AuthContext'

export type CLUB = {
  id: number,
  name: string,
  club_logo: string,
  about: string,
  createdon: string
}

export default function ExploreClubs() {
  const [clubList, setClubList] = useState<CLUB[] | []>([])
  const { user } = useContext(AuthContext)
  const [followedClub, setFollowedClub] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllClubs()
  }, [])

  const GetAllClubs = async () => {
    setLoading(true)
    const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL + '/clubs')
    console.log(result.data)
    setClubList(result.data)
    GetUserFollowedClubs();
    setLoading(false)
  }

  const GetUserFollowedClubs = async () => {
    const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL + '/clubfollower?u_email=' + user?.email)
    console.log(result?.data);
    setFollowedClub(result?.data)
  }

  const onAddClubBtnClick = () => {

  }

  const isFollowed = (clubId: number) => {
    const record = followedClub && followedClub.find((item: any) => item.club_id == clubId);
    return record ? true : false
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.CHARCOAL
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 15
      }}>
        <Text style={{
          fontSize: 17,
          color: Colors.GRAY
        }}>Create New Teams/Clubs</Text>
        <AppButton text='+ Add' onPress={() => onAddClubBtnClick()} />
      </View>
      <FlatList
        data={clubList}
        numColumns={2}
        onRefresh={GetAllClubs}
        refreshing={loading}
        renderItem={({ item: CLUB, index }) => (
          <ClubCard {...CLUB} isFollowed={isFollowed(CLUB.id)}
            refreshData={GetAllClubs} />
        )}
      />
    </View>
  )
}