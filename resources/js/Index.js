import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Navbar, Nav, Button } from "react-bootstrap";
import Main from "./components/Main";
import SaleForm from "./components/SaleForm ";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import Auth from "./components/Auth";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Axios from "axios";

class Index extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: false,
            currentUser: []
        };
    }

    getState(ele) {
        this.setState({ currentUser: ele, isLogin: true });
    }
    handleLogout() {
        Axios.post("/api/logout")
            .then(res => {
                Axios.defaults.headers.common["Authorization"] = "";
                this.setState({ isLogin: false });
            })
            .catch(err => {
                console.log(err);
            });
    }
    ImportWindowOpen() {
        window.open("sales", "window1", "width=300,height=150,scrollbars=1");
    }

    render() {
        let routeHtml;
        if (this.state.isLogin === true) {
            routeHtml = (
                <div>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand>売上日報アプリ</Navbar.Brand>
                        <span>
                            {" "}
                            {this.state.currentUser.name}
                            さんでログイン中　　
                        </span>
                        <Nav className="mr-auto">
                            <Link to="/">一覧</Link>
                            <Nav.Link />
                            <Link to="/form">入力</Link>
                            <Nav.Link />
                            <Link
                                to=""
                                onClick={e => {
                                    this.ImportWindowOpen(e);
                                }}
                            >
                                CSV
                            </Link>
                        </Nav>
                        <Button
                            variant="default"
                            onClick={e => {
                                this.handleLogout();
                            }}
                        >
                            ログアウト
                        </Button>
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
                        <Navbar.Brand>売上日報アプリ</Navbar.Brand>
                        <span> (未ログイン)</span>
                    </Navbar>
                    <Auth
                        handleGetState={e => {
                            this.getState(e);
                        }}
                    />
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
