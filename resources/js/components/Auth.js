import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Col, Button, Container } from "react-bootstrap";
import SaleTable from "./SaleTable";

import { Router, Link } from "react-router-dom";
import axios from "axios";

class Auth extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Col md={{ span: 6, offset: 3 }}>
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Container>
                </Col>
            </div>
        );
    }
}

export default Auth;
