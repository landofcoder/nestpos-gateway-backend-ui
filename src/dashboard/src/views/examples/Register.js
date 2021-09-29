import React from "react";
import {connect} from "react-redux";
import {Link, Redirect} from 'react-router-dom';
import {createAccount} from '../../action/index';
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col, Row, Container
} from "reactstrap";
import {EMAIL_FAILURE, LOGIN_SUCCESS} from "../../constants/function-constants";


class Register extends React.Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''
    };
    onFirstNameChange = e => {
        this.setState({firstName: e.target.value});
    }
    onLastNameChange = e => {
        this.setState({lastName: e.target.value});
    }
    onEmailChange = e => {
        this.setState({email: e.target.value});
    }
    onPasswordChange = e => {
        this.setState({password: e.target.value});
    }
    onConfirmPasswordChange = e => {
        this.setState({confirmPassword: e.target.value});
    }
    createAccountEvent = (event) => {
        event.preventDefault();
        const {createAccount} = this.props;
        const {email, password, firstName, lastName} = this.state;
        createAccount({firstName, lastName, email, password});
    }


    render() {
        const {email, password, firstName, lastName, confirmPassword} = this.state;
        let passwordConfirm = true;
        let disabled = null;
        if (email && password && firstName && lastName && confirmPassword) {
            disabled = false;
            if (this.state.password !== this.state.confirmPassword) {
                passwordConfirm = false
                disabled = true;
            } else {
                disabled = false;
            }
        } else {
            disabled = true
        }

        const {loginStatus, emailStatus, signUpBtnLoading} = this.props;
        if (loginStatus === LOGIN_SUCCESS) {
            return <Redirect to="/" push/>
        }
        return (
            <>
                <Col lg="6" md="8">
                    <Container>
                        <div className="header-body text-center mb-5">
                            <Row className="justify-content-center">
                                <Col lg="5" md="6">
                                    <h1 className="text-white">Register</h1>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form" onSubmit={this.createAccountEvent}>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-hat-3"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input onChange={this.onFirstNameChange} placeholder="First name" type="text"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-hat-3"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input onChange={this.onLastNameChange} placeholder="Last name" type="text"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input onChange={this.onEmailChange} placeholder="Email" type="email"
                                               autoComplete="new-email"/>
                                    </InputGroup>
                                </FormGroup>
                                {
                                    emailStatus === EMAIL_FAILURE ? <FormGroup>
                                        <span className="text-danger"><small>Email already exists </small></span>
                                    </FormGroup> : <></>
                                }
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input onChange={this.onPasswordChange} placeholder="Password" type="password"
                                               autoComplete="new-password"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input onChange={this.onConfirmPasswordChange} placeholder="Confirm password"
                                               type="password"
                                               autoComplete="new-password"/>
                                    </InputGroup>
                                </FormGroup>
                                {
                                    passwordConfirm === false ? <FormGroup>
                                        <span
                                            className="text-danger"><small> Password confirm doesn't match</small></span>
                                    </FormGroup> : <></>
                                }
                                <div className="text-center">
                                    <Button disabled={disabled} className="mt-4" color="primary" type="submit">
                                        {
                                            signUpBtnLoading ?
                                                <span className="spinner-border spinner-border-sm " role="status"
                                                      aria-hidden="true"/> : <></>
                                        }
                                        Create account
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col xs="12">
                            <small>Already have an account?&nbsp;</small>
                            <Link to="/auth/login" className="text-light">
                                <small>Log In</small>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}

const mapStateToProps = state => ({
    signUpBtnLoading: state.getIn(['mainReducer', 'signUp', 'btnSignUpLoading']),
    emailStatus: state.getIn(['mainReducer', 'signUp', 'status']),
    loginStatus: state.getIn(['mainReducer', 'login', 'status']),
});
const mapDispatchToProps = dispatch => {
    return {
        createAccount: (payload) => dispatch(createAccount(payload)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

