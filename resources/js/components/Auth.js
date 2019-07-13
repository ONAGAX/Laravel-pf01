import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Col, Button, Container, Modal } from "react-bootstrap";
import NotificationSystem from "react-notification-system";
import styles from "./styles.scss";
import Axios from "axios";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.notificationSystem = React.createRef();
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            email: "",
            password: ""
        };
    }

    addNotification() {
        const notification = this.notificationSystem.current;
        notification.addNotification({
            position: "tc",
            title: "ログインエラー",
            message: "メールアドレスかパスワードが間違っています",
            level: "error"
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        Axios.post("/api/login", {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                const token = res.data.access_token;
                Axios.defaults.headers.common["Authorization"] =
                    "Bearer " + token;
                Axios.get("/api/me")
                    .then(res => {
                        this.props.handleGetState(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                this.setState({ login: true });
            })
            .catch(err => {
                console.log(err);
                this.addNotification();
            });
    }

    handleLogout() {
        Axios.post("/api/logout").then(res => {
            Axios.defaults.headers.common["Authorization"] = "";
            this.setState({ login: false });
            console.log(this.state.login);
        });
    }

    UserTyping(type, e) {
        switch (type) {
            case "email":
                this.setState({ email: e.target.value });
                return;
            case "password":
                this.setState({ password: e.target.value });
                return;
            default:
                return;
        }
    }

    render() {
        return (
            <div className="auth">
                <Col md={{ span: 6, offset: 3 }}>
                    <Container>
                        <Form
                            onSubmit={e => {
                                this.handleSubmit(e);
                            }}
                        >
                            <h5 style={{ textAline: "center" }}>
                                ログインフォーム
                            </h5>
                            <hr />
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>メールアドレス</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="アドレスを入力"
                                    onChange={e => {
                                        this.UserTyping("email", e);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>パスワード</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="パスワードを入力"
                                    onChange={e => {
                                        this.UserTyping("password", e);
                                    }}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 mt-2"
                            >
                                ログイン
                            </Button>
                        </Form>
                        <Modal.Dialog>
                            <Modal.Body>
                                <p>テストアカウントご用意ございます</p>
                                <p>email | admin@test.com</p>
                                <p>password | testtest</p>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Container>
                </Col>
                <NotificationSystem ref={this.notificationSystem} />
            </div>
        );
    }
}

export default Auth;
