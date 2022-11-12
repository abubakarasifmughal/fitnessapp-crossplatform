import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const TrainingsDetailPage = ({ navigation, route }: { navigation: any, route: any }) => {
  useEffect(() => {
    navigation.setOptions({title:route.params.title})
  }, [navigation,route])

  return (
    <ScrollView contentContainerStyle={{ padding: 10,}}>
    <Text style={{ paddingLeft: 15, fontWeight: '400', fontSize: 15, marginTop: 10,marginBottom:10 }}>Follow a plan designed by the chartered physiotherapist</Text>
    <View style={{ borderBottomColor: 'gainsboro', borderWidth: 1,width:'90%',alignSelf:'center' }} />
    {/* <LabledVideoComponents />
    <LabledVideoComponents /> */}

    <View style={{height:100}} />
  </ScrollView>
  )
}

export default TrainingsDetailPage

const styles = StyleSheet.create({})