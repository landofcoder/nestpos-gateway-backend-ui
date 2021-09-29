import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {checkForgotResetToken, onResetPasswordSubmit} from '../action/index';

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

class ResetPassword extends React.Component {

    state = {
        password: '',
        confirmPassword: '',
        token: ''
    };

    componentDidMount() {
        const {checkForgotResetToken} = this.props;
        const params = this.props.match.params;
        const token = params.token;
        this.setState({token});
        checkForgotResetToken(token);
    }

    resetSubmit = (event) => {
        event.preventDefault();
        const {onResetPasswordSubmit} = this.props;
        onResetPasswordSubmit({password: this.state.password});
    };

    passwordChange = e => {
        this.setState({password: e.target.value});
    };

    confirmPasswordChange = e => {
        this.setState({confirmPassword: e.target.value});
    };

    setNewPassword = () => {
        const {onResetPasswordSubmit} = this.props;
        const {token} = this.state;
        onResetPasswordSubmit({password: this.state.password, token});
    };

    render() {
        const {sentInstruction, isCheckingToken, validToken,
            btnLoadingSubmitReset, forgotItem, messageChangePassword} = this.props;
        const {email} = forgotItem;
        const {password, confirmPassword} = this.state;
        let disabled = true;

        if (password && confirmPassword && password === confirmPassword) {
            disabled = false;
        }

        return (
            <>
                <Col lg="5" md="7">
                    <Container>
                        <div className="header-body text-center mb-5">
                            <Row className="justify-content-center">
                                <Col lg="12" md="6">
                                    <h1 className="text-white">Create new password</h1>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            {
                                isCheckingToken ? <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div> : validToken ? <form role="form" onSubmit={this.resetSubmit}>
                                    <FormGroup>
                                    <span className="text-muted">
                                    Set the password for {email}
                                </span>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input onChange={this.passwordChange} value={password}
                                                   placeholder="Password"
                                                   type="password"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input onChange={this.confirmPasswordChange} value={confirmPassword}
                                                   placeholder="Confirm password"
                                                   type="password"/>
                                        </InputGroup>
                                    </FormGroup>
                                    {
                                        sentInstruction ? <span className="text-success"><small>Sent</small></span>
                                            : <></>
                                    }
                                    <div className="text-center">
                                        <Button disabled={disabled || btnLoadingSubmitReset}
                                                onClick={this.setNewPassword} className="my-4" color="primary"
                                                type="submit">
                                            {
                                                btnLoadingSubmitReset ?
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"/> : <></>
                                            }
                                            Set new password
                                        </Button>
                                        <br/>
                                        {
                                            messageChangePassword ? <span className="text-success small">{messageChangePassword} Click <Link to="/auth/login">here</Link> to continue.</span> : <span/>
                                        }
                                    </div>
                                </form> : <>Invalid token</>
                            }
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
        checkForgotResetToken: payload => dispatch(checkForgotResetToken(payload)),
        onResetPasswordSubmit: payload => dispatch(onResetPasswordSubmit(payload))
    };
}

function mapStateToProps(state) {
    return {
        isCheckingToken: state.getIn(['mainReducer', 'resetPassword', 'isCheckingToken']),
        validToken: state.getIn(['mainReducer', 'resetPassword', 'validToken']),
        btnLoadingSubmitReset: state.getIn(['mainReducer', 'resetPassword', 'btnLoadingSubmitReset']),
        forgotItem: state.getIn(['mainReducer', 'resetPassword', 'forgotItem']),
        messageChangePassword: state.getIn(['mainReducer', 'resetPassword', 'messageChangePassword'])
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
