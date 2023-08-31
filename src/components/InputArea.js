import { View, Text ,TextInput} from 'react-native'
import React,{useState} from 'react'
import styles from '../config/styles';
import * as Animatable from 'react-native-animatable';
import colors from '../config/colors';

export default function InputArea({
    value,
    onChangeText,
    placeholder,
    inputkey,
    keyboardType
}
) {
    
    return (
        <Animatable.View animation={'fadeIn'} style={styles.TextInputAreaView}>
            <TextInput
                style={styles.inputarea}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor={colors.mobile_black_200}
                key={inputkey}
                multiline={true}
                textAlignVertical='top'
            />
        </Animatable.View>
    )
}