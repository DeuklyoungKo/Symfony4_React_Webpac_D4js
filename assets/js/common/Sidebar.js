import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Sidebar extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    render() {

        const { nowPageCode } = this.props;

        let barLiclass = "nav-item";
        let DashboardLiclass = "nav-item";
        let PagesLiclass = "nav-item";
        let PagesSubClass = "collapse";
        let PagesSubClassCss = {
            backgroundColor: '#ffffff'
        };
        let TablesLiclass = "nav-item";

        switch(nowPageCode){

            case "Dashboard":
                DashboardLiclass += " active";
                break;

            case "Error404":
                PagesLiclass += " active";
                PagesSubClass += " show";
                PagesSubClassCss = {
                    backgroundColor: '#dddfeb'
                };
                break;

            case "Charts":
                barLiclass += " active";
                break;

            case "Tables":
                TablesLiclass += " active";
                break;

            default:
                // nowPageObj = Dashboard
        }

        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon">
                        <i className="far fa-chart-bar"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Statistics{/*<sup>1</sup>*/}</div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className={DashboardLiclass}>
                    <a className="nav-link" href="Dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">
                    Charts
                </div>


                {/*<!-- Nav Item - Tables -->*/}
                <li className={TablesLiclass}>
                    <a className="nav-link" href="Charts">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Charts</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>


                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">
                    Interface
                </div>

                {/*<!-- Nav Item - Pages Collapse Menu -->*/}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                       aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Components:</h6>
                            <a className="collapse-item" href="buttons.html">Buttons</a>
                            <a className="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                </li>

                {/*<!-- Nav Item - Utilities Collapse Menu -->*/}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Utilities</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Utilities:</h6>
                            <a className="collapse-item" href="utilities-color.html">Colors</a>
                            <a className="collapse-item" href="utilities-border.html">Borders</a>
                            <a className="collapse-item" href="utilities-animation.html">Animations</a>
                            <a className="collapse-item" href="utilities-other.html">Other</a>
                        </div>
                    </div>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">
                    Addons
                </div>

                {/*<!-- Nav Item - Pages Collapse Menu -->*/}
                <li className={PagesLiclass}>
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                       aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className={PagesSubClass} aria-labelledby="headingPages"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item nowMenu" href="Error404"
                            style={PagesSubClassCss}>404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className={barLiclass}>
                    <a className="nav-link" href="Charts">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className={TablesLiclass}>
                    <a className="nav-link" href="Tables">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>

                {/*<!-- Sidebar Toggler (Sidebar) -->*/}
                <div className="text-center d-none d-md-inline">
                    <button
                        className="rounded-circle border-0"
                        id="sidebarToggle"
                        onClick={this.handleClick}
                    ></button>
                </div>

            </ul>
        )
    }
}

Sidebar.propTypes = {
    nowPageCode: PropTypes.string,
    SidebarToggle: PropTypes.func
};
