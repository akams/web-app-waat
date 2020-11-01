import React, { useState } from 'react';
import { Collapse, CardBody, Card, Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Fields, change } from 'redux-form';
import { compose } from 'recompose';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

import validate from './validation';
import { createInitFormData } from '../../../redux/form/helpers';
import { subForm as mainInfoSubForm, renderMainInfo } from './renderForm/mainInfo/renderMain';
import { subForm as abonnementSubForm, renderAbonnement } from './renderForm/abonnement/renderAbonnement';
// import { subForm as infoPriceSubForm, renderInfoPrice } from './renderForm/infoPrice/renderInfoPrice';
// import { subForm as keyDateSubForm, renderKeyDate } from './renderForm/keyDate/renderKeyDate';

import './styles/index.scss';

export const formName = 'prospectEdit';
export const initFormData = createInitFormData(formName);

const changeFormActionCreator = (...rest) => change(formName, ...rest);

function EditForm(props) {
  const { originalOnSubmit, handleSubmit } = props;
  const [collapseIT, setCollapseIT] = useState(false);
  const [collapseAbo, setCollapseAbo] = useState(true);
  // const [collapseAbo, setCollapseAbo] = useState(false);
  // const [collapseAbo, setCollapseAbo] = useState(false);

  const toggleIT = () => setCollapseIT(!collapseIT);
  const toggleAbo = () => setCollapseAbo(!collapseAbo);
  // const toggleAbo = () => setCollapseAbo(!collapseAbo);
  // const toggleAbo = () => setCollapseAbo(!collapseAbo);

  const componentFaAngleIT = collapseIT ? <FaAngleUp onClick={toggleIT} /> : <FaAngleDown onClick={toggleIT} />;
  const componentFaAngleAbo = collapseAbo ? <FaAngleUp onClick={toggleAbo} /> : <FaAngleDown onClick={toggleAbo} />;
  // const componentFaAngleIT = collapseIT ? <FaAngleUp onClick={toggleIT} /> : <FaAngleDown onClick={toggleIT} />;
  // const componentFaAngleIT = collapseIT ? <FaAngleUp onClick={toggleIT} /> : <FaAngleDown onClick={toggleIT} />;
  return (
    <CardBody>
      <Form className="form-edit-prospect">
        <div>
          <h6 className="heading-small text-muted mb-4">
            Information utilisateur <span className="icon-angle-edge">{componentFaAngleIT}</span>
          </h6>
          <Collapse isOpen={collapseIT}>
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
          </Collapse>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">
            Information technique <span className="icon-angle-edge">{componentFaAngleAbo}</span>
          </h6>
          <Collapse isOpen={collapseAbo}>
            <Fields
              names={[
                `${abonnementSubForm}.typeAbo`,
                `${abonnementSubForm}.distanceApproximativeCable`,
                `${abonnementSubForm}.emplacementBorne`,
                `${abonnementSubForm}.emplacementTableau`,
                `${abonnementSubForm}.isDispoTableau`,
                `${abonnementSubForm}.percementARealiser`,
                `${abonnementSubForm}.plugChargeDacces`,
                `${abonnementSubForm}.comments`,
              ]}
              component={renderAbonnement}
              props={{
                changeFormActionCreator,
                originalOnSubmit,
                handleSubmit,
              }}
            />
          </Collapse>
        </div>
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
