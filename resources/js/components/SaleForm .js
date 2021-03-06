import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Col, Button } from "react-bootstrap";
import { Link, Route, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import axios from "axios";

class SaleForm extends Component {
    constructor() {
        super();
        this.notificationSystem = React.createRef();
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            redirect: false,
            validated: false,
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
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true });
        await this.changeState();
        axios
            .post("/api/sale", this.state)
            .then(() => this.setState({ redirect: true }))
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
        switch (type) {
            case "dt":
                this.setState({ dt: e.target.value });
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
                this.setState({ lunch: e.target.value });
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

    handleOnInput(e, n) {
        if (e.target.value.length > n) {
            e.target.value = e.target.value.slice(0, n);
        }
    }

    addNotification(num) {
        const notification = this.notificationSystem.current;
        switch (num) {
            case 1:
                notification.addNotification({
                    position: "tc",
                    title: "保存エラー",
                    message:
                        "データーベースに保存できませんでした(日付を確認してください)",
                    level: "error"
                });
                return;
        }
    }

    render() {
        const { validated } = this.state;
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <h4>売上日報入力</h4>
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
                                onInput={e => {
                                    this.handleOnInput(e, 8);
                                }}
                                type="number"
                                onChange={e => {
                                    this.userTyping("dt", e);
                                }}
                                placeholder="例) 20190809"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("price", e);
                                }}
                                placeholder="税込み売上"
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
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("tax", e);
                                }}
                                placeholder="消費税8％"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("cash", e);
                                }}
                                placeholder="銀行振込現金"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("card", e);
                                }}
                                placeholder="カード(UC/DC/AMEX)"
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
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("receivable", e);
                                }}
                                placeholder="ポイント等"
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
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("goal", e);
                                }}
                                placeholder="本日の売上目標予算"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("lunch", e);
                                }}
                                placeholder="ランチ売上"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("lunch_group", e);
                                }}
                                placeholder=""
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
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("lunch_people", e);
                                }}
                                placeholder=""
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("cafe", e);
                                }}
                                placeholder="カフェ売上"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("cafe_group", e);
                                }}
                                placeholder=""
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
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("cafe_people", e);
                                }}
                                placeholder=""
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("dinner", e);
                                }}
                                placeholder="ディナー売上"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("dinner_group", e);
                                }}
                                placeholder=""
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
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("dinner_people", e);
                                }}
                                placeholder=""
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("food", e);
                                }}
                                placeholder="FOOD売上金額"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("drink", e);
                                }}
                                placeholder="DRINK売上金額"
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
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("charge", e);
                                }}
                                placeholder="チャージ売上金額"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("p_food", e);
                                }}
                                placeholder="本日の食材費仕入れ額"
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
                                type="number"
                                onChange={e => {
                                    this.userTyping("p_drink", e);
                                }}
                                placeholder="本日の酒飲料仕入れ額"
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
                                disable="disable"
                                type="number"
                                onChange={e => {
                                    this.userTyping("e_personal", e);
                                }}
                                placeholder="本日の人件費用"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button
                        type="submit"
                        className="btn btn-primary w-100 mt-2"
                    >
                        日報送信
                    </Button>
                </Form>
                <NotificationSystem ref={this.notificationSystem} />
            </div>
        );
    }
}

export default SaleForm;
