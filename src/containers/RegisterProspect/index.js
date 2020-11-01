import React from 'react';
import { Button, Card, CardBody, Form, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'recompose';

import { createInitFormData } from '../../redux/form/helpers';
import { renderInputLabelRowGroupField } from '../../redux/form/renderers';
import { compileValidation } from './validate';

export const formName = 'register';
export const initFormData = createInitFormData(formName);

function RegisterProspectForm(props) {
  const submitForm = (data) => {
    props.originalOnSubmit(data);
  };

  const { handleSubmit } = props;
  return (
    <>
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h1>Fiche de renseignement</h1>
                </div>
                <Form role="form">
                  <Field
                    labelFor="lastname"
                    labelSize={2}
                    labelTxt="Nom"
                    inputColSize={10}
                    placeholder="Dupont"
                    type="text"
                    name="lastname"
                    id="lastname"
                    component={renderInputLabelRowGroupField}
                  />
                  <Field
                    labelFor="firstname"
                    labelSize={2}
                    labelTxt="Prénom"
                    inputColSize={10}
                    placeholder="Jean"
                    type="text"
                    name="firstname"
                    id="firstname"
                    component={renderInputLabelRowGroupField}
                  />
                  <Field
                    labelFor="address"
                    labelSize={2}
                    labelTxt="Adresse"
                    inputColSize={10}
                    placeholder="3 BLV..."
                    type="text"
                    name="address"
                    id="address"
                    component={renderInputLabelRowGroupField}
                  />
                  <Field
                    labelFor="phoneNumber"
                    labelSize={2}
                    labelTxt="Tél"
                    inputColSize={10}
                    placeholder="0651032217"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    component={renderInputLabelRowGroupField}
                  />
                  <Field
                    labelFor="comments"
                    labelSize={2}
                    labelTxt="Commentaire"
                    inputColSize={10}
                    placeholder="..."
                    type="textarea"
                    name="comments"
                    id="comments"
                    component={renderInputLabelRowGroupField}
                  />
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit" onClick={handleSubmit(submitForm)}>
                      Enregistrer
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const selector = formValueSelector(formName);
const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  formValues: {
    lastname: selector(state, 'lastname'),
    firstname: selector(state, 'firstname'),
    address: selector(state, 'address'),
    phoneNumber: selector(state, 'phoneNumber'),
    comments: selector(state, 'comments'),
  },
});

export default compose(
  reduxForm({
    form: formName,
    validate: compileValidation,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterProspectForm);
