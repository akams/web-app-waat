import React from 'react';
import { Button, Form } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import { HiMail } from 'react-icons/hi';

import { createInitFormData } from '../../redux/form/helpers';
import { renderInputGroupField } from '../../redux/form/renderers';
import { compileValidation } from './validate';

export const formName = 'forgotPwdForm';
export const initFormData = createInitFormData(formName);

function FormForgotPassword(props) {
  const { handleSubmit } = props;

  const onHandleSubmit = (data) => {
    props.originalOnSubmit(data);
  };

  return (
    <Form role="form">
      <Field
        inputClass="form-control-alternative"
        id="email"
        name="email"
        type="email"
        placeholder="exmaple@lambda.fr"
        iconComponent={<HiMail />}
        component={renderInputGroupField}
      />
      <div className="text-center">
        <Button className="my-4" color="primary" type="submit" onClick={handleSubmit(onHandleSubmit)}>
          Valider
        </Button>
      </div>
    </Form>
  );
}

export default compose(
  reduxForm({
    form: formName,
    validate: compileValidation,
  })
)(FormForgotPassword);
