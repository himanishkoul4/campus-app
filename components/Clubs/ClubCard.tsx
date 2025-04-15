import { View, Text, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '@/data/Colors'
import AppButton from '../Shared/AppButton'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'

type CLUB = {
    id: number,
    name: string,
    club_logo: string,
    about: string,
    createdon: string,
    isFollowed: boolean,
    refreshData: () => void
}

export default function ClubCard(club: CLUB) {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const onFollowBtnClick = async () => {
        setLoading(true)
        if (club.isFollowed) {
            const result = await axios.delete(process.env.EXPO_PUBLIC_HOST_URL + '/clubfollower?u_email=' + user.email + "&club_id=" + club.id)
        }
        else {
            const result = await axios.post(process.env.EXPO_PUBLIC_HOST_URL + '/clubfollower', {
                u_email: user?.email,
                clubId: club?.id
            })
        }

        club.refreshData()
        setLoading(false)
    }

    return (
        <View style={{
            flex: 1,
            padding: 15,
            backgroundColor: Colors.CREAM,
            margin: 10,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 15
        }}>
            <Image source={{ uri: club.club_logo }} style={{
                width: 80,
                height: 80,
                borderRadius: 99
            }} />
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold'
            }}>{club.name}</Text>
            <Text
                numberOfLines={2}
                style={{
                    color: Colors.GRAY
                }}>{club.about}</Text>
            <AppButton text={club.isFollowed ? 'Unfollow' : 'Follow'}
                loading={loading}
                outline={club.isFollowed}
                onPress={() => onFollowBtnClick()} />
        </View>
    )
}