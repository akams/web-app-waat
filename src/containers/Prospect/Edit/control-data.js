import { transformTimeFirebaseToMomentTime } from '../../../helpers/datetime';

const MAX_COMPLETION = 25;

export const getPercentageCompletion = (data) => {
  const dataKeys = Object.keys(data);
  const nbFieldComplete = dataKeys.filter((key) => data[key] !== '').length;
  return (MAX_COMPLETION * nbFieldComplete) / dataKeys.length;
};

const getStatusWorksheet = (data) => {
  const percentageCompletion =
    getPercentageCompletion(data.mainInfo) +
    getPercentageCompletion(data.abonnement) +
    getPercentageCompletion(data.infoPrice) +
    getPercentageCompletion(data.keyDate);
  return percentageCompletion < 100 ? 'en cours' : 'terminer';
};

/**
 * Transform data from form to api
 * @data
 */
export const formToApi = (data) => ({
  ...data.mainInfo,
  leadTransmissionDate: new Date(data.mainInfo.leadTransmissionDate),
  datePriseContactTel: new Date(data.mainInfo.datePriseContactTel),
  // detail technique
  abonnement: {
    ...data.abonnement,
  },
  // price
  infoPrice: {
    ...data.infoPrice,
  },
  keyDate: {
    ...data.keyDate,
  },
  statusWorksheet: {
    percentageCompletion:
      getPercentageCompletion(data.mainInfo) +
      getPercentageCompletion(data.abonnement) +
      getPercentageCompletion(data.infoPrice) +
      getPercentageCompletion(data.keyDate),
    status: getStatusWorksheet(data),
  },
});

export const ApiToForm = (data) => ({
  mainInfo: {
    lastname: data.lastname || '',
    firstname: data.firstname || '',
    address: data.address || '',
    phoneNumber: data.phoneNumber || '',
    leadTransmissionDate: transformTimeFirebaseToMomentTime(data.leadTransmissionDate) || '',
    // suite data
    email: data.email || '',
    datePriseContactTel: transformTimeFirebaseToMomentTime(data.datePriseContactTel) || '',
    comments: data.comments || '',
    typeHabitation: data.typeHabitation || '',
    lienPhoto: data.lienPhoto || '',
  },
  // detail technique
  abonnement: {
    typeAbo: data.abonnement.typeAbo || '',
    distanceApproximativeCable: data.abonnement.distanceApproximativeCable || '',
    emplacementBorne: data.abonnement.emplacementBorne || '',
    emplacementTableau: data.abonnement.emplacementTableau || '',
    isDispoTableau: data.abonnement.isDispoTableau || '',
    percementARealiser: data.abonnement.percementARealiser || '',
    plugChargeDacces: data.abonnement.plugChargeDacces || '',
    comments: data.abonnement.comments || '',
  },
  // price
  infoPrice: {
    forfait: data.infoPrice.forfait || '',
    extraCost: data.infoPrice.extraCost || '',
    comments: data.infoPrice.comments || '',
  },
  keyDate: {
    chefDeprojet: data.keyDate.chefDeprojet || '',
    dateLivraisonBorne: transformTimeFirebaseToMomentTime(data.keyDate.dateLivraisonBorne) || '',
    dateReceptionVE: transformTimeFirebaseToMomentTime(data.keyDate.dateReceptionVE) || '',
    isReadyForInstallation: data.keyDate.isReadyForInstallation || '',
    datetravauxPrev: transformTimeFirebaseToMomentTime(data.keyDate.datetravauxPrev) || '',
    disponibiliteClient: data.keyDate.disponibiliteClient || '',
  },
});
