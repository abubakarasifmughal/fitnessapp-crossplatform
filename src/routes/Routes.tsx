import AboutPage from "../pages/AboutPage";
import PlanStack from "./PlanStack";
import SettingsRouter from "./SettingsRouter";
import StatsStack from "./StatsStack";
import TrainingsStack from "./TrainingsStack";

export let Routes = [
    {
        label: "Settings",
        component: SettingsRouter,
        icon: require('../../assets/settings.png'),
        showHeader: false,
    },
    {
        label: "Plans",
        component: PlanStack,
        icon: require('../../assets/calendar.png'),
        showHeader: false,
    },
    {
        label: "Trainings",
        component: TrainingsStack,
        icon: require('../../assets/trainings.png'),
        showHeader: false,
    },
    {
        label:"Statistics",
        component:StatsStack,
        icon: require('../../assets/stats.png'),
        showHeader:false,
    },
    {
        label: "About",
        component: AboutPage,
        icon: require('../../assets/info.png'),
        showHeader: false,
    },
]