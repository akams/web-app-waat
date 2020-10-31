import React, { useState } from 'react';
import { Collapse, CardBody, Card, Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Fields, change } from 'redux-form';
import { compose } from 'recompose';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

import validate from './validation';
import { createInitFormData } from '../../../redux/form/helpers';
import { subForm as mainInfoSubForm, renderMainInfo } from './renderForm/mainInfo/renderMain';
// import { subForm as abonnementSubForm, renderAbonnement } from './renderForm/abonnement/renderAbonnement';
// import { subForm as infoPriceSubForm, renderInfoPrice } from './renderForm/infoPrice/renderInfoPrice';
// import { subForm as keyDateSubForm, renderKeyDate } from './renderForm/keyDate/renderKeyDate';

import './styles/index.scss';

export const formName = 'prospectEdit';
export const initFormData = createInitFormData(formName);

const changeFormActionCreator = (...rest) => change(formName, ...rest);

export const ApiToForm = (data) => ({
  mainInfo: {
    lastname: data.lastname || '',
    firstname: data.firstname || '',
    address: data.address || '',
    phoneNumber: data.phoneNumber || '',
    leadTransmissionDate: new Date(data.leadTransmissionDate) || null,
    // suite data
    email: data.email || '',
    datePriseContactTel: new Date(data.datePriseContactTel) || new Date(),
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
    dateLivraisonBorne: data.keyDate.dateLivraisonBorne || null,
    dateReceptionVE: data.keyDate.dateReceptionVE || '',
    isReadyForInstallation: data.keyDate.isReadyForInstallation || '',
    datetravauxPrev: data.keyDate.datetravauxPrev || '',
    disponibiliteClient: data.keyDate.disponibiliteClient || '',
  },
});

function EditForm(props) {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);
  console.log('======>>>>>>', { props });
  const componentFaAngle = collapse ? <FaAngleUp onClick={toggle} /> : <FaAngleDown onClick={toggle} />;
  return (
    <CardBody>
      <Form className="form-edit-prospect">
        <div>
          <h6 className="heading-small text-muted mb-4">
            Information technique <span className="icon-angle-edge">{componentFaAngle}</span>
          </h6>
          <Fields
            names={[
              `${mainInfoSubForm}.lastname`,
              `${mainInfoSubForm}.firstname`,
              `${mainInfoSubForm}.address`,
              `${mainInfoSubForm}.phoneNumber`,
              `${mainInfoSubForm}.leadTransmissionDate`,
              `${mainInfoSubForm}.email`,
              `${mainInfoSubForm}.datePriseContactTel`,
              `${mainInfoSubForm}.comments`,
              `${mainInfoSubForm}.typeHabitation`,
            ]}
            component={renderMainInfo}
            props={{
              changeFormActionCreator,
            }}
          />
        </div>
        <Collapse isOpen={collapse}>
          <Card>
            <CardBody>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
              keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </Form>
    </CardBody>
  );
}

const mapDispatchToProps = {};
const mapStateToProps = () => ({});

export default compose(
  reduxForm({
    form: formName,
    validate,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditForm);
