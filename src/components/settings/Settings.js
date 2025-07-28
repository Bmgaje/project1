import React from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'ckeditor5/ckeditor5.css';
import 'animate.css';
import { IoIosSettings } from "react-icons/io";

export default function Settings() {
  return (
    <div>
      <Row>
        <Col>
          <Row>
            <Col xs="auto" className="my-3 ms-auto">
              <Button variant="success" size="sm">
                Update
              </Button>
            </Col>
          </Row>
          <Card className="animate__animated animate__fadeInRight">
            <Card.Header style={{ backgroundColor: '#10446c' }}>
              <div className="container d-flex align-items-center">
                <h4 className=" text-light" style={{ letterSpacing: '3px', fontWeight: '300' }}>
                  <IoIosSettings
                    style={{
                      color: '#10446c',
                      marginRight: '8px',
                      fontSize: '40px',
                      padding: '5px',
                      backgroundColor: '#caf0f8',
                      borderRadius: '50%',
                      border: '2px dashed #10446c'
                    }}
                  />
                  Settings
                </h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <div className="col-3 ">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Logo Preview</Form.Label>
                    <div>
                      <img alt="" className="img-fluid " style={{ width: '70px', height: '60px' }} />
                    </div>
                  </div>
                  <div className="col-3 ">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Change Logo</Form.Label>
                    <div>
                      <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Control type="file" size="sm" style={{ border: '1px solid #3f4d67' }} />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="col-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Website Title</Form.Label>
                    <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                      <InputGroup>
                        <Form.Control
                          className="bg-white py-2"
                          style={{ border: '1px solid #10446c' }}
                          type="text"
                          placeholder="Enter title"
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="col-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Contact</Form.Label>
                    <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                      <InputGroup>
                        <Form.Control
                          className="bg-white py-2 "
                          style={{ border: '1px solid #10446c' }}
                          type="number"
                          placeholder=" Enter Number"
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                </Row>
                <Row className="pt-3">
                  <div className="col-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Mail Information</Form.Label>
                    <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                      <InputGroup>
                        <Form.Control
                          className="bg-white py-2 "
                          style={{ border: '1px solid #10446c' }}
                          type="email"
                          placeholder="Enter Mail Info"
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <div className="col-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Support Link</Form.Label>
                    <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                      <InputGroup>
                        <Form.Control
                          className="bg-white py-2 "
                          // onChange={(e) => {
                          //   setSupportLink(e.target.value);
                          // }}
                          style={{ border: '1px solid #10446c' }}
                          type="email"
                          placeholder="Enter Support Link"
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                </Row>
                <hr className="text-info" />
                <Row>
                  <div className="col-12">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Terms and Conditions</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      // data={termCondition}
                      // onChange={(event, editor) => {
                      //   setTermCondition(editor.getData());
                      // }}
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-12 pt-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Privacy Policy</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      // data={privacyPolicy}
                      // onChange={(event, editor) => {
                      //   setPrivacyPolicy(editor.getData());
                      // }}
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-12 pt-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>About Us</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      // data={termCondition}
                      // onChange={(event, editor) => {
                      //   setTermCondition(editor.getData());
                      // }}
                    />
                  </div>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
