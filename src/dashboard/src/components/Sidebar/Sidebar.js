import React from "react";
import {NavLink as NavLinkRRD, Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import {
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col
} from "reactstrap";
import {logout} from "../../action";
import {connect} from "react-redux";

class Sidebar extends React.Component {
    state = {
        collapseOpen: false
    };

    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
    }

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    // toggles collapse between opened and closed (true/false)
    toggleCollapse = () => {
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    // closes the collapse
    closeCollapse = () => {
        this.setState({
            collapseOpen: false
        });
    };
    // creates the links that appear in the left menu / Sidebar
    createLinks = routes => {
        return routes.map((prop, key) => {
            if (prop.displayMenu === 1) {
                return (
                    <NavItem key={key}>
                        <NavLink
                            to={prop.layout + prop.path}
                            tag={NavLinkRRD}
                            onClick={this.closeCollapse}
                            activeClassName="active"
                        >
                            <i className={prop.icon}/>
                            {prop.name}
                        </NavLink>
                    </NavItem>
                );
            }
            return <div key={key}/>;
        });
    };

    logout = () => {
        const {logout} = this.props;
        logout();
    };

    render() {
        const {routes, logo} = this.props;
        let navbarBrandProps;
        if (logo && logo.innerLink) {
            navbarBrandProps = {
                to: logo.innerLink,
                tag: Link
            };
        } else if (logo && logo.outterLink) {
            navbarBrandProps = {
                href: logo.outterLink,
                target: "_blank"
            };
        }
        return (
            <Navbar
                className="navbar-vertical fixed-left navbar-light bg-white"
                expand="md"
                id="sidenav-main"
            >
                <Container fluid>
                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={this.toggleCollapse}
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    {/* Brand */}
                    {logo ? (
                        <NavbarBrand className="pt-0" {...navbarBrandProps}>
                            <h2>Lof POS</h2>
                        </NavbarBrand>
                    ) : null}
                    {/* User */}
                    <Nav className="align-items-center d-md-none">
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav className="nav-link-icon">
                                <i className="ni ni-bell-55"/>
                            </DropdownToggle>
                            <DropdownMenu
                                aria-labelledby="navbar-default_dropdown_1"
                                className="dropdown-menu-arrow"
                                right
                            >
                                <DropdownItem>Settings</DropdownItem>
                                <DropdownItem data-id="logout-mobile" onClick={this.logout}>Logout</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <Media className="align-items-center">
                                    <Media className="ml-2 d-none d-lg-block">
                                      <span className="mb-0 text-sm font-weight-bold">
                                        Jessica Jones
                                      </span>
                                    </Media>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem className="noti-title" header tag="div">
                                    <h6 className="text-overflow m-0">Welcome!</h6>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile" tag={Link}>
                                    <i className="ni ni-single-02"/>
                                    <span>Settings</span>
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem onClick={this.logout}>
                                    <i className="ni ni-user-run"/>
                                    <span>Logout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    {/* Collapse */}
                    <Collapse navbar isOpen={this.state.collapseOpen}>
                        {/* Collapse header */}
                        <div className="navbar-collapse-header d-md-none">
                            <Row>
                                {logo ? (
                                    <Col className="collapse-brand" xs="6">
                                        <h2>Lof POS</h2>
                                    </Col>
                                ) : null}
                                <Col className="collapse-close" xs="6">
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        onClick={this.toggleCollapse}
                                    >
                                        <span/>
                                        <span/>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        {/* Form */}
                        <Form className="mt-4 mb-3 d-md-none">
                            <InputGroup className="input-group-rounded input-group-merge">
                                <Input
                                    aria-label="Search"
                                    className="form-control-rounded form-control-prepended"
                                    placeholder="Search"
                                    type="search"
                                />
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <span className="fa fa-search"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                        <Nav navbar>{this.createLinks(routes)}</Nav>
                        <hr className="my-3"/>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

Sidebar.defaultProps = {
    routes: [{}]
};

Sidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired
    })
};

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Sidebar);


