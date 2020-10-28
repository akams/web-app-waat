import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { compose } from 'recompose';
import { toast } from 'react-toastify';

import { withFirebase } from '../../context/firebase';

import SigninContainer, { initFormData } from '../../containers/Signin';

function Signin(props) {
  const mainRef = useRef(null);
  const { firebase, dispatch } = props;

  const handleSubmit = async (data) => {
    const { email, password } = data;
    try {
      await firebase.login(email, password);
      toast.success('🦄 Wow so easy!');
    } catch (error) {
      console.error({ error });
      toast.error(`Error: ${error}`);
    }
  };

  const initForm = (data = { email: '', password: '' }) => {
    dispatch(initFormData(data));
  };

  useEffect(() => {
    initForm();
  }, []);

  return (
    <>
      <main ref={mainRef}>
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
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Connexion</small>
                    </div>
                    <SigninContainer originalOnSubmit={handleSubmit} {...props} />
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a className="text-light" href="#pablo">
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Link className="text-light" to="/signup">
                      <small>Create new account</small>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}

export default compose(withFirebase)(Signin);
