import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table } from "react-bootstrap";
import Main from "./components/Main";
import SaleForm from "./components/SaleForm ";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import axios from "axios";

class Index extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <Link to="/">Home</Link>
                    <Link to="/form">Form</Link>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/form" component={SaleForm} />
                </Router>
            </div>
        );
    }
}

if (document.getElementById("example")) {
    ReactDOM.render(<Index />, document.getElementById("example"));
}
