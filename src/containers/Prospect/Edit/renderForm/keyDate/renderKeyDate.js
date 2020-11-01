import React from 'react';
import { Row, Col, Button, FormGroup, Form, Input, CardBody } from 'reactstrap';
import { Field } from 'redux-form';
import { FaRegCalendarAlt } from 'react-icons/fa';
import {
  renderInputLabelGroupField,
  renderSelectLabelGroupField,
  renderDatePickerLabelGroupField,
} from '../../../../../redux/form/renderers';
import { normalizeFieldValue } from '../../../../../redux/form/helpers';
import { setFormatMomentDate } from '../../../../../helpers/datetime';

export const subForm = 'keyDate';

export function renderKeyDate({ changeFormActionCreator, originalOnSubmit, handleSubmit, ...fields }) {
  const dateLivraisonBorneValue = normalizeFieldValue(fields[subForm].dateLivraisonBorne.input);
  const setDateLivraisonBorneValue = (date) => {
    fields[subForm].dateLivraisonBorne.meta.dispatch(
      changeFormActionCreator(`${subForm}.dateLivraisonBorne`, setFormatMomentDate(date))
    );
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
              labelFor="chefDeprojet"
              labelTxt="Chef de projet"
              placeholder="Lyes"
              type="text"
              name={`${subForm}.chefDeprojet`}
              id="chefDeprojet"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              labelFor="dateLivraisonBorne"
              labelTxt="Date livraison borne"
              inputClass="form-control-alternative"
              name={`${subForm}.dateLivraisonBorne`}
              id="dateLivraisonBorne"
              iconComponent={<FaRegCalendarAlt />}
              value={dateLivraisonBorneValue}
              onChangeFunction={setDateLivraisonBorneValue}
              component={renderDatePickerLabelGroupField}
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
