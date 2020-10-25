import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { Button, Card, CardBody, FormGroup, Form, Input, Container, Row, Col, Label } from 'reactstrap';

function RegisterProspect() {
  return (
    <>
      <Container className="mt-7 pt-lg-7">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h1>Fiche de renseignement</h1>
                </div>
                <Form role="form">
                  <FormGroup row>
                    <Label for="company" sm={2}>
                      Entreprise
                    </Label>
                    <Col sm={10}>
                      <Input placeholder="Apple..." type="text" name="company" id="company" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="lastname" sm={2}>
                      Nom
                    </Label>
                    <Col sm={10}>
                      <Input placeholder="Dupont" type="text" name="lastname" id="lastname" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="firstname" sm={2}>
                      Prénom
                    </Label>
                    <Col sm={10}>
                      <Input placeholder="Jean" type="text" name="firstname" id="firstname" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="address" sm={2}>
                      Adresse
                    </Label>
                    <Col sm={10}>
                      <Input placeholder="3 BLV..." type="text" name="address" id="address" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="phoneNumber" sm={2}>
                      Prénom
                    </Label>
                    <Col sm={10}>
                      <Input placeholder="0651032217" type="text" name="phoneNumber" id="phoneNumber" />
                    </Col>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      <Link to="/" style={{ color: 'white' }}>
                        Enregistrer
                      </Link>
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

export default RegisterProspect;
