import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Container, Row } from 'reactstrap';
import { compose } from 'recompose';
import { withRouter, useParams } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { withFirebase } from '../../../context/firebase';
import { getByUid } from '../../../firebase/firestore/prospect';

function ProspectEditContainer(props) {
  const { firebase } = props;
  const { prospectId } = useParams();
  const [prospect, setProspect] = useState({});
  // const query = queryGetAll(firebase.firestore);
  // const [prospects] = useCollectionData(query, { idField: 'id' });
  // console.log({ prospects });

  useEffect(() => {
    async function fetch() {
      const res = await getByUid(firebase.firestore, prospectId);
      setProspect(res);
    }
    fetch();
  }, []);
  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Modification : {prospectId}</h3>
            </CardHeader>
            <div>body {JSON.stringify(prospect)}</div>
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default compose(withRouter, withFirebase)(ProspectEditContainer);
