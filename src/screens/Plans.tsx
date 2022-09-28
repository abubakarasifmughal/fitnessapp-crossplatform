import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlanItem from '../components/PlanItem'

const Plans = () => {
    return (
        <ScrollView>
            <View style={{ height: 20 }} />
            <PlanItem
                image={require('../../assets/remove_pointer.png')}
                title={'Physio led Back plan'}
                subtitle={'Follow a plan designed by a chartered physiotherapist'}
            />
            <PlanItem
                image={require('../../assets/remove_pointer.png')}
                title={'Physio led Back plan'}
                subtitle={'Follow a plan designed by a chartered physiotherapist'}
            />
        </ScrollView>
    )
}

export default Plans

const styles = StyleSheet.create({})