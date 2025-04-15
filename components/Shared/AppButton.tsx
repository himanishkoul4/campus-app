import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'

type ButtonProps = {
    text: string,
    onPress: () => void;
    loading?: boolean,
    outline?: boolean,
    fullWidth?: boolean,
    bgColor?: string,
    textColor?: string,  // <-- new prop
}

export default function AppButton({
    text,
    onPress,
    loading = false,
    outline = false,
    fullWidth = false,
    bgColor,
    textColor
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                padding: 15,
                backgroundColor: bgColor ? bgColor : (outline ? Colors.WHITE : Colors.PRIMARY),
                borderWidth: outline ? 1 : 0,
                borderColor: Colors.PRIMARY,
                marginTop: 15,
                borderRadius: 10,
                flex: fullWidth ? 1 : 0
            }}>
            {loading ? (
                <ActivityIndicator color={textColor || (outline ? Colors.PRIMARY : Colors.WHITE)} />
            ) : (
                <Text style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: textColor || (outline ? Colors.PRIMARY : Colors.WHITE)
                }}>
                    {text}
                </Text>
            )}
        </TouchableOpacity>
    )
}
