import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'

const { width } = Dimensions.get('screen')

const Pie_Chart = () => {
    const [Series, setSeries] = useState([
        1, 2, 2
    ])
    const Colors = ['red', 'blue', 'green']
    return (
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