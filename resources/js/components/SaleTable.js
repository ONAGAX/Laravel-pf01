import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Form, Col, Button } from "react-bootstrap";
import { Router, Link } from "react-router-dom";

class SaleTable extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
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
                    <Button
                        style={{ marginLeft: "15px" }}
                        variant="primary"
                        onClick={e => {
                            this.handleSortByAsc();
                        }}
                    >
                        降順
                    </Button>
                    <Button
                        style={{ marginLeft: "10px" }}
                        variant="primary"
                        onClick={e => {
                            this.handleSortByDesc();
                        }}
                    >
                        昇順
                    </Button>
                    <Button
                        style={{ marginLeft: "10px" }}
                        variant="success"
                        onClick={e => {
                            this.handleClear();
                        }}
                    >
                        クリア
                    </Button>
                </Form>
                <br />
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> </th>
                            <th>税込売上</th>
                            <th>売上目標</th>
                            <th>入金現金</th>
                            <th>売掛カード</th>
                            <th>FOOD原価</th>
                            <th>DRINK原価</th>
                            <th>人件費</th>
                            <th>ランチ</th>
                            <th>カフェ</th>
                            <th>ディナー</th>
                        </tr>
                    </thead>
                    {list.map(ele => (
                        <tbody key={ele.id}>
                            <tr>
                                <td>
                                    <Link to={"/sale/" + ele.id}>{ele.dt}</Link>
                                </td>
                                <td>
                                    ¥{(ele.price + ele.tax).toLocaleString()}
                                </td>
                                <td>{ele.goal.toLocaleString()}</td>
                                <td>
                                    {ele.sale_deposits.cash.toLocaleString()}
                                </td>
                                <td>
                                    {ele.sale_deposits.card.toLocaleString()}
                                </td>
                                <td>
                                    {Math.round(
                                        (ele.payables.food / ele.price) * 100
                                    )}
                                    %
                                </td>
                                <td>
                                    {Math.round(
                                        (ele.payables.drink / ele.price) * 100
                                    )}
                                    %
                                </td>
                                <td>
                                    {Math.round(
                                        (ele.expenses.personal / ele.price) *
                                            100
                                    )}
                                    %
                                </td>
                                <td>{ele.lunch.toLocaleString()}</td>
                                <td>{ele.party.toLocaleString()}</td>
                                <td>{ele.dinner.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>
        );
    }
}

export default SaleTable;
