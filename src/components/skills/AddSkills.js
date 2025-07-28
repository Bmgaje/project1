/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import Select from 'react-select';

function AddSkills() {
  const [Skills, setSkills] = useState('');
  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);
  const navigate = useNavigate();
  let [errorMsgRepeated, setErrorMsgRepeated] = useState(false);

  const [skillCateId, setSkillCateId] = useState('');
  const [skillCateData, setSkillCateData] = useState([]);

  let [searchSkill, setSearchSkill] = useState('');
  let skillLimit = 50;

  function skillCategoryList() {
    axios.get(Urls.get.skillCategory + `?limit=${skillLimit}&q=${searchSkill}`).then((res) => {
      console.log('List of Skill Category:)', res);
      setSkillCateData(res?.data?.allSkillCategory?.docs || []);
    });
  }

  useEffect(() => {
    skillCategoryList();
  }, [searchSkill]);

  // const handleChange = (e) => {
  //   console.log('skill cate id', e.target.value);
  //   setSkillCateId(e.target.value);
  // };

  const handleSkillChange = (skillCateId) => {
    setSkillCateId(skillCateId.value);
  };

  const handleSearchInput = (inputS) => {
    setSearchSkill(inputS);
  };

  function add(e) {
    e.preventDefault();
    if (!Skills || !skillCateId) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      const payload = {
        title: Skills,
        skillCategory: skillCateId
      };
      axios
        .post(Urls.post.addskills, payload)
        .then(() => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/masters/skills');
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setErrorMsgRepeated(true);
          setTimeout(() => {
            setErrorMsgRepeated(false);
          }, 2000);
        });
    }
  }

  // const add = () => {
  //   const payload = {
  //     title: Skills
  //   };
  //   axios.post(Urls.post.addskills, payload).then((response) => {});
  // };

  return (
    <>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {error ? (
            <b>
              <Notification message="Please this * field is required !" />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {addStatus ? (
            <b>
              <Notification message="Skill added successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {errorMsgRepeated ? (
            <b>
              <Notification message="This Skill name is already exist!" />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Skills</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Skills Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setSkills(e.target.value);
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
                      value={skillCateId.title}
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
                    <Form.Select required={true} as="select" onChange={handleChange} placeholder="Select Skill Category">
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
                  <Button type="submit" variant="primary" size="sm" onClick={add}>
                    <Link className="text-white">Add Skill</Link>
                  </Button>
                  <Link to={'/masters/skills'}>
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

export default AddSkills;
