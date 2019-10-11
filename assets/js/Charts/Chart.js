import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BarChart from './BarChart.js';

export default class Charts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            config : {
                margin: {top: 20, right: 60, bottom: 60, left: 40},
                width: 500,
                height: 300,
                startDate: 1975,
                endDate: 1978,
                durationSec: 3001,
                // csvFileName: "../../data/data_basic1.csv"
                csvFileName: "/upload/data/data_basic1.csv"
            }
        }

    }


    render() {

        return (
            <div className="container-fluid">

                {/*<!--Page Heading -->*/}
                <h1 className="h3 mb-2 text-gray-800">Charts</h1>
                <p className="mb-4">Chart.js is a third party plugin that is used to generate the charts in this theme.
                    The charts below have been customized - for further customization options, please visit the <a
                        target="_blank" href="https://www.chartjs.org/docs/latest/">official Chart.js documentation</a>.
                </p>

                {/*<!--Content Row -->*/}
                <div className="row">

                    <div className="col-xl-8 col-lg-7">

                        {/*<!--Area Chart -->*/}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
                            </div>
                            <div className="card-body">
                                <div className="chart-area" id="chartContainer">
                                    {/*<canvas id="myAreaChart"></canvas>*/}
                                    <BarChart
                                        {...this.state}
                                        {...this.props}
                                    />
                                </div>
                                <hr/>
                                    Styling for the area chart can be found in
                                    the <code>/js/demo/chart-area-demo.js</code> file.
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        )
    }
}

Charts.propTypes = {
    // fatchLink: PropTypes.string.isRequired
};
