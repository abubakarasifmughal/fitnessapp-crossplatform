import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LabledVideoComponents from '../components/LabledVideoComponents'
import { maximizeVideo, setPlayerData, VideoPlayerDataStore, VideoStore } from '../shared/store'
import planHook from '../shared/planHook'
const { height, width } = Dimensions.get('screen')
const PlanDetailPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const { loadPlanData, Plans } = planHook()
  useEffect(() => {
    navigation.setOptions({ title: route.params.title })
    loadPlanData()
  }, [navigation, route])

  const onPressHandler = (index: number) => {
    VideoStore.dispatch(maximizeVideo())
    VideoPlayerDataStore.dispatch(setPlayerData({
      playlist: Plans,
      activeIndex: index
    }))
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <Image
        source={require('../../assets/pointer.png')}
        style={{ backgroundColor: 'rgb(200,200,200)', height: height / 4, width: "100%", borderRadius: 10, }}
        resizeMode="cover"
      />
      <Text style={{ paddingLeft: 15, fontWeight: '600', fontSize: 20, marginTop: 25 }}>{route.params.title}</Text>
      <Text style={{ paddingLeft: 15, fontWeight: '400', fontSize: 15, marginTop: 10 }}>Follow a plan designed by the chartered physiotherapist</Text>
      <View style={{ flexDirection: 'row', marginTop: 15, padding: 5 }}>
        <Image source={require('../../assets/finish-flag.png')}
          resizeMode="contain"
          style={{ height: 30, width: 30, margin: 15, alignSelf: 'center' }} />
        <Text
          style={{ flex: 1 }}
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas incidunt exercitationem sapiente architecto laudantium obcaecati inventore? Similique, accusamus, eos, debitis dicta perspiciatis dolorum adipisci odit hic quos nulla voluptas aut!</Text>
      </View>
      <View style={{ flexDirection: 'row', padding: 5 }}>
        <Image source={require('../../assets/calendar.png')}
          resizeMode="contain"
          style={{ height: 30, width: 30, margin: 15, alignSelf: 'center' }} />
        <Text
          style={{ flex: 1, alignSelf: 'center', fontSize: 17, fontWeight: '500' }}
        >6 weeks </Text>
      </View>
      <View style={{ borderBottomColor: 'gainsboro', borderWidth: 1, width: '90%', alignSelf: 'center' }} />

      {
        Plans?.map(
          (data, index) => (
            <LabledVideoComponents key={index}
              title={data.title}
              url={data.url}
              PressHandler={() => onPressHandler(index)}
            />
          )
        )
      }
      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

export default PlanDetailPage

const styles = StyleSheet.create({})