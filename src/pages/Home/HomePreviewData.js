/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Button,
  Table,
  CardBody,
  CardTitle,
  Row,
  Col,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { FaEllipsisV, FaChartBar, FaChartPie, FaUsers, FaArrowUp, FaEquals } from 'react-icons/fa';
import moment from 'moment';

import { withFirebase } from '../../context/firebase';
import { getLastFiveProspect } from '../../firebase/firestore/prospect';
import { canEdit } from '../../services/auth.service';

function HomePreviewData(props) {
  const {
    firebase,
    history,
    user,
    simpleInfoData: { newBusinessProviderSize = 0, newWorksheetSize = 0 },
  } = props;
  const [prospects, setProspects] = useState([]);
  useEffect(() => {
    async function fetch() {
      const res = await getLastFiveProspect(firebase);
      setProspects(res);
    }
    fetch();
  }, []);
  const plainTextDateTime = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
  const getClassName = (value) => 'mr-2 '.concat(value > 0 ? 'text-success' : 'text-info');

  return (
    <Row className="mt-5">
      <Col className="mb-5 mb-xl-0" xl="8">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">5 dernières fiches clients</h3>
              </div>
              <div className="col text-right">
                <Button color="primary" onClick={() => history.push('/manage-prospects')} size="sm">
                  Tout voir
                </Button>
              </div>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Date de transmission</th>
                <th scope="col">Prospect</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {prospects &&
                prospects.map((prospect, index) => {
                  let dateInMillis;
                  if (typeof prospect.leadTransmissionDate !== 'string') {
                    const timeStampDate = prospect.leadTransmissionDate;
                    dateInMillis = plainTextDateTime(timeStampDate.seconds * 1000);
                  } else {
                    dateInMillis = plainTextDateTime(prospect.leadTransmissionDate);
                  }
                  return (
                    <tr key={index}>
                      <th scope="row">{prospect.company}</th>
                      <td>{dateInMillis}</td>
                      <td>{prospect.prospectName}</td>
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
                              <DropdownItem onClick={() => history.push(`/detail-prospect/${prospect.id}`)}>
                                Modifier
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
        </Card>
      </Col>
      <Col xl="4">
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  Acquisition nouveau lead
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">350</span>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <FaChartBar />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <FaArrowUp /> 8.48%
              </span>{' '}
              <span className="text-nowrap">Depuis le mois dernier</span>
            </p>
          </CardBody>
        </Card>

        <Card className="card-stats mb-4 mb-xl-0 mt-4">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  Nouvelle fiche travaux
                </CardTitle>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                  <FaChartPie />
                </div>
              </Col>
              <Col className="col">
                <p className="mb-0 text-muted text-sm">
                  <span className={getClassName(newWorksheetSize)}>
                    {newWorksheetSize > 0 ? <FaArrowUp /> : <FaEquals />}{' '}
                    <span className="font-weight-bold mb-0">{newWorksheetSize}</span>
                  </span>{' '}
                  <span className="text-nowrap">Depuis la semaine dernière</span>
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="card-stats mb-4 mb-xl-0 mt-4">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  Nouveau apporteur d'affaire
                </CardTitle>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                  <FaUsers />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className={getClassName(newBusinessProviderSize)}>
                {newBusinessProviderSize > 0 ? <FaArrowUp /> : <FaEquals />}{' '}
                <span className="font-weight-bold mb-0">{newBusinessProviderSize}</span>
              </span>{' '}
              <span className="text-nowrap">Depuis hier</span>
            </p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default compose(withRouter, withFirebase)(HomePreviewData);
