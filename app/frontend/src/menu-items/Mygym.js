// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall
};

// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const Mygym = {
    id: 'auth',
    title: '회원관련정보',
    caption: '정보및수정',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: '나의 gym',
            type: 'collapse',
            icon: icons.IconKey,
            children: [
                {
                    id: 'check_workout',
                    title: '내운동정보',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'check_info',
                    title: '회원정보',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                }
            ]
        }
    ]
};

export default Mygym;
