import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../config/colors'
import { useRoute } from '@react-navigation/native'

export default function Footer() {

  const route = useRoute()

  useEffect(() => {
    console.log(route.name)
  }, [])
  
  return (
    <View>
      <Text style={styles.footerText}>Powered by SocialCatfish</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    footerText:{
        fontSize:14,
        fontWeight:'600',
        color:colors.mobile_black_300,
        textAlign:'center',
        paddingTop:25,
        paddingBottom:10
    }
})