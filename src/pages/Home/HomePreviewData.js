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
import { canEdit, displayKPIForAdmin, displayKPIForGuest } from '../../services/auth.service';

import CardKpi from '../../components/CardKpi';

import ENV from '../../constants/environment/common.env';

const getSimpleInfoStat = () => axios.get(`${ENV.apiUrl}/get-simple-stats-info`);
const getProspectById = (id) => axios.get(`${ENV.apiUrl}/prospect/${id}`);
const getProspect = () => axios.get(`${ENV.apiUrl}/prospect`);

function HomePreviewData(props) {
  const { history, user } = props;
  const [prospects, setProspects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [simpleInfoData, setSimpleInfoData] = useState({
    newBusinessProviderSize: 0,
    newWorksheetSize: 0,
    newLeadAcquisitionSize: 0,
  });
  const [updateUIToAdmin, setUpdateUIToAdmin] = useState(true);

  useEffect(() => {
    async function fetch() {
      if (displayKPIForAdmin(user)) {
        const res = await getProspect();
        const res2 = await getSimpleInfoStat();
        setProspects(res.data);
        setSimpleInfoData(res2.data);
        setIsLoading(false);
      } else if (displayKPIForGuest(user)) {
        setUpdateUIToAdmin(false);
        const res = await getProspectById(user.uid);
        setProspects(res.data);
      }
    }
    fetch();
  }, [user]);
  const plainTextDateTime = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
  const sizeCol = updateUIToAdmin ? 8 : 12;

  return (
    <Row className="mt-5">
      <Col className="mb-5 mb-xl-0" xl={sizeCol}>
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
                        {canEdit(user) && (
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
                              <DropdownItem onClick={() => history.push(`/detail-prospect/${prospect.id}`)}>
                                Modifier
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card>
      </Col>
      {displayKPIForAdmin(user) && (
        <Col xl="4">
          <CardKpi
            title="Acquisition nouveau lead"
            description="Depuis le mois dernier"
            value={simpleInfoData.newLeadAcquisitionSize}
            icon={<FaChartBar />}
            iconClassName="icon icon-shape bg-danger text-white rounded-circle shadow"
            isLoading={isLoading}
          />
          <CardKpi
            title="Fiche travaux avec status terminer"
            description="Depuis la semaine dernière"
            value={simpleInfoData.newWorksheetSize}
            classNameCard="card-stats mb-4 mb-xl-0 mt-4"
            icon={<FaChartPie />}
            iconClassName="icon icon-shape bg-warning text-white rounded-circle shadow"
            isLoading={isLoading}
          />
          <CardKpi
            title="Nouveau apporteur d'affaire"
            description="Depuis hier"
            value={simpleInfoData.newBusinessProviderSize}
            classNameCard="card-stats mb-4 mb-xl-0 mt-4"
            icon={<FaUsers />}
            iconClassName="icon icon-shape bg-yellow text-white rounded-circle shadow"
            isIntern={false}
            isLoading={isLoading}
          />
        </Col>
      )}
    </Row>
  );
}

export default compose(withRouter, withFirebase)(HomePreviewData);
