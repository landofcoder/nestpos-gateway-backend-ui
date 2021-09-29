import React from "react";
import {
    Table,
    Media,
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getListApps} from "../action";

class AppByUser extends React.Component {

    componentDidMount() {
        const {getListApps} = this.props;
        getListApps();
    }

    render() {
        const { getListAppLoading, listAppData } = this.props;
        return (
            <>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Paltform</th>
                        <th scope="col">Destination url</th>
                        <th scope="col">Token</th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={6}>
                            {
                                getListAppLoading ? <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div> : <></>
                            }
                        </td>
                    </tr>
                    {
                        listAppData.map((item, i) =>
                            <tr key={i}>
                                <th scope="row">
                                    <Media className="align-items-center">
                                        <Media>
                                                        <span className="mb-0 text-sm">
                                                            <Link to={`/admin/edit-app/${item.token}`}>{item.name}</Link>
                                                        </span>
                                        </Media>
                                    </Media>
                                </th>
                                <td>{item.platform}</td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-warning"/>
                                        {item.destination_url}
                                    </Badge>
                                </td>
                                <td>
                                    <Badge color="" className="badge-dot mr-4">
                                        <i className="bg-warning"/>
                                        {item.token}
                                    </Badge>
                                </td>
                                <td className="text-right">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="fas fa-ellipsis-v"/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                                                Edit
                                            </DropdownItem>
                                            <DropdownItem
                                                href="#pablo"
                                                className="text-danger"
                                                onClick={e => e.preventDefault()}
                                            >
                                                Delete
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                        )
                    }

                    </tbody>
                </Table>
            </>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getListApps: () => dispatch(getListApps()),
    };
}

function mapStateToProps(state) {
    return {
        getListAppLoading: state.getIn(['mainReducer', 'listApp', 'isLoading']),
        listAppData: state.getIn(['mainReducer', 'listApp', 'data'])
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppByUser);
