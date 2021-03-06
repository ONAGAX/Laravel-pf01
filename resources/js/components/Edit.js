import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Col, Button } from "react-bootstrap";
import { Link, Route, Redirect } from "react-router-dom";
import axios from "axios";

class Edit extends Component {
    constructor() {
        super();
        this.state = {
            edit: false,
            edit_sales: [],
            sales: {
                price: "",
                tax: "",
                goal: "",
                lunch: "",
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
            });
    }

    changeState() {
        const dis = this.state;
        // 冗長すぎる、mapで回す方法を考える
        dis.p_food ? dis.p_food : (dis.p_food = dis.sales.payables.food);
        dis.p_drink ? dis.p_drink : (dis.p_drink = dis.sales.payables.drink);
        dis.s_cash ? dis.s_cash : (dis.s_cash = dis.sales.sale_deposits.cash);
        dis.s_card ? dis.s_card : (dis.s_card = dis.sales.sale_deposits.card);
        dis.s_receivable
            ? dis.s_receivable
            : (dis.s_receivable = dis.sales.sale_deposits.receivable);
        dis.price ? dis.price : (dis.price = dis.sales.price);
        dis.tax ? dis.tax : (dis.tax = dis.sales.tax);
        dis.goal ? dis.goal : (dis.goal = dis.sales.goal);
        dis.lunch ? dis.lunch : (dis.lunch = dis.sales.lunch);
        dis.lunchGroup
            ? dis.lunchGroup
            : (dis.lunchGroup = dis.sales.lunchGroup);
        dis.lunchPeople
            ? dis.lunchPeople
            : (dis.lunchPeople = dis.sales.lunchPeople);
        dis.dinner ? dis.dinner : (dis.dinner = dis.sales.dinner);
        dis.dinnerGroup
            ? dis.dinnerGroup
            : (dis.dinnerGroup = dis.sales.dinnerGroup);
        dis.dinnerPeople
            ? dis.dinnerPeople
            : (dis.dinnerPeople = dis.sales.dinnerPeople);
        dis.party ? dis.party : (dis.party = dis.sales.party);
        dis.partyGroup
            ? dis.partyGroup
            : (dis.partyGroup = dis.sales.partyGroup);
        dis.partyPeople
            ? dis.partyPeople
            : (dis.partyPeople = dis.sales.partyPeople);
        dis.food ? dis.food : (dis.food = dis.sales.food);
        dis.drink ? dis.drink : (dis.drink = dis.sales.drink);
        dis.charge ? dis.chager : (dis.charge = dis.sales.charge);
        dis.dt ? dis.dt : (dis.dt = dis.sales.dt);

        let set_sales = {
            sale_deposits: {
                cash: dis.s_cash,
                card: dis.s_card,
                receivable: dis.s_receivable
            },
            payables: {
                food: dis.p_food,
                drink: dis.p_drink
            },
            expenses: {
                personal: dis.sales.expenses.personal
            },
            price: this.state.price,
            tax: this.state.tax,
            goal: this.state.goal,
            lunch: this.state.lunch,
            lunchGroup: this.state.lunchGroup,
            lunchPeople: this.state.lunchPeople,
            dinner: this.state.dinner,
            dinnerGroup: this.state.dinnerGroup,
            dinnerPeople: this.state.dinnerPeople,
            party: this.state.party,
            partyGroup: this.state.partyGroup,
            partyPeople: this.state.partyPeople,
            food: this.state.food,
            drink: this.state.drink,
            charge: this.state.charge,
            dt: this.state.dt
        };
        this.setState({ sales: set_sales });
    }

    userTyping(type, e) {
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

    render() {
        // 日付(YYYY-MM-DD)分解結合
        const dates = this.state.sales.dt.split("-").join("");
        const { validated } = this.state;
        const { sales } = this.state;
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <h4>再編集モード [{sales.dt}]</h4>
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
                                disabled="disabled"
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
                                defaultValue={sales.lunch}
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
            </div>
        );
    }
}

export default Edit;
