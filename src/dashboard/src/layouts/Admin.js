import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {Container} from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import {checkingLogin} from "../action/index";

import routes from "routes.js";
import {connect} from "react-redux";

class Admin extends React.Component {
    componentDidMount() {
        const {checkingLogin} = this.props;
        checkingLogin();
    }

    componentDidUpdate(e) {
        // document.documentElement.scrollTop = 0;
        // document.scrollingElement.scrollTop = 0;
        // this.refs.mainContent.scrollTop = 0;
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    getBrandText = path => {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path
                ) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    render() {
        const {loggedChecking, redirectToLogin} = this.props;
        if (redirectToLogin === true) {
            window.location.href = '/auth/login';
        }
        return (
            <>
                {
                    loggedChecking ? <div className="mt-4 d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> :
                        <>
                            <Sidebar
                                {...this.props}
                                routes={routes}
                                logo={{
                                    innerLink: "/admin/index",
                                    imgSrc: require("assets/img/brand/argon-react.png"),
                                    imgAlt: "..."
                                }}
                            />
                            <div className="main-content" ref="mainContent">
                                <AdminNavbar
                                    {...this.props}
                                    brandText={this.getBrandText(this.props.location.pathname)}
                                />
                                <Switch>
                                    {this.getRoutes(routes)}
                                    <Redirect from="*" to="/admin/index"/>
                                </Switch>
                                <Container fluid>
                                    <AdminFooter/>
                                </Container>
                            </div>
                        </>
                }
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkingLogin: () => dispatch(checkingLogin())
    };
}

function mapStateToProps(state) {
    return {
        appLogged: state.getIn(['mainReducer', 'app', 'logged']),
        loggedChecking: state.getIn(['mainReducer', 'app', 'loggedChecking']),
        redirectToLogin: state.getIn(['mainReducer', 'app', 'redirectToLogin'])
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);
