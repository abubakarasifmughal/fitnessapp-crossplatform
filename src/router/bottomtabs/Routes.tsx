import { Image } from "react-native"
import AboutPage from "../../screens/AboutPage"
import StatsPage from "../../screens/StatsPage"
import CalibrationStack from "../stack/CalibrationStack"
import PlanStack from "../stack/PlanStack"
import TrainingsStack from "../stack/TrainingsStack"

const iconStyle = { height: 20, width: 20 }

const Routes = [
    {
        name: 'Calibration',
        component: CalibrationStack,
        headerShown:false,
        icons: (active: boolean) => <Image source={require('../../../assets/settings.png')}
        style={[iconStyle, { tintColor: active ? 'red' : 'gray' }]}
        resizeMode="contain" />
    },
    {
        name: 'Plan',
        component: PlanStack,
        headerShown:false,
        icons: (active: boolean) => <Image source={require('../../../assets/calendar.png')}
        style={[iconStyle, { tintColor: active ? 'red' : 'gray' }]}
        resizeMode="contain" />
        
    },
    {
        name: 'Trainings',
        component: TrainingsStack,
        headerShown:false,
        icons: (active: boolean) => <Image source={require('../../../assets/trainings.png')}
        style={[iconStyle, { tintColor: active ? 'red' : 'gray' }]}
        resizeMode="contain" />
    },
    {
        name: 'Statistics',
        component: StatsPage,
        headerShown:true,
        icons: (active: boolean) => <Image source={require('../../../assets/stats.png')}
        style={[iconStyle, { tintColor: active ? 'red' : 'gray' }]}
        resizeMode="contain" />
    },
    {
        name: 'About',
        component: AboutPage,
        headerShown:true,
        icons: (active: boolean) => <Image source={require('../../../assets/info.png')}
        style={[iconStyle, { tintColor: active ? 'red' : 'gray' }]}
            resizeMode="contain" />
    },
]

export default Routes