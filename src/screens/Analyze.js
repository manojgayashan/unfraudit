import { View, Text, StyleSheet, ScrollView,BackHandler,Modal,Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import colors from '../config/colors'
import Header from '../components/Header'
import FilledButton from '../components/FilledButton'
import InputArea from '../components/InputArea'
import Footer from '../components/Footer'
import Help from '../components/Help'
import { useNavigation } from '@react-navigation/native'
import {version} from '../../package.json'
import checkVersion from 'react-native-store-version';
import TouchTracking from '../components/TouchTracking'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Analyze() {
    const navigation =useNavigation()
    const [msg, setMsg] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const gotoNextPage=()=>{
        navigation.navigate('ExtraInfo',{message:msg})
        setMsg('')
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {return true})
        // console.log(version)
        init()
    }, [])
    
    
    const init = async () => {
        // const { version } = Constants.manifest;
  
        try {
          const check = await checkVersion({
            version:version,
            // iosStoreURL: 'https://apps.apple.com/jp/app/github/id1477376905',
            androidStoreURL: 'https://play.google.com/store/apps/details?id=com.unfraudit',
          });
  
          console.log(check)
  
        //   setResult(check)
  
          if (check.result !== 'new') {
            setModalVisible(true)
            // setLatest(false);
          }
        } catch (e) {
          console.log(e.message);
        //   setModalVisible(true)
        }
      };

  return (
    <View style={styles.mainContainer}>
        <Header 
        title={'Unfraudit Tools'} 
        />

        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.titleText}>Protect yourself from {'\n'}any online scam</Text>
            <View style={styles.innerView}>
                <Text style={styles.subTitleText}>Add the Copied Message</Text>
                <InputArea value={msg} onChangeText={setMsg} placeholder={'Paste the text you copied here..'}/>
            

            <FilledButton 
            title={'Analyze Message'}
            accent='blue'
            onPress={()=>gotoNextPage()}
            disabled={msg==''?true:false}
            />

            </View>
            <Help title={'How this works?'} 
            icon={require('../assets/images/idea.png')}
            content={"Just copy and paste the sketchy text message or email text you’ve received to analyze. We'll guide you to safety using artificial intelligence coupled with our proprietary search tools. Or you can activate Auto Analyzer here."}
            />
            <Footer/>
      </ScrollView>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitleText}>Update Your App</Text>
            <Text style={styles.modalText}>To enjoy the newest Features tap the button below</Text>
            
            <FilledButton title='Update Now' accent='green' onPress={()=>{}} width={windowWidth/2} />
          </View>
        </View>
      </Modal>

    </View>
  )
}
export default TouchTracking(Analyze);

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
        flex:1
    },
    subTitleText:{
        color:colors.mobile_black_100,
        fontWeight:'600',
        fontSize:14,
        lineHeight:22
    }, 
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:'rgba(0,0,0,0.4)'
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:windowWidth-50
      },
      modalText: {
        marginBottom: 5,
        textAlign: 'center',
        color:colors.mobile_black_100,
        fontSize:14
      },
      modalTitleText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight:'600',
        color:colors.mobile_black_100,
        fontSize:18
      },
})