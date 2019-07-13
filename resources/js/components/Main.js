import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table } from "react-bootstrap";
import SaleTable from "./SaleTable";

import { Router, Link } from "react-router-dom";
import axios from "axios";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            sales: [],
            dt: "2019-06"
        };
    }
    componentDidMount() {
        axios
            .post("/api/search/", this.state)
            .then(res => {
                this.setState({ sales: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }
    async handleSelectMonth(e) {
        await this.setState({ dt: e });
        axios
            .post("/api/search/", this.state)
            .then(res => {
                this.setState({ sales: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <SaleTable
                    data={this.state.sales}
                    handleSelect={e => {
                        this.handleSelectMonth(e);
                    }}
                />
            </div>
        );
    }
}

export default Main;
