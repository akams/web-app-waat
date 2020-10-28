import React, { useEffect, useRef } from 'react';
import { compose } from 'recompose';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';

import { withFirebase } from '../../context/firebase';
import { create as createUser } from '../../firebase/firestore/user';

import SignupForm, { initFormData } from './form';

function Signup(props) {
  const mainContent = useRef(null);
  const { firebase, dispatch } = props;

  const handleSubmit = async (data) => {
    const { email, password, lastname, firstname } = data;
    try {
      const result = await firebase.register(email, password);
      await createUser(firebase.firestore, {
        uid: result.user.uid,
        email,
        lastname,
        firstname,
      });
      toast.success('🦄 Votre compte à bien été créer!');
    } catch (error) {
      console.error({ error });
      toast.error(`Error: ${error}`);
    }
  };

  const initForm = (data = { lastname: '', firstname: '', email: '', password: '', passwordTwo: '' }) => {
    dispatch(initFormData(data));
  };

  useEffect(() => {
    initForm();
  }, []);
  return (
    <>
      <main ref={mainContent}>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="12">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Inscription utilisateur WAAT</small>
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

export default compose(withFirebase)(Signup);
