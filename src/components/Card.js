import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import colors from '../config/colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Card({
    title,
    rightIcon,
    content
}) {
    return (
        <View style={styles.cardView}>
            <View style={styles.row}>
                <Text style={styles.titleText}>{title}</Text>
                {rightIcon}
            </View>
            {
                content?<Text style={styles.contentText}>{content}</Text>:null
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        color: colors.mobile_blue_100,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 22,
        paddingBottom: 5,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    cardView:{
        backgroundColor:colors.mobile_white_100,
        borderRadius:4,
        borderColor:colors.mobile_black_400 ,
        borderWidth:1,
        marginVertical:7,
        width:windowWidth-30,
        padding:16
    },
    contentText:{
        color:colors.mobile_black_100,
        fontSize:11,
        fontWeight:'400',
        lineHeight:18,
        width:'80%',
    }
})