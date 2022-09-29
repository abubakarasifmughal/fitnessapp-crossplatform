import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AboutPage = () => {
  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ height: 50 }} />
      <Image
        source={require('../../assets/logo.png')}
        style={{
          backgroundColor: 'white',
          height: 100, width: 100, alignSelf: 'center',
          borderRadius: 15,
          marginBottom: 25,
        }}
        resizeMode='contain' />
      <Text style={styles.TextStyle}>
        BackAware is a mobile application which is used to maintain a
        good posture and technique so you can maintain a healthy lifestyle.
      </Text>
      <Text style={styles.TextStyle}>
        The application is used with a BackAware Belt. Along with the
        app can make you awarewhen your back is int good position or
        in a bad position.
      </Text>
      <Text style={styles.TextStyle}>
        You can also track your position throughout the day and also assess
        your positions during the workouts.
      </Text>
      <Text style={styles.TextStyle}>
        In addition the application includes video training series to get the most
        from your BackAware Belt.
      </Text>
    </ScrollView>
  )
}

export default AboutPage

const styles = StyleSheet.create({
  TextStyle: { textAlign: 'center', fontSize: 18,marginBottom:10 },
})