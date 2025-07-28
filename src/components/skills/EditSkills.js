/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import Select from 'react-select';

import { useParams } from 'react-router-dom';

function EditSkills() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;
  // const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  let [statusUpdate, setStatusUpdate] = useState(false);

  const [skillCateId, setSkillCateId] = useState('');
  const [skillCateData, setSkillCateData] = useState([]);

  let [searchSkill, setSearchSkill] = useState('');
  let skillLimit = 50;

  const fetch = () => {
    axios.get(Urls.get.skills + '/' + params.id).then((response) => {
      console.log('single skill', response);
      const data = response.data?.getSkills;
      setNewTitle(data?.title);
      // setSkillCateId(response.data?.getSkills?.skill_category?._id)
      setSkillCateId({ label: data?.skill_category?.title, value: data?.skill_category?._id });
    });
  };

  function skillCategoryList() {
    axios.get(Urls.get.skillCategory + `?limit=${skillLimit}&q=${searchSkill}`).then((res) => {
      console.log('List of Skill Category:)', res);
      setSkillCateData(res?.data?.allSkillCategory?.docs || []);
    });
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    skillCategoryList();
  }, [searchSkill]);

  // const handleChange = (e) => {
  //   console.log('skill cate id', e.target.value);
  //   setSkillCateId(e.target.value);
  // };

  const handleSkillChange = (skillCateId) => {
    setSkillCateId(skillCateId);
  };

  const handleSearchInput = (inputS) => {
    setSearchSkill(inputS);
  };

  const update = (e) => {
    e.preventDefault();
    const payload = {
      title: newTitle,
      skillCategory: skillCateId.value
    };
    axios.put(Urls.put.updateSkills + params.id, payload).then((res) => {
      if (res.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/masters/Skills', { state: { activePage: page, limit: limit } });
        }, 2000);
      } else {
        alert('something went wrong plese try again');
      }
    });
  };

  return (
    <>
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
              <Card.Title as="h5">Update Skills</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={update}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Skills Name</Form.Label>
                    <Form.Control
                      defaultValue={newTitle}
                      required
                      onChange={(e) => {
                        setNewTitle(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Skills Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Skill Category Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Select
                      value={skillCateId}
                      onChange={handleSkillChange}
                      options={skillCateData?.map((item) => {
                        return {
                          label: item?.title,
                          value: item?._id
                        };
                      })}
                      onInputChange={handleSearchInput}
                      placeholder="Search..."
                      isSearchable
                    />
                  </Form.Group>

                  {/* <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Skill Category Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select required={true} value={skillCateId} as="select" onChange={handleChange} placeholder="Select Skill Category">
                      <option value={''}>Select Skill Category</option>
                      {skillCateData?.map((item, index) => {
                        return (
                          <option key={index} value={item?._id}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group> */}
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" size="sm">
                    Skill Update
                  </Button>
                  <Link to={'/masters/skills'} state={{ activePage: page, limit: limit }}>
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
    </>
  );
}

export default EditSkills;
