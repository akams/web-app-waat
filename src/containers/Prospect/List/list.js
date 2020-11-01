import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Table, Progress } from 'reactstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';
import moment from 'moment';

import { canEdit, canDelete } from '../../../services/auth.service';
import { withFirebase } from '../../../context/firebase';
import { deleteDocument, getAll, nextPage, prevPage } from '../../../firebase/firestore/prospect';

function ProspectList(props) {
  moment.locale('fr');
  const { firebase, history, user, idCompany } = props;
  const [prospects, setProspect] = useState([]);

  const getNextPage = async () => {
    const nextValue = await nextPage(firebase.firestore, idCompany, prospects[prospects.length - 1]);
    if (nextValue.length > 0) {
      setProspect(nextValue);
    } else {
      // empty
    }
  };

  const getPrevPage = async () => {
    const prevValue = await prevPage(firebase.firestore, idCompany, prospects[0]);
    if (prevValue.length > 0) {
      setProspect(prevValue);
    } else {
      // empty
    }
  };

  useEffect(() => {
    async function fetch() {
      const res = await getAll(firebase.firestore, idCompany);
      setProspect(res);
    }
    fetch();
  }, [idCompany]);
  const plainTextDateTime = (dateTime) => moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
  return (
    <>
      <tbody>
        {prospects &&
          prospects.map((p, index) => {
            const { statusWorksheet } = p;
            let simpleIntegerCompletion = 0;
            if (statusWorksheet) {
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
                        <DropdownItem onClick={() => history.push(`/detail-prospect/${p.id}`)}>Modifier</DropdownItem>
                      )}
                      {canDelete(user) && (
                        <DropdownItem onClick={() => deleteDocument(firebase.firestore, p.id)}>Supprimer</DropdownItem>
                      )}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
}

export default compose(withRouter, withFirebase)(ProspectList);
