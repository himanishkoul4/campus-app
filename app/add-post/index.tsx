import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import UserAvatar from '@/components/Post/UserAvatar'
import { AuthContext } from '@/context/AuthContext'
import WritePost from '@/components/Post/WritePost';
import Colors from '@/data/Colors';

export default function AddPost() {
    const { user } = useContext(AuthContext);
    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors.CHARCOAL
        }}>
            <View style={{
                padding: 20,
            }}>
                <View style={{ position: 'relative' }}>
                    {/* Original component */}
                    <UserAvatar name={user?.name} image={user?.image} date={new Date().toISOString()} />

                    {/* Overlay the yellow name */}
                    <Text
                        style={{
                            position: 'absolute',
                            left: 58, // adjust based on your layout
                            top: 3,
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: Colors.PRIMARY
                        }}
                    >
                        {user?.name}
                    </Text>
                </View>
                <WritePost />
            </View>
        </View>
    )
}