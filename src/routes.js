import BasicLayout from '@/layouts/BasicLayout';
import Dashboard from '@/pages/Dashboard';
import Email from '@/pages/Email';
import Ding from '@/pages/Ding';
import Workwx from '@/pages/Workwx';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Dashboard,
      },
      {
        path: '/email',
        exact: true,
        component: Email,
      },
      {
        path: '/ding',
        exact: true,
        component: Ding,
      },
      {
        path: '/workwx',
        exact: true,
        component: Workwx,
      },
    ],
  },
];
export default routerConfig;
