import { View, Text, StyleSheet, ScrollView,Image } from 'react-native'
import React, { useEffect,useState } from 'react'
import colors from '../config/colors'
import Header from '../components/Header'
import FilledButton from '../components/FilledButton'
import InputArea from '../components/InputArea'
import Footer from '../components/Footer'
import Help from '../components/Help'
import { useNavigation, useRoute } from '@react-navigation/native'
import InputField from '../components/InputField'
import * as Animatable from 'react-native-animatable'
import { session } from '../shared/sessions'
import TouchTracking from '../components/TouchTracking'

function Results() {

    const navigation =useNavigation()
    const route = useRoute()
    const [isScam, setIsScam] = useState(true)
    const [key, setKey] = useState(0)

    const [result, setResult] = useState(route.params.response)

    useEffect(() => {
        // console.log(route.params)
        // saveRecord()
    }, [])
    
    const saveRecord =()=>{
        
        // let results = route.params
        // let vals = {
        //     message: results.message,

        // }
        session("history").then((response) => {
            result['saved']=true
            setKey(key+1)
            let res = JSON.parse(response)
            console.log(res)
            if(response){
                // console.log(result['saved'])
                res.push(result)
                session("history",JSON.stringify(res))
            }
            else{
                let vals = []
                // console.log(result)
                vals.push(result)
                session("history",JSON.stringify(vals))
            }
        })

    }
    

  return (
    <View style={styles.mainContainer}>
        <Header 
        lefticon={'close'}
        leftIconOnPress={()=>navigation.navigate(route.params.closeScreen)}
        title={'Unfraudit Tools'} 
        />
        <ScrollView contentContainerStyle={styles.innerView} showsVerticalScrollIndicator={false} >
            <Text style={styles.titleText}>Analyze Completed </Text>
            {
                result.scam?
                <View style={styles.isScamView}>
                    <Animatable.Image animation={'zoomIn'} style={styles.image} source={require('../assets/images/scam.png')} />
                    <Animatable.View style={styles.scam} animation={'fadeIn'} >
                        <Text style={styles.scamText}>Scam Detected</Text>
                    </Animatable.View>
                </View>
                :
                <View style={styles.isScamView}>
                    <Animatable.Image animation={'zoomIn'} style={styles.image} source={require('../assets/images/notscam.png')} />
                    <Animatable.View style={styles.scam} animation={'fadeIn'} >
                        <Text style={styles.noScamText}>No Scam Detected</Text>
                    </Animatable.View>
                </View>
            }
            <Help 
            title={"What’s this mean?"} 
            content={result.details}
            // content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do eiusmod tempor incididunt ut labore dolor sit amet, consectetur adipiscing elit."}
            />
            <FilledButton key={key} disabled={result.saved} title={result.saved?'Saved':'Save This Record'} accent='light-blue' icon={result.saved?null:'save'} onPress={()=>{saveRecord()}} />
       <Footer/>
       </ScrollView>
    </View>
  )
}

export default TouchTracking(Results);

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
    titleTextBlack:{
        color:colors.mobile_black_100,
        fontSize:14,
        fontWeight:'600',
        lineHeight:22,
        paddingVertical:20,
        textAlign:'center'
    },
    innerView:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:150,
        height:150
    },
    isScamView:{
        alignItems:'center'
    },
    scam:{
        backgroundColor:colors.mobile_black_500,
        borderRadius:50,
        borderWidth:1,
        borderColor:colors.mobile_black_300,
        paddingHorizontal:20,
        paddingVertical:12,
        alignItems:'center'
    },
    scamText:{
        color:colors.mobile_red_100,
        fontSize:18,
        fontWeight:'600',
        lineHeight:24
    },
    noScamText:{
        color:colors.mobile_green_100,
        fontSize:18,
        fontWeight:'600',
        lineHeight:24
    },

})