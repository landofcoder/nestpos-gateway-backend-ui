import React from "react";
import {
    Card, Col,
    Container, Form, CardFooter, Button
} from "reactstrap";
import Header from "components/Headers/Header.js";
import {connect} from "react-redux";
import AppForm from "./AppForm";
import {getDetailAppForEdit, updateApp} from '../../action/index';

class EditApp extends React.Component {

    onSubmitApp = (event) => {
        event.preventDefault();
        const { updateApp } = this.props;
        updateApp();
    };

    componentDidMount() {
        const {getDetailAppForEdit} = this.props;
        const params = this.props.match.params;
        const token = params.token;
        getDetailAppForEdit(token);
    }

    render() {
        const {isLoadingEditAppSubmit, isFetchingAppDetail, editAppForm} = this.props;
        const editResult = 0;
        let btnDisabled = false;
        if (isFetchingAppDetail || isLoadingEditAppSubmit) {
            btnDisabled = true;
        }
        return (
            <>
                <Header/>
                <Container className="mt--7" fluid>
                    <Form onSubmit={this.onSubmitApp}>
                        <div className="row justify-content-center">
                            <Col xl="6">
                                <Card className="bg-secondary shadow">
                                    {
                                        isFetchingAppDetail ? <div className="mt-2 d-flex justify-content-center">
                                            <div className="spinner-border text-primary spinner-grow-sm" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div> : <></>
                                    }
                                    <AppForm editItem={editAppForm} editMode={1}/>
                                    <CardFooter>
                                        <div className="row align-items-center">
                                            <div className="col-lg-6 col-7">
                                                {
                                                    editResult === 2 ?
                                                        <span className="text-danger"><small>There was an error creating the app.</small></span> : <></>
                                                }
                                            </div>
                                            <div className="col-lg-6 col-5 text-right">
                                                <Button type="submit" disabled={btnDisabled}
                                                        className="btn btn-sm btn-neutral">
                                                    {
                                                        isLoadingEditAppSubmit ?
                                                            <span className="spinner-border spinner-border-sm"
                                                                  role="status" aria-hidden="true"/> : <></>
                                                    }
                                                    Save
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
        getDetailAppForEdit: payload => dispatch(getDetailAppForEdit(payload)),
        updateApp: () => dispatch(updateApp())
    };
}

function mapStateToProps(state) {
    return {
        isFetchingAppDetail: state.getIn(['mainReducer', 'editApp', 'isFetchingAppDetail']),
        isLoadingEditAppSubmit: state.getIn(['mainReducer', 'editApp', 'isLoadingEditAppSubmit']),
        editAppForm: state.getIn(['mainReducer', 'editApp', 'form'])
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditApp);

