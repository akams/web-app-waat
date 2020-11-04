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

import { canEdit, canDelete } from '../../services/auth.service';
import { withFirebase } from '../../context/firebase';
import { getAll } from '../../firebase/firestore/user';

function List(props) {
  const { firebase, history, user: currentUser, idCompany } = props;
  const [users, setUsers] = useState([]);

  // const getNextPage = async () => {
  //   const nextValue = await nextPage(firebase.firestore, idCompany, prospects[prospects.length - 1]);
  //   if (nextValue.length > 0) {
  //     setProspect(nextValue);
  //   } else {
  //     // empty
  //     toast.info('vous avez atteint la limite maximum');
  //   }
  // };

  // const getPrevPage = async () => {
  //   const prevValue = await prevPage(firebase.firestore, idCompany, prospects[0]);
  //   if (prevValue.length > 0) {
  //     setProspect(prevValue);
  //   } else {
  //     // empty
  //     toast.info('vous avez atteint la limite minimum');
  //   }
  // };

  useEffect(() => {
    async function fetch() {
      const res = await getAll(firebase.firestore);
      setUsers(res);
    }
    fetch();
  }, []);
  return (
    <>
      <tbody>
        {users &&
          users.map((p, index) => (
            <tr key={index}>
              <th scope="row">{p.lastname}</th>
              <td>{p.firstname}</td>
              <td>{p.email}</td>
              <td>{p.company}</td>
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
                    <DropdownItem onClick={() => console.log('modify')}>Modifier</DropdownItem>
                    <DropdownItem onClick={() => console.log('Supprimer')}>Supprimer</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
      </tbody>
      <CardFooter className="py-4">
        <nav aria-label="...">
          <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
            <PaginationItem>
              <PaginationLink onClick={() => console.log('-1')} tabIndex="-1">
                <FaAngleLeft />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => console.log('-2')}>
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

export default compose(withRouter, withFirebase)(List);
