import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
} from 'reactstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CgExport } from 'react-icons/cg';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { withFirebase } from '../../../context/firebase';
import { getAllCompanies } from '../../../firebase/firestore/company';
import ProspectList from './list';

function ProspectContainer(props) {
  const { firebase, history, user } = props;
  const [companies, setCompany] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [idCompany, setIdCompanyValue] = useState();

  const handleChange = (e) => {
    const curr = companies.filter((c) => c.name === e.target.value)[0];
    setSelectedValue(e.target.value);
    if (curr) {
      const { id } = curr;
      sessionStorage.setItem('selectedValueCompany', e.target.value);
      setIdCompanyValue(id);
    }
  };

  const getPrevPage = () => {};
  const getNextPage = () => {};

  useEffect(() => {
    async function fetch() {
      const res = await getAllCompanies(firebase.firestore);
      const saveId = sessionStorage.getItem('selectedValueCompany');
      if (saveId) {
        const curr = res.filter((c) => c.name === saveId)[0];
        if (curr) {
          const { id } = curr;
          setIdCompanyValue(id);
        }
        setSelectedValue(saveId);
      }
      setCompany(res);
    }
    fetch();
  }, []);
  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <h3 className="mb-0">Liste des leads</h3>
                </Col>
                <Col xs="4">
                  <Input value={selectedValue} name="select-company" type="select" onChange={handleChange}>
                    <option value="0">Veuillez choisir une option</option>
                    {companies.map((o) => (
                      <option value={o.name} key={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col className="text-right" xs="2">
                  <Button color="primary" size="lg">
                    <CgExport /> Export
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Date de transmission</th>
                  <th scope="col">Tél</th>
                  <th scope="col">Achèvement</th>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="col" />
                </tr>
              </thead>
              {idCompany ? <ProspectList idCompany={idCompany} {...props} /> : null}
            </Table>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                  <PaginationItem>
                    <PaginationLink onClick={() => getPrevPage()} tabIndex="-1">
                      <FaAngleLeft />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => getNextPage()}>
                      <FaAngleRight />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
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

export default compose(withRouter, withFirebase, connect(mapStateToProps, mapDispatchToProps))(ProspectContainer);
