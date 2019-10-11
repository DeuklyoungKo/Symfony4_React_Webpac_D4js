import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import BarChart from './BarChart.js';

export default function Chart(props){

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

    const chartContainer = useRef(null);

    const getChartContainerSize = () => {

        let containerWidth = chartContainer.current.clientWidth;
        let containerHeight = chartContainer.current.clientHeight;

        return {
            containerWidth:containerWidth,
            containerHeight:containerHeight
        }
    };


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
                                {/*<canvas id="myAreaChart"></canvas>*/}
                                <BarChart
                                    config={config}
                                    {...props}
                                    getChartContainerSize={getChartContainerSize}
                                />
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
