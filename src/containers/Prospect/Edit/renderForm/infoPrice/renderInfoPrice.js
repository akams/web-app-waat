import React from 'react';
import { Row, Col, Button, FormGroup, Form, Input, CardBody } from 'reactstrap';

export const subForm = 'infoPrice';

export function renderInfoPrice(props) {
  return (
    <>
      <h6 className="heading-small text-muted mb-4">Information prix</h6>
      <div className="pl-lg-2">
        <Row>
          <Col lg="6">test price</Col>
        </Row>
      </div>
    </>
  );
}
