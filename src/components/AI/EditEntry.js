import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function EditEntry() {
    const [payload, setPayload] = useState({ title: "", overview: "" });

    const params = useParams();

    const navigate = useNavigate();

    const getData = () => {
        axios.get(Urls.get.getAllProposals + '/' + params.id).then((res) => {
            const proposal = res.data.getAIProposals;
            setPayload({
                ...payload, title: proposal.title, overview: proposal.overview
            })
        });
    };

    function updateData(event) {
        event.preventDefault();

        axios.put(Urls.put.updateProposal + params.id, payload).then((response) => {
            if (response.data.status === 'success') {
                navigate('/AI/all-entry');
            } else {
                alert('something went wrong plese try again');
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])


    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }

    return (
        <Row>
            <Col sm={12}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Update Sub Testing</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={updateData}>
                            <Row>
                                <Form.Label>Title</Form.Label>
                                <Form.Group className="mb-3" as={Col} md="6">
                                    <Form.Control defaultValue={payload.title} disabled required type="text" placeholder="Enter Title" name="title" onChange={handleChange} />
                                </Form.Group>
                            </Row>

                            <Col>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={payload.overview}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setPayload({ ...payload, overview: data })
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
    )
}
