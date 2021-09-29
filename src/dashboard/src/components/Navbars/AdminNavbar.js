
import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import {logout} from "../../action";
import {connect} from "react-redux";

class AdminNavbar extends React.Component {

  logout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { redirectToLogin } = this.props;
    if (redirectToLogin === true) {
      window.location.href = '/auth/login';
    }
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {firstName}{lastName}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/test-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

function mapStateToProps(state) {
  return {
    redirectToLogin: state.getIn(['mainReducer', 'app', 'redirectToLogin']),
    firstName: state.getIn(['mainReducer', 'app','data','firstName']),
    lastName: state.getIn(['mainReducer', 'app','data','lastName'])
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminNavbar);

