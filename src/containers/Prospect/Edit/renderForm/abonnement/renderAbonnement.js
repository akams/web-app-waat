import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Field } from 'redux-form';
import { renderInputLabelGroupField, renderSelectLabelGroupField } from '../../../../../redux/form/renderers';

export const subForm = 'abonnement';

export function renderAbonnement({ originalOnSubmit, handleSubmit }) {
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
              labelFor="typeAbo"
              labelTxt="Abonnement (sur compteur / facture elect.)"
              placeholder="6Kva"
              type="text"
              name={`${subForm}.typeAbo`}
              id="typeAbo"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="distanceApproximativeCable"
              labelTxt="Distance de câbles approximative"
              placeholder="3 mètres"
              type="text"
              name={`${subForm}.distanceApproximativeCable`}
              id="distanceApproximativeCable"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="emplacementBorne"
              labelTxt="Emplacement de la borne"
              type="text"
              name={`${subForm}.emplacementBorne`}
              id="emplacementBorne"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="emplacementTableau"
              labelTxt="Emplacement tableau"
              type="text"
              name={`${subForm}.emplacementTableau`}
              id="emplacementTableau"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="isDispoTableau"
              labelTxt="Place disponible dans le tableau"
              name={`${subForm}.isDispoTableau`}
              id="isDispoTableau"
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
              inputClass="form-control-alternative"
              labelFor="percementARealiser"
              labelTxt="Percement à réaliser"
              name={`${subForm}.percementARealiser`}
              id="percementARealiser"
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
              inputClass="form-control-alternative"
              labelFor="plugChargeDacces"
              labelTxt="Plug & Charge ou controle d'acces ?"
              name={`${subForm}.plugChargeDacces`}
              id="plugChargeDacces"
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
              inputClass="form-control-alternative"
              labelFor="comments"
              labelTxt="Commentaire"
              type="textarea"
              name={`${subForm}.comments`}
              id="comments"
              component={renderInputLabelGroupField}
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
