import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';

export default function EditSkillCategory() {
  const params = useParams();
  const navigate = useNavigate();
  //   const location = useLocation();
  //   const page = location?.state?.activePage;
  //   const limit = location?.state?.limit;

  const [skillCategory, setSkillCategory] = useState('');
  let [statusUpdate, setStatusUpdate] = useState(false);

  const fetch = () => {
    axios.get(Urls.get.singleSkillCategory + params.id).then((response) => {
      console.log('single data skill category', response);
      setSkillCategory(response.data?.getSkillCategory?.title);
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  const update = (e) => {
    e.preventDefault();
    const payload = {
      title: skillCategory
    };
    axios.put(Urls.put.updateSkillCategory + params.id, payload).then((res) => {
      console.log('updted dta', res);

      if (res?.data?.message === 'Skill category updated successfully') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/masters/skillsCategory');
        }, 2000);
      } else {
        alert('something went wrong plese try again');
      }
    });
  };

  return (
    <div>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {statusUpdate ? (
            <b>
              <Notification message="Data updated Successfully." />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update Skill Category</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={update}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Skill Category Name</Form.Label>
                    <Form.Control
                      defaultValue={skillCategory}
                      required
                      onChange={(e) => {
                        setSkillCategory(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter University Name"
                    />
                  </Form.Group>
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" size="sm">
                    Update
                  </Button>
                  <Link
                    to={'/masters/skillsCategory'}
                    //    state={{ activePage: page, limit: limit }}
                  >
                    <Button variant="danger" size="sm">
                      Cancel
                    </Button>
                  </Link>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
