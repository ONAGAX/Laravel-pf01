import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Col, Button } from "react-bootstrap";
import { Link, Route, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import axios from "axios";

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.notificationSystem = React.createRef();
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            validated: false,
            sales: {
                price: "",
                tax: "",
                goal: "",
                lunch: "66666",
                lunchGroup: "",
                lunchPeople: "",
                dinner: "",
                dinnerGroup: "",
                dinnerPeople: "",
                party: "",
                partyGroup: "",
                partyPeople: "",
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

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }
        this.setState({ validated: true });
        await this.changeState();
        axios
            .put("/api/sale/" + this.props.match.params.id, this.state.sales)
            .then(res => {
                this.setState({ redirect: true });
            })
            .catch(err => {
                console.log(err);
                this.addNotification(1);
            });
    }

    changeState() {
        let set_deposits = {
            cash: this.state.s_cash,
            card: this.state.s_card,
            receivable: this.state.s_receivable
        };
        let set_payables = {
            food: this.state.p_food,
            drink: this.state.p_drink
        };
        this.setState({ sale_deposits: set_deposits });
        this.setState({ payables: set_payables });
    }

    userTyping(type, e) {
        console.log(this.state);
        let name = e.target.name;
        switch (type) {
            case "dt":
                this.setState({ dt: this.state.sales.dt });
                return;
            case "price":
                this.setState({ price: e.target.value });
                return;
            case "tax":
                this.setState({ tax: e.target.value });
                return;
            case "cash":
                this.setState({ s_cash: e.target.value });
                return;
            case "card":
                this.setState({ s_card: e.target.value });
                return;
            case "receivable":
                this.setState({ s_receivable: e.target.value });
                return;
            case "goal":
                this.setState({ goal: e.target.value });
                return;
            case "lunch":
                this.setState({ [name]: e.target.value });
                return;
            case "lunch_group":
                this.setState({ lunchGroup: e.target.value });
                return;
            case "lunch_people":
                this.setState({ lunchPeople: e.target.value });
                return;
            case "cafe":
                this.setState({ party: e.target.value });
                return;
            case "cafe_group":
                this.setState({ partyGroup: e.target.value });
                return;
            case "cafe_people":
                this.setState({ partyPeople: e.target.value });
                return;
            case "dinner":
                this.setState({ dinner: e.target.value });
                return;
            case "dinner_group":
                this.setState({ dinnerGroup: e.target.value });
                return;
            case "dinner_people":
                this.setState({ dinnerPeople: e.target.value });
                return;
            case "food":
                this.setState({ food: e.target.value });
                return;
            case "drink":
                this.setState({ drink: e.target.value });
                return;
            case "charge":
                this.setState({ charge: e.target.value });
                return;
            case "p_food":
                this.setState({ p_food: e.target.value });
                return;
            case "p_drink":
                this.setState({ p_drink: e.target.value });
                return;
            case "e_personal":
                this.setState({ expenses: { personal: e.target.value } });
                return;
            default:
                return;
        }
    }

    addNotification(num) {
        const notification = this.notificationSystem.current;
        switch (num) {
            case 1:
                notification.addNotification({
                    position: "tc",
                    title: "保存エラー",
                    message: "データーベースに保存できませんでした",
                    level: "error"
                });
                return;
        }
    }

    render() {
        const dates = this.props.sales.dt.split("-").join("");
        const { validated } = this.state;
        const { sales } = this.props;
        return (
            <div>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={e => this.handleSubmit(e)}
                >
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom01"
                        >
                            <Form.Label>日付</Form.Label>
                            <Form.Control
                                required
                                value={dates}
                                type="number"
                                onChange={e => {
                                    this.userTyping("dt", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom02"
                        >
                            <Form.Label>売上金合計</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.price}
                                type="number"
                                onChange={e => {
                                    this.userTyping("price", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom03"
                        >
                            <Form.Label>消費税</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.tax}
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("tax", e);
                                }}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom01"
                        >
                            <Form.Label>現金</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.sale_deposits.cash}
                                type="number"
                                onChange={e => {
                                    this.userTyping("cash", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                        >
                            <Form.Label>カード</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.sale_deposits.card}
                                type="number"
                                onChange={e => {
                                    this.userTyping("card", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom03"
                        >
                            <Form.Label>売掛</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.sale_deposits.receivable}
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("receivable", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom03"
                        >
                            <Form.Label>売上目標予算</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.goal}
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("goal", e);
                                }}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md="2"
                            controlId="validationCustom01"
                        >
                            <Form.Label>Lunch売上</Form.Label>
                            <Form.Control
                                required
                                name="lunch"
                                value={this.state.lunch}
                                type="number"
                                onChange={e => {
                                    this.userTyping("lunch", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="1"
                            controlId="validationCustom02"
                        >
                            <Form.Label>L組数</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.lunchGroup}
                                type="number"
                                onChange={e => {
                                    this.userTyping("lunch_group", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="1"
                            controlId="validationCustom03"
                        >
                            <Form.Label>L人数</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.lunchPeople}
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("lunch_people", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="2"
                            controlId="validationCustom01"
                        >
                            <Form.Label>Cafe売上</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.party}
                                type="number"
                                onChange={e => {
                                    this.userTyping("cafe", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="1"
                            controlId="validationCustom02"
                        >
                            <Form.Label>C組数</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.partyGroup}
                                type="number"
                                onChange={e => {
                                    this.userTyping("cafe_group", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="1"
                            controlId="validationCustom03"
                        >
                            <Form.Label>C人数</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.partyPeople}
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("cafe_people", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="2"
                            controlId="validationCustom01"
                        >
                            <Form.Label>Dinner売上</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.dinner}
                                type="number"
                                onChange={e => {
                                    this.userTyping("dinner", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="1"
                            controlId="validationCustom02"
                        >
                            <Form.Label>D組数</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.dinnerGroup}
                                type="number"
                                onChange={e => {
                                    this.userTyping("dinner_group", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="1"
                            controlId="validationCustom03"
                        >
                            <Form.Label>D人数</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.dinnerPeople}
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("dinner_people", e);
                                }}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom01"
                        >
                            <Form.Label>FOOD売上</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.food}
                                type="number"
                                onChange={e => {
                                    this.userTyping("food", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom02"
                        >
                            <Form.Label>DRINK売上</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.drink}
                                type="number"
                                onChange={e => {
                                    this.userTyping("drink", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom03"
                        >
                            <Form.Label>チャージ金額</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.charge}
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("charge", e);
                                }}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom01"
                        >
                            <Form.Label>食材費仕入額</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.payables.food}
                                type="number"
                                onChange={e => {
                                    this.userTyping("p_food", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom02"
                        >
                            <Form.Label>酒飲料仕入額</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.payables.drink}
                                type="number"
                                onChange={e => {
                                    this.userTyping("p_drink", e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom03"
                        >
                            <Form.Label>人件費用</Form.Label>
                            <Form.Control
                                required
                                defaultValue={sales.expenses.personal}
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("e_personal", e);
                                }}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button
                        type="submit"
                        className="btn btn-warning w-100 mt-2"
                    >
                        編集する
                    </Button>
                </Form>
                <NotificationSystem ref={this.notificationSystem} />
            </div>
        );
    }
}

export default EditForm;
