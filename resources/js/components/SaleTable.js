import React, { Component } from "react";
import ReactDOM from "react-dom";
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
    handleSelectChange(e) {
        this.setState({ select: false });
        this.props.handleSelect(e.target.value);
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
                    variant="outline-success"
                    onClick={e => {
                        this.handleSortByDesc();
                    }}
                >
                    昇順 ▲
                </Button>
            );
        }
        const options = [
            "2019-01",
            "2019-02",
            "2019-03",
            "2019-04",
            "2019-05",
            "2019-06",
            "2019-07",
            "2019-08"
        ];
        let optionsHtml = options.map((ele, index) => (
            <option key={index} value={ele}>
                {ele}
            </option>
        ));

        return (
            <div>
                <Form ref={this.form}>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom01"
                        >
                            <Form.Label>日付検索</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                onChange={e => {
                                    this.handleFilter(e.target.value);
                                }}
                                placeholder="例)0501"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="formGridState">
                            <Form.Label>月を選択</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={e => {
                                    this.handleSelectChange(e);
                                }}
                            >
                                {optionsHtml}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    {orderHtml}
                    <Button
                        style={{ marginLeft: "15px" }}
                        variant="outline-secondary"
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
                                    {/* {ele.sale_deposits.cash.toLocaleString()} */}
                                    debug
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
