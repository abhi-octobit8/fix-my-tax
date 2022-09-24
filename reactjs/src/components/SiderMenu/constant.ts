import {
  UserOutlined,
  TagsOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  MonitorOutlined,
} from '@ant-design/icons';
export const MENU_ITEMS = [
  {
    path: '/',
    exact: true,
    name: 'home',
    permission: '',
    title: 'Home',
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Dashboard',
    icon: DashboardOutlined,
    showInMenu: true,
  },
  {
    path: '/sites',
    name: 'sites',
    permission: '',
    title: 'Sites',
    icon: EnvironmentOutlined,
    showInMenu: true,
  },
  {
    path: '/scans',
    name: 'scans',
    permission: '',
    title: 'Scans',
    icon: BarcodeOutlined,
    showInMenu: false,
  },
  {
    path: '/siteshealth',
    name: 'siteshealth',
    permission: '',
    title: 'Sites Health',
    icon: MonitorOutlined,
    showInMenu: true,
  },
  {
    path: '/searchbytag',
    name: 'searchScans',
    permission: '',
    title: 'Search By Tag',
    icon: BarcodeOutlined,
    showInMenu: true,
  },
  {
    path: '/searchbysite',
    name: 'searchSite',
    permission: '',
    title: 'Search By Site',
    icon: BarcodeOutlined,
    showInMenu: true,
  },
  {
    name: 'tags',
    permission: '',
    title: 'Tags',
    icon: BarcodeOutlined,
    showInMenu: true,
    subMenu: [
      {
        path: '/checktag',
        name: 'checkTag',
        permission: '',
        title: 'Check Tag',
        icon: BarcodeOutlined,
        showInMenu: true,
      },
      // {
      //   path: '/importtag',
      //   name: 'importTag',
      //   permission: '',
      //   title: 'Import Tag',
      //   icon: BarcodeOutlined,
      //   showInMenu: false,
      // },
    ],
  },

  {
    path: '/users',
    permission: 'Pages.Users',
    title: 'Users',
    name: 'user',
    icon: UserOutlined,
    showInMenu: true,
  },
  {
    path: '/roles',
    permission: 'Pages.Roles',
    title: 'Roles',
    name: 'role',
    icon: TagsOutlined,
    showInMenu: true,
  },
  {
    path: '/tenants',
    permission: 'Pages.Tenants',
    title: 'Tenants',
    name: 'tenant',
    icon: AppstoreOutlined,
    showInMenu: true,
  },
  {
    path: '/help',
    permission: '',
    title: 'Help',
    name: 'help',
    icon: InfoCircleOutlined,
    showInMenu: true,
  },
  {
    path: '/logout',
    permission: '',
    title: 'Logout',
    name: 'logout',
    showInMenu: false,
  },
  {
    path: '/exception?:type',
    permission: '',
    title: 'exception',
    name: 'exception',
    showInMenu: false,
  },
];

// export default {
//   MENU_ITEMS,
// };
