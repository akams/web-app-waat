import React from 'react';
import { Row, Col, Button, FormGroup, Form, Input, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'recompose';

import { createInitFormData } from '../../../redux/form/helpers';
import { renderInputLabelGroupField } from '../../../redux/form/renderers';

export const formName = 'formEditProspect';
export const initFormData = createInitFormData(formName);

export const ApiToForm = (data) => ({
  company: data.company || '',
  lastname: data.lastname || '',
  firstname: data.firstname || '',
  address: data.address || '',
  phoneNumber: data.phoneNumber || '',
  leadTransmissionDate: new Date(data.leadTransmissionDate) || null,
  // suite data
  datePriseContactTel: new Date(data.datePriseContactTel) || null,
  comments: data.comments || '',
  typeHabitation: data.typeHabitation || [],
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
    datetravauxPrev: data.keyDate.datetravauxPrev || '',
    disponibiliteClient: data.keyDate.disponibiliteClient || '',
  },
  lienPhoto: data.lienPhoto || '',
});

function EditForm(props) {
  return (
    <CardBody>
      <Form>
        <h6 className="heading-small text-muted mb-4">Information utilisateur</h6>
        <div className="pl-lg-2">
          <Row>
            <Col lg="6">
              <Field
                labelClass="form-control-label"
                inputClass="form-control-alternative"
                labelFor="lastname"
                labelTxt="Nom"
                placeholder="Dupont"
                type="text"
                name="lastname"
                id="lastname"
                component={renderInputLabelGroupField}
              />
            </Col>
            <Col lg="6">
              <Field
                labelClass="form-control-label"
                inputClass="form-control-alternative"
                labelFor="firstname"
                labelTxt="Prénom"
                placeholder="Jean"
                type="text"
                name="firstname"
                id="firstname"
                component={renderInputLabelGroupField}
              />
            </Col>
            <Col lg="6">
              <Field
                labelClass="form-control-label"
                inputClass="form-control-alternative"
                labelFor="address"
                labelTxt="Adresse"
                placeholder="3 BLV..."
                type="text"
                name="address"
                id="address"
                component={renderInputLabelGroupField}
              />
            </Col>
            <Col lg="6">
              <Field
                labelClass="form-control-label"
                inputClass="form-control-alternative"
                labelFor="phoneNumber"
                labelTxt="Tél"
                placeholder="0651032217"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                component={renderInputLabelGroupField}
              />
            </Col>
          </Row>
        </div>
      </Form>
    </CardBody>
  );
}

const selector = formValueSelector(formName);
const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  formValues: {
    company: selector(state, 'company'),
    lastname: selector(state, 'lastname'),
    firstname: selector(state, 'firstname'),
    address: selector(state, 'address'),
    phoneNumber: selector(state, 'phoneNumber'),
    leadTransmissionDate: selector(state, 'leadTransmissionDate'),
    datePriseContactTel: selector(state, 'datePriseContactTel'),
    comments: selector(state, 'comments'),
    typeHabitation: selector(state, 'typeHabitation'),
  },
});

export default compose(
  reduxForm({
    form: formName,
    // validate: compileValidation,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditForm);
