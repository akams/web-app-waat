import React from 'react';
import { Row, Col } from 'reactstrap';
import { Field } from 'redux-form';
import { renderInputLabelGroupField } from '../../../../../redux/form/renderers';

export const subForm = 'infoPrice';

export function renderInfoPrice() {
  return (
    <>
      <div className="pl-lg-2">
        <Row>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="forfait"
              labelTxt="Forfait"
              placeholder="600€"
              type="text"
              name={`${subForm}.forfait`}
              id="forfait"
              component={renderInputLabelGroupField}
            />
          </Col>
          <Col lg="6">
            <Field
              labelClass="form-control-label"
              inputClass="form-control-alternative"
              labelFor="extraCost"
              labelTxt="coût supplémentaire"
              placeholder="300€"
              type="text"
              name={`${subForm}.extraCost`}
              id="extraCost"
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
              type="textarea"
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
