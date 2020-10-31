import React, { useState } from 'react';
import { Collapse, CardBody, Card, Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Fields, change } from 'redux-form';
import { compose } from 'recompose';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

import validate from './validation';
import { createInitFormData } from '../../../redux/form/helpers';
import { subForm as mainInfoSubForm, renderMainInfo } from './renderForm/mainInfo/renderMain';
// import { subForm as abonnementSubForm, renderAbonnement } from './renderForm/abonnement/renderAbonnement';
// import { subForm as infoPriceSubForm, renderInfoPrice } from './renderForm/infoPrice/renderInfoPrice';
// import { subForm as keyDateSubForm, renderKeyDate } from './renderForm/keyDate/renderKeyDate';

import './styles/index.scss';

export const formName = 'prospectEdit';
export const initFormData = createInitFormData(formName);

const changeFormActionCreator = (...rest) => change(formName, ...rest);

function EditForm(props) {
  const { originalOnSubmit, handleSubmit } = props;
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);
  const componentFaAngle = collapse ? <FaAngleUp onClick={toggle} /> : <FaAngleDown onClick={toggle} />;
  return (
    <CardBody>
      <Form className="form-edit-prospect">
        <div>
          <h6 className="heading-small text-muted mb-4">
            Information technique <span className="icon-angle-edge">{componentFaAngle}</span>
          </h6>
          <Fields
            names={[
              `${mainInfoSubForm}.lastname`,
              `${mainInfoSubForm}.firstname`,
              `${mainInfoSubForm}.address`,
              `${mainInfoSubForm}.phoneNumber`,
              `${mainInfoSubForm}.leadTransmissionDate`,
              `${mainInfoSubForm}.email`,
              `${mainInfoSubForm}.datePriseContactTel`,
              `${mainInfoSubForm}.comments`,
              `${mainInfoSubForm}.typeHabitation`,
            ]}
            component={renderMainInfo}
            props={{
              changeFormActionCreator,
              originalOnSubmit,
              handleSubmit,
            }}
          />
        </div>
        <Collapse isOpen={collapse}>
          <Card>
            <CardBody>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
              keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </Form>
    </CardBody>
  );
}

const mapDispatchToProps = {};
const mapStateToProps = () => ({});

export default compose(
  reduxForm({
    form: formName,
    validate,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditForm);
