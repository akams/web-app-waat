import React, { useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, Container, Row, Col, Button } from 'reactstrap';
import { compose } from 'recompose';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { withFirebase } from '../../context/firebase';

import Form, { initFormData } from '../../containers/ForgotPassword';

function ForgotPassword(props) {
  const mainRef = useRef(null);
  const { firebase, dispatch, history } = props;

  const handleSubmit = async (data) => {
    const { email } = data;
    console.log({ data });
    try {
      await firebase.passwordReset(email);
      toast.success('Un e-mail a été envoyer dans votre boite mail');
    } catch (error) {
      console.error({ error });
      toast.error(`Error: ${error}`);
    }
  };

  const initForm = (data = { email: '' }) => {
    dispatch(initFormData(data));
  };

  useEffect(() => {
    initForm();
  }, []);

  return (
    <>
      <main ref={mainRef}>
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
                      <h1>
                        Mot de passe oublié ?{' '}
                        <Button
                          style={{ float: 'right' }}
                          color="primary"
                          onClick={() => history.push('/signin')}
                          size="sm"
                        >
                          <IoMdArrowRoundBack />
                        </Button>
                      </h1>
                      <small>Saisissez votre adresse e-mail pour réinitialiser votre mot de passe</small>
                    </div>
                    <Form originalOnSubmit={handleSubmit} {...props} />
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

export default compose(withRouter, withFirebase)(ForgotPassword);
