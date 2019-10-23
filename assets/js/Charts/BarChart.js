import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import '../../css/barChart.css';


export default function BarChart(props){

    console.log("BarChart==props==");
    console.log(props);

    const {margin, startDate, endDate, csvFileName} = props.config;
    const getChartContainerSize = props.getChartContainerSize;

    const csvFileNameConvert = csvFileName;

    const [dataArray, setDataArray] = useState([]);

    // let dataArray = [];
    let dataIndex = 0;
    let x = null;
    let y = null;
    let xAxis = null;
    let yAxis = null;
    let chart = null;
    let svgWidth = null;
    let svgHeight = null;

//-----------------------

//  the data that powers the bar chart, a simple array of numeric values
    //const chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];
    // var chartdata = [10, 20, 30, 40, 50, 60, 75, 90, 110, 130, 150, 190];
    var chartdata = [170, -50, 40, -30, 60, 50, 85, 80, 120, 120, 160, 150];

//  the size of the overall svg element
    const height = 200,
        width = 720,
//  the width of each bar and the offset between each bar
        barWidth = 40,
        barOffset = 20;


    useEffect(()=> {


        d3.select('.chart').append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#dff0d8')
            .selectAll('rect').data(chartdata)
            .enter().append('rect')
            // .style({'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5'})
            .attr("class","barchart1")
            .attr('width', barWidth)
            .attr('height', function (data) {
                return data;
            })
            .attr('x', function (data, i) {
                return i * (barWidth + barOffset);
            })
            .attr('y', function (data) {
                return height - data;
            });

    },[]);


    return (
        <div id={"graphRootDiv"}>
            <div className='play-button'>
                <a href="#" onClick={(e)=>{onPlayButton(e)}} className="btn btn-primary btn-icon-split btn-sm">
                <span className="icon text-white-50">
                  <i className="fas fa-play"></i>
                </span>
                    <span className="text">Play</span>
                </a>
            </div>
            <div className="chart"></div>
        </div>
    )

}
