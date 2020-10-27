import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';

import { withFirebase } from '../../context/firebase';
// import { create as createUser, getLastInsert } from '../../firebase/firestore/user';
import * as ROUTES from '../../constants/routes';
import { dispatchSetUsers } from '../../redux/action/user';
import { create as createUser, getByUid } from '../../firebase/firestore/user';

import SignupForm, { initFormData } from './form';

function Signup(props) {
  console.log({ props });
  const mainContent = useRef(null);
  const { firebase, history, dispatch } = props;

  const handleSubmit = async (data) => {
    console.log('final submit', { data });
    const { email, password, lastname, firstname } = data;
    const { dispatchSetUsersFunction } = props;
    try {
      const result = await firebase.doCreateUserWithEmailAndPassword(email, password);
      await createUser(firebase.firestore, {
        uid: result.user.uid,
        email,
        password,
        lastname,
        firstname,
      });
      const lastUser = await getByUid(firebase.firestore, result.user.uid);
      if (lastUser.id) {
        dispatchSetUsersFunction(lastUser.data);
        toast.success('🦄 Wow so easy!');
        history.push(ROUTES.HOME);
      }
    } catch (error) {
      console.error({ error });
      toast.error(`Error: ${error}`);
    }
  };

  const initForm = (data = { lastname: '', firstname: '', email: '', password: '', passwordTwo: '' }) => {
    dispatch(initFormData(data));
  };

  useEffect(() => {
    initForm();
  }, []);
  return (
    <>
      <main ref={mainContent}>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="12">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Inscription utilisateur WAAT</small>
                    </div>
                    <SignupForm originalOnSubmit={handleSubmit} {...props} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: (user) => dispatchSetUsers(user),
};
const mapStateToProps = () => ({});

export default compose(withRouter, withFirebase, connect(mapStateToProps, mapDispatchToProps))(Signup);
