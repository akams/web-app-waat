/* eslint-disable react/display-name */
import { FaEdit, FaUsersCog } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { GiCube } from 'react-icons/gi';

export const HOME = '/';
export const REGISTER_PROSPECT = '/register-prospect';
export const MANAGE_PROSPECT = '/manage-prospects';
export const DETAIL_PROSPECT = '/detail-prospect/:prospectId';
export const SIGN_IN = '/signin';
export const SIGN_UP = '/signup';
export const SIGN_UP_END = '/confirmation-inscription';
export const SIGN_UP_GUEST = '/business/signup';
export const MANAGE_USERS = '/gestion-des-utilisateurs';
export const FORGOT_PWD = '/mot-de-passe-oublié';

export const IN_APP_ROUTES_ASIDE = [
  {
    path: HOME,
    name: 'Tableau de bord',
    icon: (className) => <RiDashboardFill className={className} />,
  },
  {
    path: MANAGE_PROSPECT,
    name: 'Gestion des prospects',
    icon: (className) => <GiCube className={className} />,
  },
  {
    path: REGISTER_PROSPECT,
    name: 'Enregistrer un lead',
    icon: (className) => <FaEdit className={className} />,
  },
  {
    path: MANAGE_USERS,
    name: 'Gestion des utilisateurs',
    icon: (className) => <FaUsersCog className={className} />,
  },
];
