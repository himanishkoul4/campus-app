import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'
import AppButton from '@/components/Shared/AppButton'
import { useRouter } from 'expo-router'

export default function LandingScreen() {
    const router = useRouter();
    return (
        <View style={{ backgroundColor: Colors.CHARCOAL, flex: 1 }}>
            <Image
                source={require('./../assets/images/login.png')}
                style={{
                    width: '100%',
                    height: 400,
                }}
            />
            <View
                style={{
                    backgroundColor: Colors.CHARCOAL,
                    padding: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    marginTop: -10, // less overlap now
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: Colors.PRIMARY,
                    }}
                >
                    Welcome to CampusConnect
                </Text>

                <Text
                    style={{
                        fontSize: 17,
                        textAlign: 'center',
                        marginTop: 10,
                        color: Colors.CREAM,
                    }}
                >
                    Your college news, Updated in your pocket. Join the club, Register for new events and Many More.
                </Text>

                <AppButton
                    text="Get Started"
                    onPress={() => router.push('/(auth)/SignUp')}
                    textColor={Colors.CHARCOAL}
                />

                <Pressable onPress={() => router.push('/(auth)/SignIn')}>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: Colors.CREAM,
                            marginTop: 7,
                        }}
                    >
                        Already have an account? Sign in Here
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
