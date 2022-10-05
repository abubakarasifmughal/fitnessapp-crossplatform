import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlanItem from '../components/PlanItem'


const Plans = ({ navigation }: { navigation: any }) => {


    return (
        <ScrollView>
            <View style={{ height: 20 }} />
            <PlanItem
                navigation={navigation}
                image={require('../../assets/remove_pointer.png')}
                title={'Physio led Back plan'}
                subtitle={'Follow a plan designed by a chartered physiotherapist'}
            />
            <PlanItem
                navigation={navigation}
                image={require('../../assets/remove_pointer.png')}
                title={'Physio led Back plan'}
                subtitle={'Follow a plan designed by a chartered physiotherapist'}
            />
        </ScrollView>
    )
}

export default Plans

const styles = StyleSheet.create({})