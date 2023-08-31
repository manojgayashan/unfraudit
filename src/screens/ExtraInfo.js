import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import colors from '../config/colors'
import Header from '../components/Header'
import FilledButton from '../components/FilledButton'
import InputArea from '../components/InputArea'
import Footer from '../components/Footer'
import Help from '../components/Help'
import { useNavigation, useRoute } from '@react-navigation/native'
import InputField from '../components/InputField'
import TouchTracking from '../components/TouchTracking'

function ExtraInfo() {
    const navigation =useNavigation()
    const route = useRoute()

    const [extra, setExtra] = useState('')

    const gotoNext =()=>{
        let params = {
            message:route.params.message,
            extraInfo:extra,            
        }
        navigation.navigate('LoadingResults',params)
    }
  return (
    <View style={styles.mainContainer}>
        <Header 
        lefticon={'back'}
        leftIconOnPress={()=>navigation.goBack()}
        title={'Unfraudit Tools'} 
        />

        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.titleText}>Starting to analyze{'\n'}the message..</Text>
            <Help title={'Why this helps?'} 
            icon={require('../assets/images/document.png')}
            content={"Additionally, if you know the phone or email, this message came from, Please add those info. This will help to locate the person who was sending these messages and reveal their identity. "}
            />
            <View style={styles.innerView}>
                <Text style={styles.subTitleText}>Phone/Email associate with?</Text>
                <InputField placeholder={'Enter phone number or email address..'}/>
            <FilledButton 
            title={'Submit Extra Info'}
            accent='green'
            onPress={()=>gotoNext()}
            />

            <FilledButton 
            title={'Skip for Now'}
            accent='black-text'
            onPress={()=>gotoNext()}
            />

            </View>

            <Footer/>
      </ScrollView>
    </View>
  )
}
export default TouchTracking(ExtraInfo)
const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        alignItems: 'center',
        backgroundColor:colors.mobile_white_100,
        paddingHorizontal:15
    },
    titleText:{
        color:colors.mobile_blue_100,
        fontSize:18,
        fontWeight:'600',
        lineHeight:24,
        paddingVertical:20,
        textAlign:'center'
    },
    innerView:{
        flex:1,
        marginTop:20
    },
    subTitleText:{
        color:colors.mobile_black_100,
        fontWeight:'600',
        fontSize:14,
        lineHeight:22
    }
})