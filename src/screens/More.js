import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'
import colors from '../config/colors'
import Header from '../components/Header'
import Card from '../components/Card'
import Icon from '../components/Icon'
import Footer from '../components/Footer'
import TouchTracking from '../components/TouchTracking'

function More() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.mainContainer}>
            <Header
                title={'More Settings'}
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.innerView}>
            <Card
                title={'Push Notification'}
                content={'Notification turned on. Click here to turn on or off. This will allow us to instantly identify scam messages in your inbox or emails. '}
                rightIcon={
                    <Switch
                        trackColor={{ false: colors.mobile_black_300, true: colors.mobile_blue_100 }}
                        thumbColor={colors.mobile_white_100}
                        ios_backgroundColor={colors.mobile_blue_100}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />}
            />

            <Card
                title={'FAQs'}
                rightIcon={<Icon name='right-circle' size={21} color={colors.mobile_black_300} />}
            />
            <Card
                title={'Contact Us'}
                rightIcon={<Icon name='right-circle' size={21} color={colors.mobile_black_300} />}
            />
            <Card
                title={'About Us'}
                rightIcon={<Icon name='right-circle' size={21} color={colors.mobile_black_300} />}
            />
            <Card
                title={'Terms of Service'}
                rightIcon={<Icon name='right-circle' size={21} color={colors.mobile_black_300} />}
            />
            <Card
                title={'Privacy Policy'}
                rightIcon={<Icon name='right-circle' size={21} color={colors.mobile_black_300} />}
            />
            <Card
                title={'Privacy Policy - CA and NV'}
                rightIcon={<Icon name='right-circle' size={21} color={colors.mobile_black_300} />}
            />
            <Footer/>
            </ScrollView>
        </View>
    )
}
export default TouchTracking(More)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.mobile_white_100,
    },
    innerView:{
        paddingTop:14
    }
})