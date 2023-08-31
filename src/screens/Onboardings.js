import { View, Text, Dimensions, ScrollView, StyleSheet, Image,TouchableOpacity, StatusBar } from 'react-native'
import React, {useRef,useState,useEffect} from 'react'
import OnboardingData from '../assets/jsons/OnboardingData';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'
import Footer from '../components/Footer';
import TouchTracking from '../components/TouchTracking';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Onboardings() {

    const navigation = useNavigation()
    const scrollView = useRef();
    const [current, setCurrent] = useState(0);
    const [onboarded, setOnboarded] = useState();
    
    useEffect(() => {
      getStorage()
    }, [])
  
    const getStorage = async () => {
      const onboarded = await AsyncStorage.getItem('ONBOARDED');
      if(onboarded=='true'){
        navigation.navigate('BottomTabs')
      }
      setTimeout(() => {
        SplashScreen.hide()
      }, 300);
    };

    const goNext = () => {
        var total = 2;
        if (current < total) {
          scrollView.current.scrollTo({ x: windowWidth * (current + 1) });
          setCurrent(current + 1);
        } else {
          setCurrent(0);
          scrollView.current.scrollTo({ x: 0 });
        }
      };

      const goBack = () => {
        console.log('current', current);
        var total = 2;
        if (current > 0) {
          scrollView.current.scrollTo({ x: windowWidth * (current - 1) });
          setCurrent(current - 1);
        } else {
          setCurrent(total);
          scrollView.current.scrollTo({ x: windowWidth * total });
        }
      };

      const onPressFinish = async () => {
        await AsyncStorage.setItem('ONBOARDED', 'true');
        navigation.navigate('BottomTabs')
      };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.mobile_white_100} barStyle={'dark-content'}/>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={styles.caroasalScroll}
        contentContainerStyle={styles.caroasalScrollContent}
        ref={scrollView}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          var position = event.nativeEvent.contentOffset.x;
          var val = Math.round(position / windowWidth);
          var rowval = position / windowWidth
          if (val >= 0) {
            setCurrent(val);
          }
          
        //   console.log(current)

        }}
      >
        <View style={styles.caroasalItemsView}>
          {
            OnboardingData.map((data,index)=>{
                return (
                    <View key={index} style={styles.itemView}>
                        <Image source={data.image} style={styles.itemImage} />
                        <Text style={styles.titleText}>{data.title}</Text>
                        <Text style={styles.descText}>{data.desc}</Text>
                    </View>
                )
            })
          }

        </View>

      </ScrollView>
      
      <View
          style={styles.indicaterView}
        >
          {OnboardingData.map((d, index) => (
            <View
              key={index}
              style={index == current ? styles.filledCircle : [styles.filledCircle, { backgroundColor: colors.mobile_black_400 }]}
            />
          ))}
        </View>

        
      <View style={styles.indicaterView}>
          {current<= 1?
          <TouchableOpacity style={styles.blueButton} onPress={()=>goNext()}>
            <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.blueButton} onPress={()=>onPressFinish()}>
            <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            }
        </View>

            <Text onPress={()=>onPressFinish()} style={styles.skipText}>Skip for Now</Text>
<Footer/>
    </View>
  )
}
export default TouchTracking(Onboardings);

const styles = StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      backgroundColor:colors.mobile_white_100,
      flex:1,
      justifyContent:'center',
      paddingBottom:50
    },
    caroasalScroll: {
      width: windowWidth,
    },
    caroasalScrollContent: {
      alignItems: "center",
      justifyContent: "center",
    },
    caroasalItemsView:{ 
        flexDirection: "row", 
        width: windowWidth * 3, 
        justifyContent: 'space-around',
        height:windowHeight/2,
        alignItems:'center' 
    },
    itemView:{
        alignItems:'center',
        width:windowWidth-100,
        justifyContent:'space-between',
        // backgroundColor:'red',
        height:windowHeight/2
    },
    itemImage:{
        width:150,
        height:150
    },
    titleText:{
        color:colors.mobile_blue_100,
        fontWeight:'600',
        fontSize:18
    },
    descText:{
        color:colors.mobile_black_100,
        fontSize:14,
        textAlign:'center',
        lineHeight:22
    },
    indicaterView: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    filledCircle: {
      borderRadius: 8,
      width: 8,
      height: 8,
      backgroundColor: colors.mobile_blue_100,
      margin: 8,
      opacity: 1
    },
    blueButton:{
        backgroundColor:colors.mobile_blue_500,
        borderColor:colors.mobile_blue_100,
        borderWidth:1,
        borderRadius:4,
        paddingHorizontal:48,
        paddingVertical:12,
        marginVertical:22
    },
    buttonText:{
        color:colors.mobile_blue_100,
        fontSize:14,
        fontWeight:'600'
    },
    skipText:{
        color:colors.mobile_blue_100,
        fontSize:12,
        fontWeight:'500'
        
    }
  });