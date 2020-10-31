import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Field } from 'redux-form';
import { FaRegCalendarAlt } from 'react-icons/fa';
import {
  renderInputLabelGroupField,
  renderSelectLabelGroupField,
  renderDatePickerLabelGroupField,
} from '../../../../../redux/form/renderers';
import { normalizeFieldValue } from '../../../../../redux/form/helpers';

export const subForm = 'mainInfo';

const stateOptions = [
  { id: 1, label: 'Maison individuelle' },
  { id: 2, label: 'Copropriété' },
  { id: 3, label: 'Entreprise' },
];

export function renderMainInfo({ changeFormActionCreator, originalOnSubmit, handleSubmit, ...fields }) {
  const datePriseContactTelValue = normalizeFieldValue(fields[subForm].datePriseContactTel.input);
  const setDatePriseContactTel = (date) => {
    fields[subForm].datePriseContactTel.meta.dispatch(changeFormActionCreator(`${subForm}.datePriseContactTel`, date));
  };
  const onHandleSubmit = (data) => {
    originalOnSubmit(data);
  };
  return (
    <>
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
              name={`${subForm}.lastname`}
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
              name={`${subForm}.firstname`}
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
              name={`${subForm}.address`}
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
              name={`${subForm}.phoneNumber`}
              id="phoneNumber"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="email"
              labelTxt="Email"
              placeholder="john.doe@mail.fr"
              type="email"
              name={`${subForm}.email`}
              id="email"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              labelFor="datePriseContactTel"
              labelTxt="Date prise contact tel"
              inputClass="form-control-alternative"
              name={`${subForm}.datePriseContactTel`}
              id="datePriseContactTel"
              iconComponent={<FaRegCalendarAlt />}
              value={datePriseContactTelValue}
              onChangeFunction={setDatePriseContactTel}
              component={renderDatePickerLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="comments"
              labelTxt="Commentaire"
              placeholder="..."
              type="textarea"
              name={`${subForm}.comments`}
              id="comments"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="typeHabitation"
              labelTxt="Type habitation"
              name={`${subForm}.typeHabitation`}
              id="typeHabitation"
              isSearchable
              options={stateOptions}
              component={renderSelectLabelGroupField}
            />
          </Col>
        </Row>
        <Button color="info" onClick={handleSubmit(onHandleSubmit)} size="md">
          Enregistrer
        </Button>
      </div>
    </>
  );
}
