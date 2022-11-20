import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'

const { width } = Dimensions.get('screen')

const Pie_Chart = ({ Series }: {
    Series: number[]
}) => {
    const Colors = ['green', 'orange', 'red']
    return (
        <>
            <View style={{ width: '100%', alignItems: 'flex-start', paddingLeft: 30 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <View style={{ height: 20, backgroundColor: 'green', width: 40, marginRight: 10 }} />
                    <Text>Good</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <View style={{ height: 20, backgroundColor: 'orange', width: 40, marginRight: 10 }} />
                    <Text>Average</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <View style={{ height: 20, backgroundColor: 'red', width: 40, marginRight: 10 }} />
                    <Text>Bad</Text>
                </View>
            </View>
            <View style={styles.PieContainer}>
                <PieChart
                    widthAndHeight={width / 2}
                    series={Series}
                    sliceColor={Colors}
                    doughnut={true}
                    style={{
                        shadowColor: 'gray',
                        shadowRadius: 5,
                        shadowOffset: {
                            height: 0,
                            width: 0,
                        },
                        shadowOpacity: 1
                    }}
                    coverRadius={0.5}
                    coverFill={'white'}
                />
                <View style={styles.PieChartTextContainer}>
                    <Text style={styles.PieChartText}>Stats</Text>
                </View>
            </View>
        </>

    )
}

export default Pie_Chart

const styles = StyleSheet.create({
    PieContainer: {
        alignSelf: 'center',
        marginTop: 40,
    },
    PieChartTextContainer: { position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: width / 2, },
    PieChartText: {
        fontSize: 20,
        color: 'rgb(100,100,100)',
        fontWeight: 'bold',
    }
})