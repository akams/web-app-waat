import React, { useRef } from 'react';
// import { compose } from 'recompose';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';

function SignupEnd(props) {
  const mainContent = useRef(null);
  console.log('SignupEnd--===>>>>', { props });
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
                      <h1>Finalisation de l'inscription</h1>
                    </div>
                    <p>Merci de votre inscription, vous allez recevoir un e-mail de confirmation à votre adresse.</p>
                    <p>A tout de suite!</p>
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

export default SignupEnd;
