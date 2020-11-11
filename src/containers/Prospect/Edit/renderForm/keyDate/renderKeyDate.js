import React from 'react';
import { Row, Col } from 'reactstrap';
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

export function renderKeyDate({ changeFormActionCreator, ...fields }) {
  const dateLivraisonBorneValue = normalizeFieldValue(fields[subForm].dateLivraisonBorne.input);
  const dateReceptionVEValue = normalizeFieldValue(fields[subForm].dateReceptionVE.input);
  const datetravauxPrevValue = normalizeFieldValue(fields[subForm].datetravauxPrev.input);
  const setDateLivraisonBorneValue = (date) => {
    fields[subForm].dateLivraisonBorne.meta.dispatch(
      changeFormActionCreator(`${subForm}.dateLivraisonBorne`, setFormatMomentDate(date))
    );
  };
  const setDateReceptionVEValue = (date) => {
    fields[subForm].dateReceptionVE.meta.dispatch(
      changeFormActionCreator(`${subForm}.dateReceptionVE`, setFormatMomentDate(date))
    );
  };
  const setDateTravauxPrevValue = (date) => {
    fields[subForm].datetravauxPrev.meta.dispatch(
      changeFormActionCreator(`${subForm}.datetravauxPrev`, setFormatMomentDate(date))
    );
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
              dateTimeValue={dateLivraisonBorneValue}
              onChangeFunction={setDateLivraisonBorneValue}
              component={renderDatePickerLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              labelFor="dateReceptionVE"
              labelTxt="Date de reception du VE"
              inputClass="form-control-alternative"
              name={`${subForm}.dateReceptionVE`}
              id="dateReceptionVE"
              iconComponent={<FaRegCalendarAlt />}
              dateTimeValue={dateReceptionVEValue}
              onChangeFunction={setDateReceptionVEValue}
              component={renderDatePickerLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="isReadyForInstallation"
              labelTxt="Prêt pour installation ?"
              name={`${subForm}.isReadyForInstallation`}
              id="isReadyForInstallation"
              options={[
                { id: 1, label: 'Oui' },
                { id: 2, label: 'Non' },
              ]}
              component={renderSelectLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              labelFor="datetravauxPrev"
              labelTxt="Date de travaux prévisionelle"
              inputClass="form-control-alternative"
              name={`${subForm}.datetravauxPrev`}
              id="datetravauxPrev"
              iconComponent={<FaRegCalendarAlt />}
              dateTimeValue={datetravauxPrevValue}
              onChangeFunction={setDateTravauxPrevValue}
              component={renderDatePickerLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="disponibiliteClient"
              labelTxt="Disponibilité client"
              type="text"
              name={`${subForm}.disponibiliteClient`}
              id="disponibiliteClient"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="comments"
              labelTxt="Commentaire"
              placeholder="..."
              type="text"
              name={`${subForm}.comments`}
              id="comments"
              component={renderInputLabelGroupField}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
