import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import UserAvatar from './UserAvatar'
import Colors from '@/data/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function PostCard({ post }: any) {
    return (
        <View style={{
            padding: 7,
            backgroundColor: Colors.CREAM,
            borderRadius: 8,
            marginTop: 20
        }}>
            <UserAvatar name={post?.name} image={post?.image} date={post?.createdon} />
            <Text style={{
                fontSize: 18,
                marginTop: 10
            }}>{post?.content}</Text>
            {post.imageurl &&
                <Image source={{ uri: post.imageurl }} style={{
                    width: '100%',
                    height: 300,
                    resizeMode: 'cover',
                    borderRadius: 10
                }} />
            }

            <View style={styles.actionsRow}>
                <View style={styles.subContainer}>
                    <AntDesign name="like2" size={24} color="black" />
                    <Text style={styles.grayText}>25</Text>
                </View>
                <View style={styles.subContainer}>
                    <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
                    <Text style={styles.grayText}>25</Text>
                </View>
            </View>
            <Text style={{
                marginTop: 7,
                color: Colors.GRAY
            }}>View All Comment</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    },
    actionsRow: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    grayText: {
        fontSize: 17,
        color: Colors.GRAY
    }
})

export default React.memo(PostCard);
