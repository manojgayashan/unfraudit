import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../config/colors'

export default function Help({
    icon,
    title,
    content
}) {
  return (
    <View style={styles.mainContainer}>
        <View style={styles.row}>
            {
                icon?
                <Image source={icon} style={styles.icon} />
                :
                null
            }
           <Text style={styles.titleText}>{title}</Text> 
        </View>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:colors.mobile_black_500,
        borderRadius:4,
        borderWidth:1,
        borderColor:colors.mobile_black_400,
        marginTop:20,
        paddingVertical:16,
        paddingHorizontal:15,
        width:'100%'
    },
    titleText:{
        color:colors.mobile_black_100,
        fontWeight:'600',
        lineHeight:22
    },
    icon:{
        height:32,
        width:32,
        marginRight:5
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    contentText:{
        color:colors.mobile_black_100,
        lineHeight:22,
        paddingTop:10,
        fontWeight:'400'
    }
})