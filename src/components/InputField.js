import { View, Text ,TextInput} from 'react-native'
import React,{useState} from 'react'
import styles from '../config/styles';
import * as Animatable from 'react-native-animatable';
import colors from '../config/colors';

export default function InputField({
    value,
    onChangeText,
    placeholder,
    inputkey,
    keyboardType
}
) {
    const [number, onChangeNumber] = useState('');
    return (
        <Animatable.View animation={'flipInX'} style={styles.TextInputView}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor={colors.mobile_black_200}
                key={inputkey}
            />
        </Animatable.View>
    )
}