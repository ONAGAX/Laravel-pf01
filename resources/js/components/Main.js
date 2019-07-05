import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table } from "react-bootstrap";
import axios from "axios";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            sales: []
        };
    }

    componentDidMount() {
        axios
            .get("/api/sale")
            .then(res => {
                this.setState({ sales: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        console.log(this.state.sales);
        return (
            <div>
                <h2>売上日報アプリ</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> </th>
                            {/* <th>売上</th>
                            <th>税</th> */}
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
                    {this.state.sales.map(ele => (
                        <tbody>
                            <tr>
                                <td>{ele.dt}</td>
                                {/* <td>{ele.price.toLocaleString()}</td>
                                <td>{ele.tax.toLocaleString()}</td> */}
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

export default Main;
