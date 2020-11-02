import { transformTimeFirebaseToMomentTime } from './datetime';

export function downloadCsv(data) {
  let csv = 'DateTransmissionLeads;Lastname;Firstname;Adress;PhoneNumber;Email;DatePriseContactTel;Commentaires;';
  csv += 'TypeHabitation;Abonnement;DistanceApproximativeCable;EmplacementBorne;EmplacementTableau;PlaceDispoTableau;';
  csv += 'PercementRealisable;PlugChargeControlAcces;Commentaires;Forfait;ExtraCost;Commentaires;ChefProjetWaat;';
  csv +=
    'LivraisonBornes;DateReceptionVE;PretInstallation;DateTravauxPrevisionelle;DisponibiliteClient;LienPhoto;Commentaires;';
  csv += 'Status;PourcentageAchevement\n';

  data.forEach(function (row) {
    const {
      leadTransmissionDate,
      lastname = '',
      firstname = '',
      address = '',
      phoneNumber = '',
      email = '',
      datePriseContactTel,
      comments = '',
      typeHabitation = '',
      abonnement: {
        typeAbo = '',
        distanceApproximativeCable = '',
        emplacementBorne = '',
        emplacementTableau = '',
        isDispoTableau = '',
        percementARealiser = '',
        plugChargeDacces = '',
        comments: commentsAbo = '',
      },
      infoPrice: { forfait = '', extraCost = '', comments: commentsPrice = '' },
      keyDate: {
        chefDeprojet = '',
        dateLivraisonBorne,
        dateReceptionVE,
        isReadyForInstallation = '',
        datetravauxPrev,
        disponibiliteClient = '',
        comments: commentsKeyDate = '',
      },
      lienPhoto,
      statusWorksheet: { status, percentageCompletion },
    } = row;

    const updatedDateLead = transformTimeFirebaseToMomentTime(leadTransmissionDate) || '';
    const updatedDatePriseContactTel = transformTimeFirebaseToMomentTime(datePriseContactTel) || '';
    const updatedDateLivraisonBorne = transformTimeFirebaseToMomentTime(dateLivraisonBorne) || '';
    const updatedDateReceptionVE = transformTimeFirebaseToMomentTime(dateReceptionVE) || '';
    const updatedDatetravauxPrev = transformTimeFirebaseToMomentTime(datetravauxPrev) || '';
    const updatedPercentageCompletion = Math.floor(percentageCompletion);
    csv += `${updatedDateLead};${lastname};${firstname};${address};${phoneNumber};${email};${updatedDatePriseContactTel};${comments};`;
    csv += `${typeHabitation};${typeAbo};${distanceApproximativeCable};${emplacementBorne};${emplacementTableau};`;
    csv += `${isDispoTableau};${percementARealiser};${plugChargeDacces};${commentsAbo};`;
    csv += `${forfait};${extraCost};${commentsPrice};`;
    csv += `${chefDeprojet};${updatedDateLivraisonBorne};${updatedDateReceptionVE};${isReadyForInstallation};${updatedDatetravauxPrev};`;
    csv += `${disponibiliteClient};${lienPhoto};${commentsKeyDate};`;
    csv += `${status};${updatedPercentageCompletion};`;
    csv += '\n';
  });
  const hiddenElement = document.createElement('a');
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
  hiddenElement.target = '_blank';
  hiddenElement.download = 'export.csv';
  hiddenElement.click();
}
