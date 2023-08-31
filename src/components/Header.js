import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import Icon from './Icon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({
    title,
    lefticon,
    leftIconOnPress,
    rightIcon,
    rightIconOnPress
}) {
  return (
    <View style={styles.header}>
        {
            lefticon?
            <TouchableOpacity onPress={leftIconOnPress} >
            <Icon name={lefticon} size={24}/>
            </TouchableOpacity>
            :
            <View style={{width:24,height:24}}/>
        }
      <Text style={styles.titleText}>{title}</Text>
        {
            rightIcon?
            <TouchableOpacity onPress={rightIconOnPress} >
            <Icon name={rightIcon} size={24}/>
            </TouchableOpacity>
            :
            <View style={{width:24,height:24}}/>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-end',
        backgroundColor:colors.mobile_black_500,
        height:70,
        flexDirection:'row',
        width:windowWidth,
        borderBottomWidth:1,
        borderColor:colors.mobile_black_400,
        padding:16,
        justifyContent:'space-between'
      },
      titleText:{
        color:colors.mobile_black_100,
        fontSize:18,
        fontWeight:'600'
      }
})