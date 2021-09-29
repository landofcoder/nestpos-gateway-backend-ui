import React from "react";
import {
    Card, Col,
    Container, Form, CardFooter, Button
} from "reactstrap";
import Header from "components/Headers/Header.js";
import {connect} from "react-redux";
import AppForm from "./AppForm";
import {resetNewAppForm, createNewApp, updateCreateNewAppResult} from '../../action/index';
import {Redirect} from 'react-router-dom';

class CreateApp extends React.Component {

    onSubmitApp = (event) => {
        event.preventDefault();
        const {createNewApp} = this.props;
        createNewApp();
    };

    componentDidMount() {
        const {resetNewAppForm} = this.props;
        resetNewAppForm();
    }

    render() {
        const {isLoadingCreateApp, addResult} = this.props;
        if (addResult === 1) {
            const {updateCreateNewAppResult} = this.props;
            // Add succeeded
            updateCreateNewAppResult(0);
            return <Redirect to="/index"/>
        }
        return (
            <>
                <Header/>
                <Container className="mt--7" fluid>
                    <Form onSubmit={this.onSubmitApp}>
                        <div className="row justify-content-center">
                            <Col xl="6">
                                <Card className="bg-secondary shadow">
                                    <AppForm/>
                                    <CardFooter>
                                        <div className="row align-items-center">
                                            <div className="col-lg-6 col-7">
                                                {
                                                    addResult === 2 ? <span className="text-danger"><small>There was an error creating the app.</small></span> : <></>
                                                }
                                            </div>
                                            <div className="col-lg-6 col-5 text-right">
                                                <Button type="submit" disabled={isLoadingCreateApp}
                                                        className="btn btn-sm btn-neutral">
                                                    {
                                                        isLoadingCreateApp ?
                                                            <span className="spinner-border spinner-border-sm"
                                                                  role="status" aria-hidden="true"/> : <></>
                                                    }
                                                    Create
                                                </Button>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Col>

                        </div>
                    </Form>
                </Container>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetNewAppForm: () => dispatch(resetNewAppForm()),
        createNewApp: () => dispatch(createNewApp()),
        updateCreateNewAppResult: payload => dispatch(updateCreateNewAppResult(payload))
    };
}

function mapStateToProps(state) {
    return {
        isLoadingCreateApp: state.getIn(['mainReducer', 'createApp', 'isLoading']),
        addResult: state.getIn(['mainReducer', 'createApp', 'addResult'])
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateApp);

