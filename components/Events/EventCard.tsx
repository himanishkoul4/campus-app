import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useContext } from 'react'
import Colors from '@/data/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import AppButton from '../Shared/AppButton';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

type EVENT = {
    id: number,
    name: string,
    bannerurl: string,
    location: string,
    link: string,
    event_date: string,
    event_time: string,
    createdby: string,
    username: string,
    isRegistered: boolean,
    onUnregister?: (id: number) => void
}

export default function EventCard(event: EVENT) {

    const { user } = useContext(AuthContext)

    const RegisterForEvent = () => {
        Alert.alert('Register for event?', 'Do you want to register for event', [
            { text: 'Yes', onPress: SaveEventRegistration },
            { text: 'Cancel', style: 'cancel' }
        ])
    }

    const SaveEventRegistration = async () => {
        const result = await axios.post(process.env.EXPO_PUBLIC_HOST_URL + "/event-register", {
            eventId: event.id,
            userEmail: user?.email
        })
        if (result) {
            Alert.alert('Great!', 'You successfully registered for the event!');
        }
    }

    const RemoveEventRegistration = async () => {
        const result = await axios.delete(process.env.EXPO_PUBLIC_HOST_URL + "/event-register", {
            data: {
                eventId: event.id,
                userEmail: user?.email
            }
        });
        if (result.data.success) {
            Alert.alert('Removed', 'You have been unregistered from this event!');
            event.onUnregister?.(event.id);
        }
    }

    const shareImage = async () => {
        try {
            const fileUri = FileSystem.documentDirectory + 'share-image.jpg';
            const { uri } = await FileSystem.downloadAsync(event.bannerurl, fileUri)
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    dialogTitle: 'Check out this image',
                    mimeType: 'image/jpeg',
                    UTI: 'public.jpeg'
                })
            } else {
                Alert.alert('Sharing is not available on this device')
            }
        } catch (error) {
            console.error('Error sharing image:', error)
            Alert.alert('Error', 'Could not share the image.')
        }
    }

    return (
        <View style={{
            padding: 20,
            backgroundColor: Colors.CREAM,
            marginBottom: 5,
            borderRadius: 10
        }}>
            <Image source={{ uri: event.bannerurl }}
                style={{
                    height: 260,
                    objectFit: 'contain',
                    borderRadius: 15,
                    backgroundColor: 'black'
                }}
            />
            <Text style={{ fontSize: 23, fontWeight: 'bold', marginTop: 7 }}>{event.name}</Text>
            <Text style={{ color: Colors.GRAY, fontSize: 16 }}>{event.username}</Text>
            <View style={styles.subContainer}>
                <Ionicons name="location-outline" size={24} color={Colors.GRAY} />
                <Text style={{ color: Colors.GRAY, fontSize: 16 }}>{event.location}</Text>
            </View>
            <View style={styles.subContainer}>
                <Ionicons name="calendar-outline" size={24} color={Colors.GRAY} />
                <Text style={{ color: Colors.GRAY, fontSize: 16 }}>{event.event_date} at {event.event_time}</Text>
            </View>

            {!event.isRegistered ? (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10
                }}>
                    <AppButton text='Share' outline fullWidth onPress={shareImage} />
                    <AppButton text='Register' fullWidth onPress={RegisterForEvent} />
                </View>
            ) : (
                <AppButton
                    text='Unregister'
                    outline
                    onPress={() => {
                        Alert.alert(
                            'Unregister from event?',
                            'Are you sure you want to unregister from this event?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: RemoveEventRegistration,
                                },
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                            ]
                        );
                    }}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        gap: 5
    }
})
