import React from 'react';
import { FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, Label, Col } from 'reactstrap';

import './style.scss';

/** Render complex input group sans label
 * @param {*} param0
 */
export const renderInputGroupField = ({ classNameI, input, type, meta: { touched, error, warning } }) => (
  <FormGroup>
    <InputGroup className="input-group-alternative mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={classNameI} />
        </InputGroupText>
      </InputGroupAddon>
      <Input {...input} type={type} />
    </InputGroup>
    {touched && ((error && <span className="error-render-form">{error}</span>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

export const renderInputLabelGroupField = ({
  labelFor,
  labelSize,
  labelTxt,
  inputColSize,
  input,
  type,
  meta: { touched, error, warning },
}) => (
  <>
    <FormGroup row>
      <Label for={labelFor} sm={labelSize}>
        {labelTxt}
      </Label>
      <Col sm={inputColSize}>
        <Input {...input} type={type} />
        {touched &&
          ((error && <p className="error-render-form mt-2 mb-2">{error}</p>) || (warning && <p>{warning}</p>))}
      </Col>
    </FormGroup>
  </>
);

/** render sans label
 * @param {*} param0
 */
export const renderSimpleInputTextField = ({ input, type, meta: { touched, error, warning } }) => (
  <>
    <Input {...input} type={type} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </>
);

/** render avec label
 * @param {*} param0
 */
export const renderInputTextField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    {label && <label>{label}</label>}
    <>
      <Input {...input} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </>
  </div>
);
