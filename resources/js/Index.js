import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Navbar, Nav } from "react-bootstrap";
import Main from "./components/Main";
import SaleForm from "./components/SaleForm ";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import Auth from "./components/Auth";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import axios from "axios";

class Index extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: false
        };
    }
    render() {
        let routeHtml;
        if (this.state.isLogin === true) {
            routeHtml = (
                <div>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand>売上日報アプリ</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Link to="/">Home</Link>
                            <Nav.Link />
                            <Link to="/form">日報入力</Link>
                        </Nav>
                    </Navbar>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/form" component={SaleForm} />
                    <Route exact path="/sale/:id" component={Detail} />
                    <Route exact path="/sale/:id/edit" component={Edit} />
                </div>
            );
        } else {
            routeHtml = (
                <div>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand>売上日報アプリ (未ログイン)</Navbar.Brand>
                    </Navbar>
                    <Route exact path="/" component={Auth} />
                </div>
            );
        }
        return (
            <div className="container">
                <Router>{routeHtml}</Router>
            </div>
        );
    }
}

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}
