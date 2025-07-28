import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import menuItems from '../../menu-items';
import Notification from '../Widgets/Statistic/Notification';
import { Urls } from '../../helpers/Urls';
import instance from '../../helpers/axiosInstance';

function AddSubAdmin() {
  const navigate = useNavigate();
  let [isChecked, setIsChecked] = useState(false);

  let [id, setId] = useState([]);
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');

  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);

  const [catchError, setCatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //Single item selected
  const checkbox_handler = (e) => {
    const isSelected = e.target.checked;

    if (isSelected) {
      setId([...id, e.target.value]);
    } else {
      setId(
        id.filter((filteredItem) => {
          return filteredItem !== e.target.value;
        })
      );
    }
  };

  // All Item Selected

  const selectAll = () => {
    if (!isChecked) {
      // Collect all IDs from menu items, including nested 'collapse' children
      const id = menuItems?.items?.[0]?.children?.flatMap((item) =>
        item.type === 'collapse' ? item.children?.map((child) => child.id) || [] : [item.id]
      );

      setId(id);
    } else {
      setId([]); // Deselect all
    }

    setIsChecked(!isChecked); // Toggle selection state
  };

  function add(e) {
    e.preventDefault();
    if (!name || !email || id.length === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      const payload = {
        name: name,
        email: email,
        menus: id
      };
      instance
        .post(Urls.post.addSubAdmin, payload)
        .then(() => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/masters/subAdmin');
          }, 2000);
        })
        .catch((error) => {
          console.error('Error adding sub-admin:', error);
          const msg = error?.response?.data?.message || 'Something went wrong!';
          setErrorMessage(msg);
          setCatchError(true);
          setTimeout(() => {
            setCatchError(false);
            setErrorMessage('');
          }, 2000);
        });
    }
  }

  return (
    <div>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {error ? (
            <b>
              <Notification message="Please this * field is required ! 😥" />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-4 offset-8 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {addStatus ? (
            <b>
              <Notification message={`Welcome, "${name}" is now a Sub Admin 😍`} />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-5 offset-7 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {catchError ? (
            <b>
              <Notification message={`Error: ${errorMessage} ❌`} />
            </b>
          ) : null}
        </div>
      </div>

      {/* <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {addStatus ? (
            <b>
              <Notification message="Sub-Admin added successfully. 😍" />
            </b>
          ) : null}
        </div>
      </div> */}
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5" style={{ color: '#10446c', fontSize: 'bold' }}>
                Add Sub Admin
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <div className="col-4">
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Form.Group>
                  </div>

                  <div className="col-4">
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>
                        E-mail <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="text"
                        placeholder="Enter Email Name"
                      />
                    </Form.Group>
                  </div>
                </Row>

                <Row className="pt-4">
                  <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>
                    Select Fields{' '}
                    <span className="text-danger" style={{ fontSize: '11px' }}>
                      (Please fill all fields or select at least one menu)*
                    </span>
                  </Form.Label>
                  <div className="col-3 d-flex align-items-center">
                    <input type="checkbox" className="me-2" checked={isChecked} onChange={selectAll} />{' '}
                    <span style={{ color: '#10446c' }}>Select All</span>
                  </div>

                  {menuItems?.items?.[0]?.children?.map((item, index) => {
                    // If the item is of type 'collapse', map over its children
                    if (item.type === 'collapse') {
                      return item.children?.map((child, childIndex) => (
                        <div key={childIndex} className="col-3 d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="me-2"
                            checked={id.includes(child.id)}
                            value={child.id}
                            onClick={(e) => checkbox_handler(e)}
                          />
                          <span style={{ color: '#10446c' }}>{child?.title}</span>
                        </div>
                      ));
                    }

                    // Otherwise, render the item directly
                    return (
                      <div key={index} className="col-3 d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="me-2"
                          checked={id.includes(item.id)}
                          value={item.id}
                          onClick={(e) => checkbox_handler(e)}
                        />
                        <span style={{ color: '#10446c' }}>{item?.title}</span>
                      </div>
                    );
                  })}
                </Row>

                <Col xs="auto" className="pt-5">
                  <Button type="submit" variant="primary" size="sm" onClick={add}>
                    <Link className="text-white">Add</Link>
                  </Button>
                  <Link to={'/masters/subAdmin'} className="text-white">
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

export default AddSubAdmin;
