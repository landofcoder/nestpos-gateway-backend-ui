import React from "react";
import {connect} from "react-redux";
import {CardBody, Col, FormGroup, Input, Row} from "reactstrap";
import {newAppFieldsChange} from '../../action/index';

class AppForm extends React.Component {
    render() {
        const {createAppForm, editMode, editItem} = this.props;
        let form;
        if(editMode) {
            form = editItem;
        } else {
            form = createAppForm;
        }
        const name = form.get('name');
        const siteUrl = form.get('siteUrl');
        const imageBaseUrl = form.get('imageBaseUrl');
        const token = form.get('token');
        return (
            <>
                <CardBody>
                    <h6 className="heading-small text-muted mb-4">
                        App information
                    </h6>
                    <div>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        required
                                        onChange={e => this.props.newAppFieldsChange({
                                            field: 'name',
                                            value: e.target.value,
                                            editMode
                                        })}
                                        value={name}
                                        className="form-control-alternative"
                                        id="name"
                                        placeholder="App name"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-first-name"
                                    >
                                        Magento site url
                                    </label>
                                    <Input
                                        required
                                        value={siteUrl}
                                        onChange={e => this.props.newAppFieldsChange({
                                            field: 'siteUrl',
                                            value: e.target.value,
                                            editMode
                                        })}
                                        className="form-control-alternative"
                                        id="magento-site-url"
                                        placeholder="http://example.com"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-first-name"
                                    >
                                        Magento image base url
                                    </label>
                                    <Input
                                        required
                                        value={imageBaseUrl}
                                        onChange={e => this.props.newAppFieldsChange({
                                            field: 'imageBaseUrl',
                                            value: e.target.value,
                                            editMode
                                        })}
                                        className="form-control-alternative"
                                        id="magento-image-base"
                                        placeholder="http://cdn.example.com or http://example.com"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-first-name"
                                    >
                                        Token
                                    </label>
                                    <Input
                                        value={token}
                                        onChange={e => this.props.newAppFieldsChange({
                                            field: 'token',
                                            value: e.target.value,
                                            editMode
                                        })}
                                        className="form-control-alternative"
                                        readOnly
                                        id="token-id"
                                        placeholder="XXXX-XXXX"
                                        type="text"
                                    />
                                    {
                                        editMode ? <></> :
                                            <small id="emailHelp" className="form-text text-muted">The token will
                                                automatically be generated when creating a new app.</small>
                                    }
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        newAppFieldsChange: payload => dispatch(newAppFieldsChange(payload))
    };
}

function mapStateToProps(state) {
    return {
        createAppForm: state.getIn(['mainReducer', 'createApp', 'form'])
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppForm);

