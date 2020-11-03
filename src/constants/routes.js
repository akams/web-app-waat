export const HOME = '/';
export const REGISTER_PROSPECT = '/register-prospect';
export const MANAGE_PROSPECT = '/manage-prospects';
export const DETAIL_PROSPECT = '/detail-prospect/:prospectId';
export const SIGN_IN = '/signin';
export const SIGN_UP = '/signup';
export const SIGN_UP_END = '/confirmation-inscription';
export const SIGN_UP_GUEST = '/business/signup';

export const IN_APP_ROUTES_ASIDE = [
  {
    path: HOME,
    name: 'Tableau de bord',
    icon: 'ni ni-tv-2',
  },
  {
    path: MANAGE_PROSPECT,
    name: 'Gestion des prospects',
    icon: 'ni ni-app',
  },
  {
    path: REGISTER_PROSPECT,
    name: 'Enregistrer un lead',
    icon: 'ni ni-app',
  },
];
