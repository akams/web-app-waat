import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Progress,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
} from 'reactstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { FaEllipsisV, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import moment from 'moment';
import { toast } from 'react-toastify';

import { canEdit, canDelete } from '../../../services/auth.service';
import { withFirebase } from '../../../context/firebase';
import { deleteDocument, getDataByPagination, nextPage, prevPage } from '../../../firebase/firestore/prospect';

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
      toast.info('vous avez atteint la limite maximum');
    }
  };

  const getPrevPage = async () => {
    const prevValue = await prevPage(firebase.firestore, idCompany, prospects[0]);
    if (prevValue.length > 0) {
      setProspect(prevValue);
    } else {
      // empty
      toast.info('vous avez atteint la limite minimum');
    }
  };

  const onDelete = async ({ id }) => {
    await deleteDocument(firebase.firestore, id);
    const data = await getDataByPagination(firebase.firestore, idCompany);
    setProspect(data);
  };

  useEffect(() => {
    async function fetch() {
      const res = await getDataByPagination(firebase.firestore, idCompany);
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
            let dateInMillis;
            if (typeof p.leadTransmissionDate !== 'string') {
              const timeStampDate = p.leadTransmissionDate;
              dateInMillis = plainTextDateTime(timeStampDate.seconds * 1000);
            } else {
              dateInMillis = plainTextDateTime(p.leadTransmissionDate);
            }
            return (
              <tr key={index}>
                <th scope="row">{p.lastname}</th>
                <td>{p.firstname}</td>
                <td>{p.address}</td>
                <td>{dateInMillis}</td>
                <td>{p.phoneNumber}</td>
                <td>
                  <span className="d-flex align-items-center">
                    <span className="mr-2">{simpleIntegerCompletion}%</span>
                    <Progress max="100" value={simpleIntegerCompletion} barClassName={className} />
                  </span>
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
                      {canDelete(user) && <DropdownItem onClick={() => onDelete(p)}>Supprimer</DropdownItem>}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            );
          })}
      </tbody>
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
    </>
  );
}

export default compose(withRouter, withFirebase)(ProspectList);
