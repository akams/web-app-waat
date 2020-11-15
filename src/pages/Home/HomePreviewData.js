/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Button,
  Table,
  Row,
  Col,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { FaEllipsisV, FaChartBar, FaChartPie, FaUsers } from 'react-icons/fa';
import moment from 'moment';
import axios from 'axios';

import { withFirebase } from '../../context/firebase';
import { getLastFiveProspect } from '../../firebase/firestore/prospect';
import { canEdit } from '../../services/auth.service';

import CardKpi from '../../components/CardKpi';

import ENV from '../../constants/environment/common.env';

const getSimpleInfoStat = () => axios.get(`${ENV.apiUrl}/get-simple-stats-info`);

function HomePreviewData(props) {
  const { firebase, history, user } = props;
  const [prospects, setProspects] = useState([]);
  const [simpleInfoData, setSimpleInfoData] = useState({
    newBusinessProviderSize: 0,
    newWorksheetSize: 0,
    newLeadAcquisitionSize: 0,
  });

  useEffect(() => {
    async function fetch() {
      const res = await getLastFiveProspect(firebase);
      const res2 = await getSimpleInfoStat();
      setProspects(res);
      setSimpleInfoData(res2.data);
    }
    fetch();
  }, []);
  const plainTextDateTime = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm:ss');

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
        <CardKpi
          title="Acquisition nouveau lead"
          description="Depuis le mois dernier"
          value={simpleInfoData.newLeadAcquisitionSize}
          icon={<FaChartBar />}
          iconClassName="icon icon-shape bg-danger text-white rounded-circle shadow"
        />
        <CardKpi
          title="Fiche travaux avec status terminer"
          description="Depuis la semaine dernière"
          value={simpleInfoData.newWorksheetSize}
          classNameCard="card-stats mb-4 mb-xl-0 mt-4"
          icon={<FaChartPie />}
          iconClassName="icon icon-shape bg-warning text-white rounded-circle shadow"
        />
        <CardKpi
          title="Nouveau apporteur d'affaire"
          description="Depuis hier"
          value={simpleInfoData.newBusinessProviderSize}
          classNameCard="card-stats mb-4 mb-xl-0 mt-4"
          icon={<FaUsers />}
          iconClassName="icon icon-shape bg-yellow text-white rounded-circle shadow"
          isIntern={false}
        />
      </Col>
    </Row>
  );
}

export default compose(withRouter, withFirebase)(HomePreviewData);
