import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mobile_white_100,
    },
    text: {
        color: colors.mobile_black_100,
        fontSize: 14
    },
    smallText: {
        color: colors.mobile_black_100,
        fontSize: 12
    },
    homeHeader: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        width: windowWidth,
        backgroundColor: colors.mobile_purple_100,
        // padding: 15,
        zIndex: 9999
    },
    headerTitle: {
        color: colors.mobile_white_100,
        fontSize: 17
    },
    whiteText: {
        color: colors.mobile_white_100,
        fontSize: 14
    },
    dropdown: {
        // height: 50,
        borderColor: colors.mobile_white_100,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderWidth: 0.5,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 15
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        color: colors.mobile_white_100,
        opacity: 0.7
    },
    selectedTextStyle: {
        fontSize: 14,
        color: colors.mobile_white_100
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.mobile_black_300,
        borderRadius: 4,
        paddingHorizontal: 10,
        backgroundColor: colors.mobile_white_100,
        paddingVertical: 5,
        height:42
    },
    inputarea: {
        borderWidth: 1,
        borderColor: colors.mobile_black_300,
        borderRadius: 4,
        paddingHorizontal: 8,
        backgroundColor: colors.mobile_white_100,
        paddingVertical: 5,
        marginTop: 10,
        height: windowHeight / 5,
    },
    TextInputView: {
        marginTop:10,
        // marginVertical: 10,
        zIndex: 1,
    },
    TextInputAreaView: {
        zIndex: 1,
    },
    scrollView: {
        padding: 15
    },
    textAreaContent: {
        backgroundColor: colors.mobile_white_100,
    },
    uploadButtonContent: {
        backgroundColor: colors.mobile_white_100,
        marginTop: 15
    },
    floatingButton: {
        position: 'absolute',
        bottom: 15,
        backgroundColor: colors.mobile_purple_100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'center',
        width: windowWidth - 30,
        alignItems: 'center'
    },
    floatingButtonDeactivate: {
        position: 'absolute',
        bottom: 15,
        backgroundColor: colors.mobile_black_300,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'center',
        width: windowWidth - 30,
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalView: {
        // margin: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: windowWidth - 50
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        position: 'absolute',
        top: 5,
        right: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: colors.mobile_purple_100
    },
    whiteButton: {
        backgroundColor: colors.mobile_white_100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'center',
        width: windowWidth - 30,
        alignItems: 'center',
        elevation: 5
    },
    purpleButton: {
        backgroundColor: colors.mobile_purple_100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'center',
        width: windowWidth - 30,
        alignItems: 'center'
    },
    greenView: {
        backgroundColor: colors.mobile_green_100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center'
    },
    redView: {
        backgroundColor: colors.mobile_red_100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    scamInnerView: {
        alignItems: 'center'
    },
    redBorderedView: {
        borderWidth: 0.7,
        borderColor: colors.mobile_red_100,
        borderRadius: 5,
        width: windowWidth - 70,
        alignItems: 'center',
        padding: 10
    },
    purpleBorderedView: {
        borderWidth: 0.7,
        borderColor: colors.mobile_purple_100,
        borderRadius: 5,
        width: windowWidth - 70,
        marginTop: 15,
        alignItems: 'center',
        padding: 10
    },
    redText: {
        fontSize: 15,
        color: colors.mobile_red_100
    },
    roboteImage: {
        width: windowWidth - 60,
        height: windowWidth - 50,
        alignSelf: 'center',
        marginTop: 25
    },
    uploadImage: {
        width: (windowWidth - 40) / 2,
        height: (windowWidth - 40) / 2,
        resizeMode: 'contain',
    },
    imageView:{
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
        margin:5,
        // width:10,
        // height:10,
        // backgroundColor:'red'
    },
    resetButton:{
        marginRight:15,
        alignSelf:'flex-end'
    }
    

});

export default styles;