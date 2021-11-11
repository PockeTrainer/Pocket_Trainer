import QrCodeScannerIcon from '@material-ui/icons/QrCodeScanner';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import RecommendIcon from '@material-ui/icons/Recommend';
import NoFoodIcon from '@material-ui/icons/NoFood';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';

// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandFramer,
    IconLayoutGridAdd,
    QrCodeScannerIcon,
    FitnessCenterIcon,
    RecommendIcon,
    NoFoodIcon,
    CalendarTodayIcon,
    SubscriptionsIcon
};

// ===========================|| UTILITIES MENU ITEMS ||=========================== //

const PT = {
    id: 'utilities',
    title: 'P.T(퍼스널 트레이닝)',
    caption: '저희의 PT를 받아보세요',
    type: 'group',
    children: [
        {
            id: 'scan-bodyshape',
            title: '체형분석하기',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons.QrCodeScannerIcon,
            breadcrumbs: false
        },
        {
            id: 'instruct-posture',
            title: '운동자세교정하기',
            type: 'item',
            url: '/utils/util-color',
            icon: icons.FitnessCenterIcon,
            breadcrumbs: false
        },
        {
            id: 'recommndation',
            title: '운동추천받기',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.RecommendIcon,
            breadcrumbs: false
        },
        {
            id: 'eating',
            title: '식단관리',
            type: 'collapse',
            icon: icons.NoFoodIcon,
            children: [
                {
                    id: 'diet_history',
                    title: '칼로리달력',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    icon: icons.CalendarTodayIcon,
                    breadcrumbs: false
                },
                {
                    id: 'recommendation_food',
                    title: '식단추천',
                    type: 'item',
                    url: '/icons/material-icons',
                    icon: icons.SubscriptionsIcon,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default PT;
