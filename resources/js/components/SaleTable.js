import React, { Component } from "react";
import ReactDOM from "react-dom";
import TableList from "./TableList";
import { Table, Form, Col, Button } from "react-bootstrap";
import { Router, Link } from "react-router-dom";

class SaleTable extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            isOrder: false,
            select: false,
            data: []
        };
    }

    handleSortByAsc() {
        if (this.state.select) {
            const line = this.state.data.sort((a, b) => {
                if (a.dt < b.dt) return -1;
                if (a.dt > b.dt) return 1;
                return 0;
            });
            this.setState({ data: line });
        } else {
            const line = this.props.data.sort((a, b) => {
                if (a.dt < b.dt) return -1;
                if (a.dt > b.dt) return 1;
                return 0;
            });
            this.setState({ data: line });
        }
        this.setState({ select: true });
        this.handleReverce();
    }
    handleSortByDesc() {
        if (this.state.select) {
            const line = this.state.data.sort((a, b) => {
                if (a.dt < b.dt) return 1;
                if (a.dt > b.dt) return -1;
                return 0;
            });
            this.setState({ data: line });
        } else {
            const line = this.props.data.sort((a, b) => {
                if (a.dt < b.dt) return 1;
                if (a.dt > b.dt) return -1;
                return 0;
            });
            this.setState({ data: line });
        }
        this.setState({ select: true });
        this.handleReverce();
    }
    handleFilter(e) {
        const line = this.props.data.filter(item => {
            const date = item.dt.split("-").join("");
            if (date.indexOf(e) > -1) {
                return true;
            }
        });
        this.setState({ data: line });
        this.setState({ select: true });
    }
    handleClear() {
        this.form.current.reset();
        this.setState({ data: this.props.data });
    }
    handleReverce() {
        this.setState({ isOrder: !this.state.isOrder });
    }

    render() {
        let list;
        if (this.state.select) {
            list = this.state.data.map(data => {
                return data;
            });
        } else {
            list = this.props.data.map(data => {
                return data;
            });
        }
        let orderHtml;
        if (this.state.isOrder) {
            orderHtml = (
                <Button
                    style={{ marginLeft: "15px" }}
                    variant="outline-success"
                    onClick={e => {
                        this.handleSortByAsc();
                    }}
                >
                    降順 ▼
                </Button>
            );
        } else {
            orderHtml = (
                <Button
                    style={{ marginLeft: "15px" }}
                    variant="outline-success"
                    onClick={e => {
                        this.handleSortByDesc();
                    }}
                >
                    昇順 ▲
                </Button>
            );
        }

        return (
            <div>
                <Form ref={this.form}>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>日付検索</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            onChange={e => {
                                this.handleFilter(e.target.value);
                            }}
                            placeholder="例)20190501"
                        />
                    </Form.Group>

                    {orderHtml}
                    <Button
                        style={{ marginLeft: "10px" }}
                        variant="outline-secondary"
                        onClick={e => {
                            this.handleClear();
                        }}
                    >
                        クリア
                    </Button>
                </Form>
                <br />
                <TableList list={list} />
            </div>
        );
    }
}

export default SaleTable;
