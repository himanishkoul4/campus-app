import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';

type USER_AVATAR = {
    name: string,
    image: string,
    date: string
}

function UserAvatar({ name, image, date }: USER_AVATAR) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8
            }}>
                <Image source={{ uri: image }} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 99
                }} />
                <View>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>{name}</Text>
                    <Text style={{ color: Colors.GRAY }}>{moment(date).fromNow()}</Text>
                </View>
            </View>
            <Ionicons name="ellipsis-vertical" size={24} color={Colors.CREAM} />
        </View>
    )
}

export default React.memo(UserAvatar);
