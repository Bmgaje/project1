import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
// import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo ,Heading,List} from 'ckeditor5';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import 'ckeditor5/ckeditor5.css';
import { Urls } from '../../helpers/Urls';
import { useNavigate } from 'react-router-dom';

function AddEntry() {
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    title: '',
    overview: ''
  });

  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const generateProposal = () => {
    setLoading(true);
    axios.post(Urls.post.generateProposal, payload).then((res) => {
      setPayload({ ...payload, overview: res.data.data });
    });
  };

  const save = (e) => {
    e.preventDefault();

    axios.post(Urls.post.addProposal, payload).then((res) => {
      if (res.data.status === 'success') {
        navigate('/AI/all-entry');
      }
    });
  };

  return (
    <>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Entry</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={save}>
                <Row>
                  <Form.Label>Title</Form.Label>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Control required type="text" placeholder="Enter Title" name="title" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Button onClick={generateProposal} className="text-white btn btn-success">
                      {isLoading ? 'Generating...' : 'Generate'}
                    </Button>
                  </Form.Group>
                </Row>

                <Col>
                  <CKEditor
                    editor={ClassicEditor}
                    data={payload.overview}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setPayload({ ...payload, overview: data });
                    }}
                  />
                </Col>

                <Col xs="auto" className="my-3">
                  <Button type="submit" variant="primary">
                    <span className="text-white">Save</span>
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AddEntry;
