import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import BarChart from './BarChart.js';
import BarChartTime from './BarChartTime.js';
import Axios from "axios";
import Charts from "./Charts";
import Dashboard from "../Dashboard/Dashboard";
import Error404 from "../common/Error404";

export default function Chart(props){


    const [data, setData] = useState({type:{}});


    const config = {
        margin: {top: 20, right: 60, bottom: 60, left: 40},
        // width: 200,
        // height: 400,
        startDate: 1975,
        endDate: 1978,
        durationSec: 3001,
        // csvFileName: "../../data/data_basic1.csv"
        csvFileName: "/upload/data/data_basic1.csv"
    }

    const {id} = props;


    const chartContainer = useRef(null);

    const getChartContainerSize = () => {

        let containerWidth = chartContainer.current.clientWidth;
        let containerHeight = chartContainer.current.clientHeight;

        return {
            containerWidth:containerWidth,
            containerHeight:containerHeight
        }
    };


    function getChartComponent(inData) {


        let nowPageObj, inChartType;

        console.log("==inChartType1==");
        console.log(inData);
        if(inData.id) {
            console.log("==inChartType2==");
            inChartType = inData.type;
        }else{
            console.log("==inChartType3==");
            return;
        }
        console.log("==inChartType4==");

        switch (inChartType) {

            case "BarChart":
                nowPageObj = BarChart;
                break;

            case "BarChartTime":
                nowPageObj = BarChartTime;
                break;

        }


        console.log("==inChartType==");
        console.log(inChartType);

        return React.createElement(
            nowPageObj,
            {
                    config:config,
                    ...props,
                    getChartContainerSize: getChartContainerSize
                }
        )

    }




    useEffect(()=>{

        let isSubscribed = true;

        Axios.get('http://reactjs.test.com/chart/data/'+id)
            .then((res) => {

                let resData = res.data.result[0];

                console.log("==res==");

                if (isSubscribed) {
                    setData(resData);
                }

            })


        return () => isSubscribed = false
    },[]);







    return (
        <div className="container-fluid">

            {/*<!--Page Heading -->*/}
            {/*<h1 className="h3 mb-2 text-gray-800">Charts</h1>*/}
            {/*<!--Content Row -->*/}
            <div className="row">

                <div className="col-xl-8 col-lg-7">

                    {/*<!--Area Chart -->*/}
                    <div className="card shadow mb-4">
                        {/*<div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
                        </div>*/}
                        <div className="card-body">
                            <div className="chart-area d3-chart-area" ref={chartContainer} id={"chartContainer"}>
                                {getChartComponent(data)}
{/*                                <BarChart
                                    config={config}
                                    {...props}
                                    getChartContainerSize={getChartContainerSize}
                                />*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="mb-4">Detail <code>info2 of data</code>
            </p>
        </div>
    )
}

Chart.propTypes = {
    id: PropTypes.number.isRequired
};
