import { View, Text, StyleSheet, SectionList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../config/colors'
import Header from '../components/Header'
import RecordsData from '../assets/jsons/RecordsData';
import Footer from '../components/Footer';
import moment from 'moment';
import { session } from '../shared/sessions';
import { useNavigation } from '@react-navigation/native';
import TouchTracking from '../components/TouchTracking';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function History() {

    const now = new Date();
    const recentCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    const weekCutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    const navigation = useNavigation()
    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)
    const today = moment().format('MM-DD-YYYY')

    const getRecords = () => {
        setLoading(true)
        session("history").then((response) => {
            if(response){
                setRecords(JSON.parse(response))
                setLoading(false)                
            }
            else{
                setRecords(null)
                setLoading(false) 
            }
            // console.log(records)
        })
    }
    useEffect(() => {
        getRecords()
    }, [])

    const sections = [
        {
            title: "Today",
            data: records == null ? null : records.filter((data) => data.date == today),
        },
        {
            title: "This Week",
            data: records == null ? null : records.filter((data) => data.date > moment(weekCutoff).format('MM-DD-YYYY') && data.date <= moment(recentCutoff).format('MM-DD-YYYY')
            ),
        },
        {
            title: "Older than Week",
            data: records == null ? null : records.filter((data) => data.date <= moment(weekCutoff).format('MM-DD-YYYY')),
        },
    ];

    const renderRecord = ({ item, index }) => (
        <TouchableOpacity onPress={()=>{navigation.navigate('Results',{response:item,closeScreen:'History'})}} style={styles.recordContainer}>
            <View style={item.scam ? styles.spamDot : styles.notSpamDot} />
            <View style={styles.recordRightView}>
                <Text numberOfLines={2} style={styles.messageText}>{item.message}</Text>
                <View style={styles.row}>
                    <Text style={styles.recordBottomText}>{item.date} | {item.saved ? 'Saved' : 'Auto Detected'}</Text>
                </View>
            </View>

        </TouchableOpacity>)

    const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <Header
                title={'Saved Records'}
            />
            <ScrollView nestedScrollEnabled={true}>
                {
                    loading?null:
                    records == null ?
                        <View style={styles.norecordsContainer}>
                            <Text></Text>
                            <Text style={styles.norecordsText}>No Records Found</Text>
                            <Footer />
                        </View>
                        :
                        <SectionList
                            style={styles.recordList}
                            sections={sections}
                            renderItem={renderRecord}
                            renderSectionHeader={renderSectionHeader}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ flex: 1, width: windowWidth - 30 }}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            ListFooterComponent={<Footer />}
                            scrollEnabled={true}
                            // nestedScrollEnabled={true}
                        />

                }
            </ScrollView>
        </View>
    )
}
export default TouchTracking(History)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.mobile_white_100
    },
    recordList: {
        paddingHorizontal: 15,
    },
    recordContainer: {
        borderWidth: 1,
        borderColor: colors.mobile_black_400,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 4
    },
    sectionHeaderContainer: {
        paddingVertical: 12,
        backgroundColor: colors.mobile_white_100,
    },
    sectionHeaderText: {
        fontWeight: "600",
        color: colors.mobile_black_100,
        fontSize: 14
    },
    separator: {
        marginBottom: 5,
    },
    spamDot: {
        width: 24,
        height: 24,
        borderRadius: 20,
        borderWidth: 7,
        borderColor: colors.mobile_red_500,
        backgroundColor: colors.mobile_red_100
    },
    notSpamDot: {
        width: 24,
        height: 24,
        borderRadius: 20,
        borderWidth: 7,
        borderColor: colors.mobile_green_500,
        backgroundColor: colors.mobile_green_100
    },
    recordRightView: {
        marginHorizontal: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        color: colors.mobile_black_100
    },
    recordBottomText: {
        color: colors.mobile_blue_100,
        lineHeight: 16,
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 5
    },
    norecordsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight-150
    },
    norecordsText: {
        fontSize: 16,
        color: colors.mobile_black_300,
        fontWeight: '600'
    }
})