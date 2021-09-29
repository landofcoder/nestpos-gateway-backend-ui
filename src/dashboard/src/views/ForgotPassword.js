import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {forgotPasswordSubmit, onForgotPasswordEmailChange} from '../action/index';

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

class ForgotPassword extends React.Component {

    forgotSubmit = (event) => {
        event.preventDefault();
        const {forgotPasswordSubmit, email} = this.props;
        forgotPasswordSubmit(email);
    };

    emailChange = e => {
        const { onForgotPasswordEmailChange } = this.props;
        onForgotPasswordEmailChange(e.target.value);
    };

    render() {
        const {btnLoading, sentInstruction, email} = this.props;
        let disabled = true;
        if (email) {
            disabled = false;
        }
        return (
            <>
                <Col lg="5" md="7">
                    <Container>
                        <div className="header-body text-center mb-5">
                            <Row className="justify-content-center">
                                <Col lg="12" md="6">
                                    <h1 className="text-white">Forgot Password</h1>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <form role="form" onSubmit={this.forgotSubmit}>
                                <FormGroup>
                                    <span className="text-muted">
                                    Enter the email address you signed up with below. An email will be sent containing a link to reset your password.
                                </span>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input onChange={this.emailChange} value={email} placeholder="Email" type="email" autoComplete="new-email"/>
                                    </InputGroup>
                                </FormGroup>
                                {
                                    sentInstruction ? <span className="text-success"><small>Sent</small></span>
                                        : <></>
                                }
                                <div className="text-center">
                                    <Button disabled={disabled || btnLoading} className="my-4" color="primary"
                                            type="submit">
                                        {
                                            btnLoading ?
                                                <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"/> : <></>
                                        }
                                        Send reset instruction
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col xs="12">
                            <small>Back to&nbsp;</small>
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

function mapDispatchToProps(dispatch) {
    return {
        forgotPasswordSubmit: payload => dispatch(forgotPasswordSubmit(payload)),
        onForgotPasswordEmailChange: payload => dispatch(onForgotPasswordEmailChange(payload))
    };
}

function mapStateToProps(state) {
    return {
        btnLoading: state.getIn(['mainReducer', 'forgotPassword', 'btnLoading']),
        email: state.getIn(['mainReducer', 'forgotPassword', 'email']),
        sentInstruction: state.getIn(['mainReducer', 'forgotPassword', 'sentInstruction'])
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);
