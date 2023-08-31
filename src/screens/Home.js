import { View, Text, StatusBar, ScrollView, TouchableOpacity, Modal, Pressable, ActivityIndicator, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import styles from '../config/styles'
import colors from '../config/colors'
import { Dropdown } from 'react-native-element-dropdown';
import InputField from '../components/InputField';
import * as Animatable from 'react-native-animatable';
import InputArea from '../components/InputArea';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { callAPI } from '../shared/ApiConnector';
import * as ImagePicker from 'react-native-image-picker';

export default function Home() {

    const data = [
        { label: 'Text Message', value: '1' },
        { label: 'Email Scams', value: '2' },
        { label: 'Fake Contract Scams', value: '3' },
        // { label: 'Item 3', value: null },
    ];

    const [value, setValue] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [key1, setKey1] = useState(0);
    const [body, setBody] = useState('');
    const [msg, setMgs] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isScam, setIsScam] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const [uploading, setUploading] = useState(false)

    const handleError = (err) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }

    const chooseFile = () => {
        DocumentPicker.pick({
            type: types.images,
        })
            .then((res) => {
                console.log(res)
                setResult(res)
            })
            .catch(handleError)
    }

    const pickImage = async () => {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          includeBase64: false,
          storageOptions: {
            skipBackup: true
          }
        }
    
        ImagePicker.launchImageLibrary(options, (response) => {
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
    console.log(response.assets[0])
            // callVisionApi(response.assets[0])
            setResult(response.assets[0])
            // setImage(response.assets[0]['uri'])
    
          }
        });
    
      };

    const checkSpam = (msg) => {
        setLoading(true)
        setModalVisible(true)
        // const msg = body
        console.log(msg)
        callAPI("chatbot/scam_checker/", {
            message: msg
        }).then((response) => {
            console.log(response)
            setModalMsg(response.details)
            setLoading(false)
            response.scam == true ?
                setIsScam(true)
                :
                setIsScam(false)
        })
        // setTimeout(() => {
        //     value == '1' ?
        //         setIsScam(true) :
        //         setIsScam(false)

        //     setLoading(false)
        // }, 1000);
    }

    const callVisionApi = (file) => {
        setUploading(true)
        console.log(file.uri)
        // setModalVisible(true)
        const data = new FormData();

        data.append('file', {
            uri: file.uri,
            name: file.fileName,
            type: file.type
        });

        fetch('https://unfraudit.com/ocr/API.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'token': 'Bearer 123123adasdasdas2313',
            },
            body: data,
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setUploading(false)
                json.success == true ?
                    setMgs(json.text)
                    :
                    setMgs('')
            });

    }

    const reset =()=>{
        setKey1(key1 + 1)
        setMgs('')
        setResult(null)
        setEmail('')
        setPhoneNumber('')
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.container}>

                    <StatusBar backgroundColor={colors.mobile_purple_100} barStyle={'light-content'} />
                    <Animatable.View animation={'fadeInDown'} style={styles.homeHeader}>
                        <TouchableOpacity onPress={()=>{reset();setValue(null)}} style={styles.resetButton}>
                                                            <Ionicons name={'refresh'} size={20} color={colors.mobile_white_100} />
                        </TouchableOpacity>
                        {/* <Text style={styles.headerTitle}>Home</Text> */}
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: colors.mobile_white_100 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            iconColor={colors.mobile_white_100}
                            data={data}
                            search={false}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select the scam type' : '...'}
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                                reset()
                            }}
                        //   renderLeftIcon={() => (
                        //     <AntDesign
                        //       style={styles.icon}
                        //       color={isFocus ? 'blue' : 'black'}
                        //       name="Safety"
                        //       size={20}
                        //     />
                        //   )}
                        />

                        {
                            value == null ?
                                null :
                                value == '1' ?
                                    <View>
                                        <InputField
                                            value={phoneNumber}
                                            onChangeText={(text) => { setPhoneNumber(text) }}
                                            placeholder={'Phone number'}
                                            keyboardType={'phone-pad'}
                                            key={key1}
                                        />
                                        <View style={styles.textAreaContent}>
                                            <InputArea
                                                value={msg}
                                                onChangeText={(text) => { setMgs(text) }}
                                                placeholder={'Message'}
                                                keyboardType={'default'}
                                                key={key1}
                                            />
                                        </View>
                                    </View>
                                    :
                                    value == '2' ?
                                        <View>
                                            <InputField
                                                value={email}
                                                onChangeText={(text) => { setEmail(text) }}
                                                placeholder={'Email Address'}
                                                keyboardType={'email-address'}
                                                key={key1}
                                            />
                                            <View style={styles.textAreaContent}>
                                                <InputArea
                                                    value={msg}
                                                    onChangeText={(text) => { setMgs(text) }}
                                                    placeholder={'Body'}
                                                    keyboardType={'default'}
                                                    key={key1}
                                                />
                                            </View>
                                        </View>
                                        :
                                        value == '3' ?
                                            <View style={styles.uploadButtonContent}>
                                                <TouchableOpacity onPress={() => pickImage()} style={[styles.whiteButton, { marginTop: -15 }]}>
                                                    <Text>+ Choose Image File</Text>
                                                </TouchableOpacity>
                                                { 
                                                result==null?
                                                null:
                                                <View>
                                                <View style={[styles.row,{paddingHorizontal:15,paddingTop:20}]}>
                                                    <View style={styles.imageView}>
                                                    <Image source={{uri:result.uri}} style={styles.uploadImage} />
                                                </View>     
                                                </View>  


                                                <TouchableOpacity onPress={()=>callVisionApi(result)} disabled={result==null?true:false} style={[styles.purpleButton, { marginTop: 15 }]}>
                                                    {uploading?
                                                    <ActivityIndicator color={colors.mobile_white_100} size={22} />
                                                    :
                                                    <Text style={styles.whiteText}>Upload</Text>
                                                }
                                                </TouchableOpacity> 
                                                </View>                                                 
                                                }
                                            </View>
                                            :
                                            null
                        }

                    </Animatable.View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.buttonClose}>
                                    <Text>{'\u2715'}</Text>
                                </TouchableOpacity>

                                {
                                    loading ?
                                        <Text style={styles.modalText}>Scanning..</Text>
                                        :
                                        <Text style={styles.modalText}>Scan Complete</Text>
                                }
                                {
                                    loading ?
                                        <ActivityIndicator color={colors.mobile_purple_100} size={30} />
                                        :
                                        isScam ?
                                            <View>
                                                <View style={styles.redView}>
                                                    <Text style={styles.text}>Scam Detected!</Text>
                                                </View>
                                                <View style={styles.scamInnerView}>
                                                    <View style={styles.purpleBorderedView}>
                                                        <View style={styles.row}>
                                                            <MaterialCommunityIcons name={'lightbulb-on-outline'} size={17} color={colors.mobile_black_100} />
                                                            <Text style={styles.text}>  More Information</Text>
                                                        </View>
                                                        <Text style={styles.smallText}>{modalMsg}</Text>
                                                    </View>
                                                    {/* <View style={styles.redBorderedView}>
                                                <View style={styles.row}>
                                                    <Ionicons name={'warning-outline'} size={17} color={colors.mobile_red_100} />
                                                    <Text style={styles.redText}>  Other Red Flags</Text>
                                                </View>
                                                <Text style={styles.smallText}>We Don't have the phone number in our system</Text>
                                            </View> */}

                                                </View>
                                            </View>
                                            :
                                            <View>
                                                <View style={styles.greenView}>
                                                    <Text style={styles.text}>Not a Scam</Text>
                                                </View>

                                                <View style={styles.scamInnerView}>
                                                    <View style={styles.purpleBorderedView}>
                                                        <View style={styles.row}>
                                                            <MaterialCommunityIcons name={'lightbulb-on-outline'} size={17} color={colors.mobile_black_100} />
                                                            <Text style={styles.text}>  More Information</Text>
                                                        </View>
                                                        <Text style={styles.smallText}>{modalMsg}</Text>
                                                    </View>

                                                </View>
                                            </View>
                                }
                            </View>
                        </View>
                    </Modal>
                    {
                        value == null ?
                            <Image source={require('../assets/images/robot.png')} style={styles.roboteImage} />
                            :
                            null
                    }
                    <TouchableOpacity onPress={() => checkSpam(msg)} disabled={msg == '' ? true : false} style={msg == '' ? styles.floatingButtonDeactivate : styles.floatingButton}>
                        <View>
                            <Text style={styles.whiteText}>Analize</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}