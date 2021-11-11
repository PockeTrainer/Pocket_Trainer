// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const MyPocketTrainer = {
    id: 'dashboard',
    title: '운동하기',
    type: 'group',
    children: [
        {
            id: 'default',
            title: '나의 POCKET트레이너',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default MyPocketTrainer;
