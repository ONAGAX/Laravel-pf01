import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Modal, Button, Table, Row } from "react-bootstrap";
import NotificationSystem from "react-notification-system";
import { Redirect } from "react-router-dom";
import styles from "./styles.scss";
import axios from "axios";

class Main extends Component {
    constructor(props) {
        super(props);
        this.notificationSystem = React.createRef();
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            edit: false,
            redirect: false,
            sales: {
                price: "",
                tax: "",
                goal: "",
                lunch: "",
                lunch_group: "",
                lunch_people: "",
                dinner: "",
                dinner_group: "",
                dinner_people: "",
                party: "",
                party_group: "",
                party_people: "",
                food: "",
                drink: "",
                charge: "",
                dt: "",
                sale_deposits: {
                    cash: "",
                    card: "",
                    receivable: ""
                },
                s_cash: "",
                s_card: "",
                s_recevable: "",
                payables: {
                    food: "",
                    drink: ""
                },
                p_food: "",
                p_drink: "",
                expenses: {
                    personal: ""
                }
            }
        };
    }

    componentDidMount() {
        axios
            .get("/api/sale/" + this.props.match.params.id)
            .then(res => {
                this.setState({ sales: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    changeState() {
        this.setState({ edit: true });
    }

    deleteObject() {
        axios
            .delete("/api/sale/" + this.props.match.params.id)
            .then(res => {
                this.setState({ redirect: true });
            })
            .catch(err => {
                console.log(err);
                this.addNotification(2);
            });
    }

    addNotification(num) {
        const notification = this.notificationSystem.current;
        if (num == 1) {
            notification.addNotification({
                position: "bc",
                autoDismiss: 10,
                level: "warning",
                children: (
                    <div>
                        <h6 style={{ textAlign: "center", fontWeight: "bold" }}>
                            消去してもよろしいですか？
                        </h6>
                        <Row className="justify-content-md-center">
                            <Button
                                variant="secondary"
                                onClick={this.deleteObject.bind(this)}
                            >
                                消去する
                            </Button>
                        </Row>
                    </div>
                )
            });
        } else if (num == 2) {
            notification.addNotification({
                position: "tc",
                title: "Deleteエラー",
                message: "消去できませんでした",
                level: "error"
            });
        }
    }

    render() {
        const { sales } = this.state;
        if (this.state.edit) {
            return (
                <Redirect
                    to={"/sale/" + this.props.match.params.id + "/edit"}
                />
            );
        } else if (this.state.redirect) {
            return <Redirect to={"/"} />;
        } else {
            return (
                <div className="Detail">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>{sales.dt}の日報詳細</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th>税込売上</th>
                                        <th>税金</th>
                                        <th>税込売上</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>日計</td>
                                        <td>
                                            ¥
                                            {(
                                                sales.price + sales.tax
                                            ).toLocaleString()}
                                        </td>
                                        <td>
                                            ¥{(sales.tax + 0).toLocaleString()}
                                        </td>
                                        <td>
                                            ¥
                                            {(sales.price + 0).toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th>売上目標</th>
                                        <th>日計比較</th>
                                        <th>累計　　</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>目標</td>
                                        <td>
                                            ¥{(sales.goal + 0).toLocaleString()}
                                        </td>
                                        <td>
                                            ¥
                                            {(
                                                sales.price - sales.goal
                                            ).toLocaleString()}
                                        </td>
                                        <td>///</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th>FOOD原価</th>
                                        <th>DRINK原価</th>
                                        <th>人件費率</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>原価</td>
                                        <td>
                                            {Math.round(
                                                (sales.payables.food /
                                                    sales.price) *
                                                    100
                                            )}
                                            %
                                        </td>
                                        <td>
                                            {Math.round(
                                                (sales.payables.drink /
                                                    sales.price) *
                                                    100
                                            )}
                                            %
                                        </td>
                                        <td>
                                            {Math.round(
                                                (sales.expenses.personal /
                                                    sales.price) *
                                                    100
                                            )}
                                            %
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th>売上</th>
                                        <th>客単価</th>
                                        <th>人数　　</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lunch</td>
                                        <td>
                                            ¥
                                            {(sales.lunch + 0).toLocaleString()}
                                        </td>
                                        <td>
                                            ¥
                                            {Math.round(
                                                sales.lunch / sales.lunchPeople
                                            ).toLocaleString()}
                                        </td>
                                        <td>{sales.lunchPeople}人</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th>売上</th>
                                        <th>客単価</th>
                                        <th>人数　　</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Dinner</td>
                                        <td>
                                            ¥
                                            {(
                                                sales.dinner + 0
                                            ).toLocaleString()}
                                        </td>
                                        <td>
                                            ¥
                                            {Math.round(
                                                sales.dinner /
                                                    sales.dinnerPeople
                                            ).toLocaleString()}
                                        </td>
                                        <td>{sales.dinnerPeople}人</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={e => {
                                    this.addNotification(1);
                                }}
                            >
                                消去する
                            </Button>
                            <Button
                                variant="primary"
                                onClick={this.changeState.bind(this)}
                            >
                                再編集する
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    <NotificationSystem ref={this.notificationSystem} />
                </div>
            );
        }
    }
}

export default Main;
