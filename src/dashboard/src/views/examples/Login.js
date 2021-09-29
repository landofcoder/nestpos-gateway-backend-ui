import React from "react";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import { login } from '../../action/index';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../constants/function-constants';
import { Redirect } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, Container
} from "reactstrap";

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    rememberLogin: true
  };

  emailChange = e => {
    this.setState({email: e.target.value});
  }

  passwordChange = e => {
    this.setState({password: e.target.value});
  };

  rememberPasswordChange = e => {
    this.setState({rememberLogin: e.target.checked});
  };

  loginAction = (event) => {
    event.preventDefault();
    const { login } = this.props;
    const { email, password, rememberLogin } = this.state;
    login({email, password, rememberLogin});
  };

  render() {
    const { email, password, rememberLogin } = this.state;
    let disabled = true;
    if(email && password) {
      disabled = false;
    }
    const { loginStatus, loginBtnLoading } = this.props;
    if(loginStatus === LOGIN_SUCCESS) {
      return <Redirect to="/" push/>
    }
    return (
      <>
        <Col lg="5" md="7">
          <Container>
            <div className="header-body text-center mb-5">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Login</h1>
                </Col>
              </Row>
            </div>
          </Container>
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <form role="form" onSubmit={this.loginAction}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.emailChange} placeholder="Email" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.passwordChange} placeholder="Password" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                {
                  loginStatus === LOGIN_FAILURE ? <FormGroup>
                    <span className="text-danger"><small>Email or password not found</small></span>
                  </FormGroup> : <></>
                }
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="customCheckLogin"
                    type="checkbox"
                    checked={rememberLogin}
                    onChange={this.rememberPasswordChange}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button disabled={disabled} className="my-4" color="primary" type="submit">
                    {
                      loginBtnLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : <></>
                    }
                    Sign in
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <Link to="/auth/forgot-password" className="text-light">
                <small>Forgot password?</small>
              </Link>
            </Col>
            <Col className="text-right" xs="6">
              <Link to="/auth/register" className="text-light">
                <small>Create new account</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: payload => dispatch(login(payload))
  };
}

function mapStateToProps(state) {
  return {
    loginStatus: state.getIn(['mainReducer', 'login', 'status']),
    loginBtnLoading: state.getIn(['mainReducer', 'login', 'btnLoading'])
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
