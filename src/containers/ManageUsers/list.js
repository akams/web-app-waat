import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
} from 'reactstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { FaEllipsisV, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

import ENV from '../../constants/environment/common.env';
import { canEdit, canDelete } from '../../services/auth.service';
import { withFirebase } from '../../context/firebase';
import { getAll, deleteUser, nextPage, prevPage } from '../../firebase/firestore/user';

const requestActiveAccount = (payload) => axios.post(`${ENV.apiUrl}/manage/users/validate`, payload);

function List(props) {
  const { firebase, history, user: currentUser } = props;
  const [users, setUsers] = useState([]);

  const onDelete = async ({ id }) => {
    await deleteUser(firebase.firestore, id);
    const data = await getAll(firebase.firestore);
    setUsers(data);
  };

  const onActivate = async ({ id }) => {
    try {
      await requestActiveAccount({ uid: id });
      toast.success('Le compte a bien été activer');
      const data = await getAll(firebase.firestore);
      setUsers(data);
    } catch (error) {
      console.error({ error });
      toast.error(`Error: une erreur c'est déroulé lors de l'activation du compte`);
    }
  };

  const getNextPage = async () => {
    const nextValue = await nextPage(firebase.firestore, users[users.length - 1]);
    if (nextValue.length > 0) {
      setUsers(nextValue);
    } else {
      // empty
      toast.info('vous avez atteint la limite maximum');
    }
  };

  const getPrevPage = async () => {
    const prevValue = await prevPage(firebase.firestore, users[0]);
    if (prevValue.length > 0) {
      setUsers(prevValue);
    } else {
      // empty
      toast.info('vous avez atteint la limite minimum');
    }
  };

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
                    <DropdownItem onClick={() => onActivate(p)}>Activer compte</DropdownItem>
                    <DropdownItem onClick={() => onDelete(p)}>Supprimer compte</DropdownItem>
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
              <PaginationLink onClick={() => getPrevPage()} tabIndex="-1">
                <FaAngleLeft />
                <span className="sr-only">Précédent</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => getNextPage()}>
                <FaAngleRight />
                <span className="sr-only">Suivant</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
      </CardFooter>
    </>
  );
}

export default compose(withRouter, withFirebase)(List);
