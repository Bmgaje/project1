/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AddUserForm() {
  return (
    <>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Form controls</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control required type="text" placeholder="First name" />
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control required type="text" placeholder="Last name" />
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                      <Form.Control type="text" placeholder="Username" aria-describedby="inputGroupPrepend" required />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select">
                      <option>Active</option>
                      <option>In-Active</option>
                    </Form.Control>
                  </Form.Group>

                  <Col xs="auto" className="my-1">
                    <Button type="submit" variant="primary">
                      <Link to={'/masters/category'} className="text-white">
                        Submit
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AddUserForm;
