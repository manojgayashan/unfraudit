import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../config/colors'
import Header from '../components/Header'
import FilledButton from '../components/FilledButton'
import InputArea from '../components/InputArea'
import Footer from '../components/Footer'
import Help from '../components/Help'
import { useNavigation, useRoute } from '@react-navigation/native'
import InputField from '../components/InputField'
import Lottie from 'lottie-react-native';
import { callAPI } from '../shared/ApiConnector'
import moment from 'moment'
import TouchTracking from '../components/TouchTracking'

function LoadingResults() {
    const navigation =useNavigation()

    const route = useRoute()

    const checkSpam = () => {
        // const msg = body
        // console.log(msg)
        callAPI("chatbot/scam_checker/", {
            message: route.params.message
        }).then((response) => {
            response['message']=route.params.message
            response['date']=moment().format('MM-DD-YYYY')
            response['saved']=false
            console.log(response)
            // setModalMsg(response.details)
            // setLoading(false)
            navigation.navigate('Results',{response:response,closeScreen:'Analyze'})
        })
        // setTimeout(() => {
        //     value == '1' ?
        //         setIsScam(true) :
        //         setIsScam(false)

        //     setLoading(false)
        // }, 1000);
    }

    useEffect(() => {
        checkSpam()
        // console.log(route.params)
        // setTimeout(() => {
        //     navigation.navigate('Results',{spam:route.params})
        // }, 1000);
    }, [])
    
  return (
    <View style={styles.mainContainer}>
        <Header 
        lefticon={'close'}
        leftIconOnPress={()=>navigation.navigate('Analyze')}
        title={'Unfraudit Tools'} 
        />
        <View style={styles.innerView}>
            <Text style={styles.titleText}>Analyzing the message{'\n'}and related data.. </Text>
            <Lottie source={require('../assets/jsons/loadingResults.json')} autoPlay loop style={styles.loadingAnimation}/>
            <Text style={styles.titleTextBlack}>Wait few seconds to{'\n'}reveal the results </Text>
       </View>
       <Footer/>
    </View>
  )
}
export default TouchTracking(LoadingResults)

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        alignItems: 'center',
        backgroundColor:colors.mobile_white_100,
        paddingHorizontal:20
    },
    titleText:{
        color:colors.mobile_blue_100,
        fontSize:18,
        fontWeight:'600',
        lineHeight:24,
        paddingVertical:20,
        textAlign:'center'
    },
    titleTextBlack:{
        color:colors.mobile_black_100,
        fontSize:14,
        fontWeight:'600',
        lineHeight:22,
        paddingVertical:20,
        textAlign:'center'
    },
    innerView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    loadingAnimation:{
        width:150,
        height:150,
        position:'relative',
        marginBottom:15,
        marginTop:5
    }
})