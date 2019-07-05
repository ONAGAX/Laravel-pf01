import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Navbar, Nav } from "react-bootstrap";
import Main from "./components/Main";
import SaleForm from "./components/SaleForm ";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import axios from "axios";

class Index extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand>売上日報アプリ</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Link to="/">Home</Link>
                            <Nav.Link />
                            <Link to="/form">日報入力</Link>
                        </Nav>
                    </Navbar>
                    {/* <Router> */}
                    {/* <Link to="/">Home</Link>
                    <Link to="/form">Form</Link> */}
                    <Route exact path="/" component={Main} />
                    <Route exact path="/form" component={SaleForm} />
                    <Route exact path="/sale/:id" component={Detail} />
                    <Route exact path="/sale/:id/edit" component={Edit} />
                </Router>
            </div>
        );
    }
}

if (document.getElementById("example")) {
    ReactDOM.render(<Index />, document.getElementById("example"));
}
