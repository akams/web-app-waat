import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Container, Row, Col, Button } from 'reactstrap';
import { compose } from 'recompose';
import { withRouter, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { withFirebase } from '../../../context/firebase';
import { getByUid, update } from '../../../firebase/firestore/prospect';

import EditForm, { initFormData, formName } from './form';
import { formToApi, ApiToForm } from './control-data';
import { transformTimeFirebaseToMomentTime as getFormatTime } from '../../../helpers/datetime';

function ProspectEditContainer(props) {
  const {
    firebase,
    history,
    formValues: { leadTransmissionDate },
  } = props;
  const { prospectId } = useParams();
  const [prospect, setProspect] = useState({});
  const initForm = (data) => {
    const { dispatch } = props;
    dispatch(initFormData(ApiToForm(data)));
  };

  const handleSubmit = async (data) => {
    try {
      const dataToApi = formToApi(data);
      await update(firebase.firestore, prospectId, dataToApi);
      toast.success('🦄 Mise à jour terminer');
    } catch (error) {
      console.error({ error });
      toast.error(`Error: ${error}`);
    }
  };

  useEffect(() => {
    async function fetch() {
      const res = await getByUid(firebase.firestore, prospectId);
      initForm(res);
      setProspect(res);
    }
    fetch();
  }, [prospectId, setProspect]);
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col>
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Modification :</h3>
                  <div className="text-muted mt-2">
                    <small>Date de transmission Lead: {getFormatTime(leadTransmissionDate)}</small>
                  </div>
                </Col>
                <Col className="text-right" xs="4">
                  <Button color="primary" onClick={() => history.push('/manage-prospects')} size="sm">
                    <IoMdArrowRoundBack />
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <EditForm prospect={prospect} originalOnSubmit={handleSubmit} {...props} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const selector = formValueSelector(formName);
const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  formValues: {
    leadTransmissionDate: selector(state, 'leadTransmissionDate'),
  },
});

export default compose(
  withRouter,
  withFirebase,
  reduxForm({
    form: formName,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(ProspectEditContainer);
