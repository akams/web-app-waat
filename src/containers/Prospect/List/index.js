import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Progress,
} from 'reactstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight, FaEllipsisV } from 'react-icons/fa';
import moment from 'moment';
import { connect } from 'react-redux';

import { canEdit, canDelete } from '../../../services/auth.service';
import { withFirebase } from '../../../context/firebase';
import { deleteDocument, getAll, nextPage, prevPage } from '../../../firebase/firestore/prospect';

function ProspectContainer(props) {
  moment.locale('fr');
  const { firebase, history, user } = props;
  const [prospects, setProspect] = useState([]);

  const getNextPage = async () => {
    const nextValue = await nextPage(firebase.firestore, user.uid, prospects[prospects.length - 1]);
    if (nextValue.length > 0) {
      setProspect(nextValue);
    } else {
      // empty
    }
  };

  const getPrevPage = async () => {
    const prevValue = await prevPage(firebase.firestore, user.uid, prospects[0]);
    if (prevValue.length > 0) {
      setProspect(prevValue);
    } else {
      // empty
    }
  };

  useEffect(() => {
    async function fetch() {
      if (user.uid) {
        const res = await getAll(firebase.firestore, user.uid);
        setProspect(res);
      }
    }
    return () => {
      fetch();
    };
  }, [user]);
  const plainTextDateTime = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Liste des leads</h3>
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
              <tbody>
                {prospects &&
                  prospects.map((p, index) => {
                    const { statusWorksheet } = p;
                    let simpleIntegerCompletion = 0;
                    if (statusWorksheet) {
                      console.log({ statusWorksheet });
                      simpleIntegerCompletion = statusWorksheet.percentageCompletion
                        ? Math.floor(statusWorksheet.percentageCompletion)
                        : 0;
                    }
                    let className = 'bg-success';
                    if (simpleIntegerCompletion < 70) {
                      className = 'bg-danger';
                    } else if (simpleIntegerCompletion > 70 && simpleIntegerCompletion < 100) {
                      className = 'bg-info';
                    }
                    const timeStampDate = p.leadTransmissionDate;
                    const dateInMillis = timeStampDate.seconds * 1000;
                    return (
                      <tr key={index}>
                        <th scope="row">{p.lastname}</th>
                        <td>{p.firstname}</td>
                        <td>{p.address}</td>
                        <td>{plainTextDateTime(dateInMillis)}</td>
                        <td>{p.phoneNumber}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{simpleIntegerCompletion}%</span>
                            <div>
                              <Progress max="100" value={simpleIntegerCompletion} barClassName={className} />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaEllipsisV />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              {canEdit(user) && (
                                <DropdownItem onClick={() => history.push(`/detail-prospect/${p.id}`)}>
                                  Modifier
                                </DropdownItem>
                              )}
                              {canDelete(user) && (
                                <DropdownItem onClick={() => deleteDocument(firebase.firestore, p.id)}>
                                  Supprimer
                                </DropdownItem>
                              )}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
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
