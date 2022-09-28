import { Image } from "react-native"
import Plans from "../../screens/Plans"
import StatsPage from "../../screens/StatsPage"
import Trainings from "../../screens/Trainings"
import CalibrationSettingsStack from "../stack/CalibrationSettingsStack"

const iconStyle = { height: 20, width: 20 }

const Routes = [
    {
        name: 'Calibration',
        component: CalibrationSettingsStack,
        headerShown:false,
        icons: (active: boolean) => <Image source={require('../../../assets/settings.png')}
        style={[iconStyle, { tintColor: active ? 'black' : 'gray' }]}
        resizeMode="contain" />
    },
    {
        name: 'Plans',
        component: Plans,
        headerShown:true,
        icons: (active: boolean) => <Image source={require('../../../assets/calendar.png')}
        style={[iconStyle, { tintColor: active ? 'black' : 'gray' }]}
        resizeMode="contain" />
        
    },
    {
        name: 'Trainings',
        component: Trainings,
        headerShown:true,
        icons: (active: boolean) => <Image source={require('../../../assets/trainings.png')}
        style={[iconStyle, { tintColor: active ? 'black' : 'gray' }]}
        resizeMode="contain" />
    },
    {
        name: 'Statistics',
        component: StatsPage,
        headerShown:true,
        icons: (active: boolean) => <Image source={require('../../../assets/stats.png')}
        style={[iconStyle, { tintColor: active ? 'black' : 'gray' }]}
        resizeMode="contain" />
    },
    {
        name: 'About',
        component: StatsPage,
        headerShown:true,
        icons: (active: boolean) => <Image source={require('../../../assets/info.png')}
        style={[iconStyle, { tintColor: active ? 'black' : 'gray' }]}
            resizeMode="contain" />
    },
]

export default Routes