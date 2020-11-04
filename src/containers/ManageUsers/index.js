import React from 'react';
import { Card, CardHeader, Container, Row, Col, Table } from 'reactstrap';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from '../../context/firebase';
import ListContainer from './list';

function ManageUsers(props) {
  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <h3 className="mb-0">Liste des utilisateurs:</h3>
                </Col>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Entreprise</th>
                  <th scope="col">actitver</th>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="col" />
                </tr>
              </thead>
              <ListContainer {...props} />
            </Table>
          </Card>
        </div>
      </Row>
    </Container>
  );
}

const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(ManageUsers);
