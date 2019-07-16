import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Sidebar from './common/Sidebar';
import Topbar from './common/Topbar';
import Footer from './common/Footer'
import Error404 from './common/Error404';
import Dashboard from './Dashboard/Dashboard';
import Charts from './Charts/Charts';
import Tables from './Tables/Tables';


export default class Main extends Component {

    constructor(props) {
        super(props);
        // console.log("props==",props);

        this.state = {
            // nowPageCode : "Dashboard",
            nowPageCode: props.pageCode,
            nowPageObj: Dashboard,
            contentTag: null
        }

        this.fatchLink = "";

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
            this.fatchLink = "http://reactjs.test.com:8080/build/manifest.json";
        } else {
            // production code
            this.fatchLink = "/build/manifest.json";
        }

        this.getContentTag = this.getContentTag.bind(this);
        this.sidebarToggle = this.sidebarToggle.bind(this);
    }


    getContentTag(nowPageCode) {

        let nowPageObj = null;

        switch (nowPageCode) {

            case "Dashboard":
                nowPageObj = Dashboard
                break;

            case "Error404":
                nowPageObj = Error404
                break;

            case "Charts":
                nowPageObj = Charts
                break;

            case "Tables":
                nowPageObj = Tables
                break;

            default:
                nowPageObj = Dashboard
        }

        return React.createElement(
            nowPageObj,
            {
                fatchLink: this.fatchLink
            }
        )

    }



    sidebarToggle(){

        // $('.sidebar .collapse').collapse('hide');
        $("#sidebarToggle, #sidebarToggleTop").on('click',(e)=>{
            e.preventDefault();
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
                $('.sidebar .collapse').collapse('hide');
            };
        })
    }


    render() {

        const {nowPageObj, nowPageCode} = this.state;
        const getContentTag = this.getContentTag;
        const sidebarToggle = this.sidebarToggle;

        return (

            //{/*<!-- Page Wrapper -->*/}
            <div id="wrapper">
                <Sidebar
                    nowPageCode={nowPageCode}
                    sidebarToggle={sidebarToggle}
                />

                {/*<!--Content Wrapper -->*/}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/*<!--Main Content -->*/}
                    <div id="content">
                        <Topbar/>
                        {/*<!--Begin Page Content -->*/}
                        {getContentTag(nowPageCode)}
                        {/*<!--/.container-fluid -->*/}
                    </div>
                    {/*<!--End of Main Content -->*/}

                    {/*<!--Footer -->*/}
                    <Footer/>
                    {/*<!--End of Footer -->*/}

                </div>
                {/*<!--End of Content Wrapper -->*/}


            </div>
            // {/*<!-- End of Page Wrapper -->*/}

        );
    }

}


Main.propTypes = {
    pageCode: PropTypes.string.isRequired
};
