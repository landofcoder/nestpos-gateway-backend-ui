import React from "react";
import Chart from "chart.js";
import {
    Card,
    Container
} from "reactstrap";
import {Link} from 'react-router-dom';

import {
    chartOptions,
    parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import {connect} from "react-redux";
import AppByUser from "./AppByUser";
import AppForReport from "./AppForReport";

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeNav: 1,
            chartExample1Data: "data1"
        };
        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
    }

    toggleNavs = (e, index) => {
        e.preventDefault();
        this.setState({
            activeNav: index,
            chartExample1Data:
                this.state.chartExample1Data === "data1" ? "data2" : "data1"
        });
    };

    render() {
        const {appData} = this.props;
        const role = appData.get('role');
        return (
            <>
                <Header/>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <div className="row align-items-center py-4">
                        {
                            role === 'normal' ?
                                <>
                                    <div className="col-lg-6 col-7">
                                        <h6 className="h2 text-white d-inline-block mb-0">My Apps</h6>
                                    </div>
                                    <div className="col-lg-6 col-5 text-right">
                                        <Link to="/admin/create-app" className="btn btn-sm btn-neutral">New</Link>
                                    </div>
                                </> :
                                <>
                                    <div className="col-lg-12 col-12">
                                        <h6 className="h2 text-white d-inline-block mb-0">Apps report</h6>
                                    </div>
                                </>
                        }
                    </div>
                    <Card className="shadow">
                        {
                            role === 'normal' ? <AppByUser/> : <AppForReport/>
                        }
                    </Card>
                </Container>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        appData: state.getIn(['mainReducer', 'app', 'data'])
    };
}

export default connect(
    mapStateToProps,
    null
)(Index);

