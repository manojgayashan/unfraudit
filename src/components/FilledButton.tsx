import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import Icon from './Icon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type accentType = 'blue' | 'green' | 'red' | 'light-blue'| 'black-text';

type PropsTypes = {
    title: string;
    accent: accentType;
    onPress: any;
    icon:string;
    disabled:boolean;
    width:number
};

export default function FilledButton(props: PropsTypes) {

    const accentColor =
        props.accent == 'blue' ? colors.mobile_blue_100 :
            props.accent == 'green' ? colors.mobile_green_100 :
                props.accent == 'red' ? colors.mobile_red_100 :
                    colors.mobile_blue_500

    const borderColor =
        props.accent == 'blue' ? colors.mobile_blue_100 :
            props.accent == 'green' ? colors.mobile_green_100 :
                props.accent == 'red' ? colors.mobile_red_100 :
                    colors.mobile_blue_100

    const textColor =
        props.accent == 'light-blue' ? colors.mobile_blue_100 :
        props.accent == 'black-text' ? colors.mobile_black_100 :
            colors.mobile_white_100

    const buttonWidth = 
        props.width? props.width:windowWidth - 30

            
    const styles = StyleSheet.create({
        buttonView: {
            backgroundColor: accentColor,
            borderWidth: 1,
            borderColor: borderColor,
            borderRadius: 4,
            width: buttonWidth,
            paddingVertical: 12,
            alignItems: 'center',
            marginTop:10,
            flexDirection:'row',
            justifyContent:'center'
        },
        disabledButtonView: {
            backgroundColor: colors.mobile_black_300,
            borderWidth: 1,
            borderColor: colors.mobile_black_300,
            borderRadius: 4,
            width: windowWidth - 30,
            paddingVertical: 12,
            alignItems: 'center',
            marginTop:10,
            flexDirection:'row',
            justifyContent:'center'
        },
        buttonText: {
            color: props.disabled?colors.mobile_white_100:textColor,
            fontSize: 14,
            fontWeight: '600',
            marginLeft:props.icon?10:0,
            textAlign:'center'
        },

    })

    
    return (
        <TouchableOpacity disabled={props.disabled} style={props.disabled?styles.disabledButtonView:styles.buttonView} onPress={props.onPress}>
            {
                props.icon?
                <Icon name={props.icon} size={24} color={textColor} />:
                null
            }
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}
