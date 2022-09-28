import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TrainingItem from '../components/TrainingItem'

const Trainings = () => {
    return (
        <ScrollView>
            <View style={{ height: 5 }} />
            <Text style={{
                margin:15,
                fontWeight:'500',
                fontSize:20
            }}>
                WORKOUT COLLECTION
            </Text>
            <TrainingItem
                image={require('../../assets/remove_pointer.png')}
                title={'Physio led Back plan'}
                subtitle={'Follow a plan designed by a chartered physiotherapist'}
            />
            <TrainingItem
                image={require('../../assets/remove_pointer.png')}
                title={'Physio led Back plan'}
                subtitle={'Follow a plan designed by a chartered physiotherapist'}
            />
        </ScrollView>
    )
}

export default Trainings

const styles = StyleSheet.create({})