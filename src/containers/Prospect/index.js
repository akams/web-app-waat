import React from 'react';
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
} from 'reactstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { withFirebase } from '../../context/firebase';
import { queryGetAll } from '../../firebase/firestore/prospect';

function ProspectContainer(props) {
  const { firebase } = props;
  console.log({ props });
  const query = queryGetAll(firebase.firestore);
  const [prospects] = useCollectionData(query, { idField: 'id' });
  console.log({ prospects });

  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Liste des leads</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Date de transmission</th>
                  <th scope="col">Tél</th>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {prospects &&
                  prospects.map((p, index) => (
                    <tr key={index} onClick={() => console.log('onclick', { p })}>
                      <th scope="row">{p.lastname}</th>
                      <td>{p.firstname}</td>
                      <td>{p.address}</td>
                      <td>25/10/2020</td>
                      <td>{p.phoneNumber}</td>
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
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Modifier
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Changer le status à terminer
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Supprimer
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                  <PaginationItem className="disabled">
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()} tabIndex="-1">
                      <FaAngleLeft />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="active">
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      2 <span className="sr-only">(current)</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
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

export default compose(withRouter, withFirebase)(ProspectContainer);
