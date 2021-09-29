import React from "react";
import {connect} from 'react-redux';
import {getAppsForReport} from '../action/index';

class AppForReport extends React.Component {
    componentDidMount() {
        const {getAppsForReport} = this.props;
        getAppsForReport();
    }

    render() {
        const {isLoadingAppForReport, listAppReportData} = this.props;
        console.log('list app report:', listAppReportData);
        return (
            <div>
                {
                    isLoadingAppForReport ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> :
                        <>
                            {
                                listAppReportData.map((item, i) =>
                                    <div className="card" key={i}>
                                        <div className="card-body">
                                            <h3>First name: {item.get('firstName')}</h3>
                                            <h3>Email: {item.get('email')}</h3>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">App name</th>
                                                    <th scope="col">Platform</th>
                                                    <th scope="col">Token</th>
                                                    <th scope="col">Plan</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    item.get('listApps').map((app, index) =>
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{app.get('name')}</td>
                                                            <td>{app.get('platform')}</td>
                                                            <td>{app.get('token')}</td>
                                                            <td>{app.get('plan')}</td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }

                        </>
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAppsForReport: () => dispatch(getAppsForReport())
    };
}

function mapStateToProps(state) {
    return {
        isLoadingAppForReport: state.getIn(['mainReducer', 'listAppForReporting', 'isLoading']),
        listAppReportData: state.getIn(['mainReducer', 'listAppForReporting', 'data'])
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppForReport);
