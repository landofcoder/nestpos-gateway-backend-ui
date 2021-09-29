import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import {onChangePasswordSubmit, onUpdateProfile} from '../../action/index';
import {connect} from "react-redux";

class Profile extends React.Component {
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
    onChangePasswordSubmit = (event) => {
        event.preventDefault();
        const {onChangePasswordSubmit} = this.props;
        const {password} = this.state;
        onChangePasswordSubmit({password});
    }
    onUpdateProfile = (event) => {
        event.preventDefault();
        const {onUpdateProfile} = this.props;
        const {firstName, lastName} = this.state;
        onUpdateProfile({firstName, lastName});
    }

    render() {
        let disabled = true;
        let passwordConfirm = true;
        const {passwordStatus, profileStatus} = this.props;
        const {password, confirmPassword,firstName,lastName} = this.state;
        if (password && confirmPassword) {
            if (this.state.password !== this.state.confirmPassword) {
                passwordConfirm = false
                disabled = true;
            } else {
                disabled = false;
            }
        }
        let disabled2 = true;
        if(firstName && lastName){
            disabled2 = false;
        }
        return (
            <>
                <UserHeader/>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-1 center" xl="5">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-7">
                                    <h6 className="h2 text-white d-inline-block mb-0">My Account</h6>
                                </div>
                            </div>
                            <Card className="bg-secondary shadow">
                                <CardBody>
                                    <Form role="form" onSubmit={this.onUpdateProfile}>
                                        <h6 className="heading-small text-muted mb-4">
                                            User information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            First name
                                                        </label>
                                                        <Input
                                                            onChange={this.onFirstNameChange}
                                                            className="form-control-alternative"
                                                            defaultValue={this.props.firstName}
                                                            id="input-first-name"
                                                            placeholder="First name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Last name
                                                        </label>
                                                        <Input
                                                            onChange={this.onLastNameChange}
                                                            className="form-control-alternative"
                                                            defaultValue={this.props.lastName}
                                                            id="input-last-name"
                                                            placeholder="Last name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            disabled={true}
                                                            onChange={this.onEmailChange}
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder={this.props.email}
                                                            type="email"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {
                                                profileStatus === 1 ? <FormGroup>
                                                    <span
                                                        className="text-green"><small> Profile update successfully</small></span>
                                                </FormGroup> : <></>
                                            }
                                            <div className="text-right">
                                                <Button disabled = {disabled2} className="mt-4"  color="primary" type="submit">
                                                    Update Profile
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                            <br/>
                            <Card className="bg-secondary shadow">
                                <CardBody>
                                    <Form role="form" onSubmit={this.onChangePasswordSubmit}>
                                        <h6 className="heading-small text-muted mb-4">
                                            Change Password
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-new-password"
                                                        >
                                                            New Password
                                                        </label>
                                                        <Input
                                                            onChange={this.onPasswordChange}
                                                            className="form-control-alternative"
                                                            id="input-new-password"
                                                            placeholder=""
                                                            type="password"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-confirm-password"
                                                        >
                                                            Confirm Password
                                                        </label>
                                                        <Input
                                                            onChange={this.onConfirmPasswordChange}
                                                            className="form-control-alternative"
                                                            id="input-confirm-password"
                                                            placeholder=""
                                                            type="password"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {
                                                passwordStatus === 1 ? <FormGroup>
                                                    <span
                                                        className="text-green"><small> Password change successfully</small></span>
                                                </FormGroup> : <></>
                                            }
                                            {
                                                passwordConfirm === false ? <FormGroup>
                                                    <span className="text-danger"><small> Password change failed</small></span>
                                                </FormGroup> : <></>
                                            }
                                            <div className="text-right">
                                                <Button disabled={disabled} className="mt-4" color="primary"
                                                        type="submit">
                                                    Change Password
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        passwordStatus: state.getIn(['mainReducer', 'changePassword', 'status']),
        profileStatus: state.getIn(['mainReducer', 'updateProfile', 'status']),
        firstName: state.getIn(['mainReducer', 'app','data','firstName']),
        lastName: state.getIn(['mainReducer', 'app','data','lastName']),
        email: state.getIn(['mainReducer', 'app','data','email'])
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onChangePasswordSubmit: (payload) => dispatch(onChangePasswordSubmit(payload)),
        onUpdateProfile: (payload) => dispatch(onUpdateProfile(payload))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

