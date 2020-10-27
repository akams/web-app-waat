import React from 'react';
import { Button, Form, Row, Col } from 'reactstrap';
import { createInitFormData } from '../../redux/form/helpers';

export const formName = 'register';
export const initFormData = createInitFormData(formName);

function SignupForm() {
  return <h1>Formulaire signup</h1>;
}

export default SignupForm;
