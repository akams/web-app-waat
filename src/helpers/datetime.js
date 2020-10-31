import moment from 'moment';

moment.locale('fr');

/**
 * Retourne le format d'une date firebase en format classique date
 * @firebaseDateTime
 */
export function transformTimeFirebaseToMomentTime(firebaseDateTime) {
  if (firebaseDateTime) {
    const dateInMillis = firebaseDateTime.seconds * 1000;
    return moment(dateInMillis).format('YYYY-MM-DD HH:mm:ss');
  }
  return moment().format('YYYY-MM-DD HH:mm:ss');
}
