import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Form, Col, Button } from "react-bootstrap";
import { Router, Link } from "react-router-dom";

class SaleTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
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
                    {this.props.list.map(ele => (
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
