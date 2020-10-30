import * as ROUTES from '../constants/routes';

/// ////// Abilities and Roles Authorization /////////

/**
 * Verifie si un utilisateur match avec les roles
 * @user: User
 * @allowedRoles: string[]
 * @retun boolean
 */
export function checkAuthorization(user, allowedRoles) {
  let flag = false;
  if (!user || Object.keys(user).length === 0 || !user.acl) return false;
  if (!allowedRoles || allowedRoles.length === 0) return false;
  allowedRoles.forEach((role) => {
    if (user.acl[role]) {
      flag = true;
    }
  });
  return flag;
}
/**
 * Vérifie le pattern des routes avec les droits user
 * @user: User
 * @pathname: string
 * @return: boolean
 */
export function checkAuthorizationWithRoutes(user, pathname) {
  const PATHS_GUEST = [ROUTES.REGISTER_PROSPECT];
  const PATHS_ADMIN = [ROUTES.HOME, ROUTES.MANAGE_PROSPECT, ROUTES.DETAIL_PROSPECT, ROUTES.REGISTER_PROSPECT];
  if (!user || Object.keys(user).length === 0 || !user.acl) return false;
  const {
    acl: { guest, admin },
  } = user;
  if (guest) {
    return PATHS_GUEST.includes(pathname);
  }
  if (admin) {
    return PATHS_ADMIN.includes(pathname);
  }
  return false;
}

/**
 * Verifie si un utilisateur peut lire
 * @user: User
 * @retun boolean
 */
export function canRead(user) {
  const allowed = ['admin', 'guest'];
  return checkAuthorization(user, allowed);
}
/**
 * Verifie si un utilisateur peut modifier
 * @user: User
 * @retun boolean
 */
export function canEdit(user) {
  const allowed = ['admin', 'guest'];
  return checkAuthorization(user, allowed);
}
/**
 * Verifie si un utilisateur peut supprimer
 * @user: User
 * @retun boolean
 */
export function canDelete(user) {
  const allowed = ['admin'];
  return checkAuthorization(user, allowed);
}
