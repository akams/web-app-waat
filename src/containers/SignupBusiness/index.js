import React, { useEffect, useRef } from 'react';
import { compose } from 'recompose';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

import { withFirebase } from '../../context/firebase';
import ENV from '../../constants/environment/common.env';

import SignupForm, { initFormData } from './form';

const requestSignUp = (payload) => axios.post(`${ENV.apiUrl}/signup/business`, payload);

function SignupBusiness(props) {
  const mainContent = useRef(null);
  const { firebase, dispatch } = props;

  const handleSubmit = async (data) => {
    const { company, email, password, lastname, firstname } = data;
    try {
      const result = await firebase.register(email, password);
      await requestSignUp({
        uid: result.user.uid,
        email,
        lastname,
        firstname,
        company,
      });
      toast.success('🦄 Votre compte à bien été créer!');
    } catch (error) {
      console.error({ error });
      toast.error(`Error: ${error}`);
    }
  };

  const initForm = (data = { company: '', lastname: '', firstname: '', email: '', password: '', passwordTwo: '' }) => {
    dispatch(initFormData(data));
  };

  useEffect(() => {
    initForm();
  }, []);
  return (
    <>
      <main ref={mainContent}>
        <section className="full-page-container-center section section-shaped section-lg bg-secondary">
          <Container>
            <Row className="justify-content-center">
              <Col lg="8">
                <Card className="shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center mb-4">
                      <img
                        width={100}
                        title="La Recharge Responsable"
                        alt="La Recharge Responsable"
                        className="navbar-brand-img"
                        src="https://waat.fr/wp-content/uploads/2018/05/logo-waat-v10-rvb.svg"
                      />
                    </div>
                    <div className="text-center text-muted mb-6">
                      <h1>Inscription Apporteur d'affaire</h1>
                    </div>
                    <SignupForm originalOnSubmit={handleSubmit} {...props} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}

export default compose(withFirebase)(SignupBusiness);
