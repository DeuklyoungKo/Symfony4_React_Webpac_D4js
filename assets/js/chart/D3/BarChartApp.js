import React, { Component } from 'react';
import BarChart from "./BarChart"
/*
CSV file smaple Form

year,name,value
1975,Locke,4
1975,Reyes,8
1975,Ford,15
1975,Jarrah,16
1975,Shephard,23
1975,Kwoon,42
1976,Locke,14
1976,Reyes,9
1976,Ford,16
1976,Jarrah,33
1976,Shephard,18
1976,Kwoon,30
*/


export default class BarChartApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            config : {
                margin: {top: 20, right: 30, bottom: 30, left: 40},
                width: 500,
                height: 300,
                startDate: 1975,
                endDate: 1978,
                durationSec: 3001,
                csvFileName: "./data/data_basic1.csv"
            }
        }

    }

    render(){

        return (
            <BarChart
                {...this.state}
            />
        )

    }
}
