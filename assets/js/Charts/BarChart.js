import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import '../../css/barChart.css';


export default function BarChart(props){

    console.log("==props==");
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


    useEffect(()=> {

        let ChartContainerSize = getChartContainerSize();
        let preDivWidth = ChartContainerSize.containerWidth;
        let preDivHeight = ChartContainerSize.containerHeight;


        d3.dsv(",", csvFileNameConvert, (d, i) => ({
                index: i,
                year: d.year,
                name: d.name,
                value: +d.value,
            })
        ).then((data) => {

            let dataArraySub = [];

            for (let i = startDate; i <= endDate; i++) {
                dataArraySub = [...dataArraySub, data.filter(data => +data.year === i)]
            }

            setDataArray(dataArraySub);

            console.log('==data is ready  ==');
            console.log(dataArraySub[dataIndex]);

            // init();

        });


        window.addEventListener('resize',(data)=>{

            // to check changed size
            let ChartContainerSize = getChartContainerSize();
            let divWidth = ChartContainerSize.containerWidth;
            let divHeight = ChartContainerSize.containerHeight;


            if (preDivWidth !== divWidth || preDivHeight !== divHeight) {
                preDivWidth = divWidth;

                reSetInit();
            }

        });

    },[]);


    function reSetInit(){
        console.log('==reSetInit==');
        d3.select('#chartContainer').select("svg").remove();
        dataIndex = 0;
        init();
    };

    function onPlayButton(e){
        event.preventDefault();
        reSetInit();


        console.log('==dataArray ==');
        console.log(dataArray);


        makeChart(dataArray[dataIndex]);
    }

    function init() {

        console.log('==start init ==');

        let ChartContainerSize = getChartContainerSize();
        let width = ChartContainerSize.containerWidth;
        let height = ChartContainerSize.containerHeight;

        console.log('==width height ==');
        console.log(width,height);

        svgWidth = width - margin.left - margin.right;
        svgHeight = height - margin.top - margin.bottom;

        x = d3.scaleLinear()
            .rangeRound([0, svgWidth]);

        y = d3.scaleBand()
            .rangeRound([0, svgHeight])
            .padding(0.1);

        xAxis = d3.axisBottom(x);
        yAxis = d3.axisLeft(y);


        chart = d3.select(".chart").append("svg")
            .attr("width", svgWidth + margin.left + margin.right + 60)
            .attr("height", svgHeight + margin.top + margin.bottom + 30)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        chart.append("g")
            .attr("class", "x axis xaxis")
            .attr("transform", "translate(0," + svgHeight + ")");

        chart.append("g")
            .attr("class", "y axis yaxis")
            .attr('fill', "#000099");

        chart.append("text")
            .attr("class", "timeTitle")
            .attr("x", svgWidth / 2 + 50)
            .attr("y", svgHeight + margin.top + 20)
            .attr("text-anchor", "end");


        console.log('==dataArray,dataArray[dataIndex],dataIndex==');
        console.log(dataArray,dataArray[dataIndex],dataIndex);

        makeChart(dataArray[dataIndex]);

        console.log('==end init ==');
    }


    function makeChart(data) {

        console.log('==data ==');
        console.log(data);


        const {margin, durationSec} = props.config;

        const t = d3.transition()
            .duration(durationSec)
            .ease(d3.easeLinear);


        data.sort((a, b) => {
            return b.value - a.value
        });

        x.domain([0, d3.max(data, d => d.value)]);

        y.domain(data.map(d => {
            return d.name
        }));

        chart.select(".xaxis")
            .transition(t)
            .call(xAxis)


        chart.select(".yaxis")
            .transition(t)
            .call(yAxis)

        let bar = chart.selectAll("g.bar")
            .data(data, function (d) {
                return this.dataset.id || d.name;
            })
            .join(
                enter => enter.append("g")
                    .attr("class", "bar")
                    .attr("data-id", (d) => (d.name))
                    .attr("transform", (d) => (`translate(0,${svgHeight - margin.bottom})`))
                    .append("rect")
                    .attr("height", function (d) {
                        return y.bandwidth();
                    })
                    .attr("width", 0)
                    .select(function () {
                        return this.parentNode;
                    })
                    .append('text')
                    .attr("y", y.bandwidth() / 2)
                    .text((d) => (d.name + ":" + d.value))
                    .attr("data-value", 0)
                    .attr("x", 0)
                    .attr("dy", "0.1em")
                    .attr("fill", "#ff002d")
                    .attr("alignment-baseline", "right")
                    .select(function () {
                        return this.parentNode;
                    })
                ,
                update => update
                ,
                exit => exit.transition(t)
                    .attr("transform", (d) => (`translate(0,${svgHeight})`))
                    .select('rect')
                    .attr("width", 0)
                    .select(function () {
                        return this.parentNode;
                    })
                    .select('text')
                    .attr("x", 0)
                    .tween("text", function (d) {
                        let i = d3.interpolateRound(this.dataset.value, 0);
                        return function (t) {
                            d3.select(this).text(d.name + ":" + i(t));
                        };
                    })
                    .select(function () {
                        return this.parentNode;
                    })
                    .remove()
            );


        bar.transition(t)
            .attr("transform", (d) => ("translate(0," + y(d.name) + ")"))

        bar.select("rect").transition(t)
            .attr("width", function (d) {
                return x(d.value)
            })
            .attr("height", function (d) {
                return y.bandwidth();
            })

        bar.select('text')
            .transition(t)
            .attr("data-value", (d) => (d.value))
            .attr("x", (d) => (x(d.value + 0.5)))
            .tween("text", function (d) {
                let i = d3.interpolateRound(this.dataset.value, d.value);
                return function (t) {
                    d3.select(this).text(d.name + ":" + i(t));
                };
            })


        chart.select('.timeTitle')
            .data(data)
            .transition(t)
            .tween("text", function (d) {
                const i = d3.interpolateDate(
                    new Date(`${d.year}-01-01`),
                    new Date(`${d.year}-12-31`)
                );
                return function (t) {
                    let dateValue = new Date(i(t));
                    d3.select(this).text(
                        dateValue.toLocaleString('en-us', {month: 'long'})
                        + "." + dateValue.getFullYear()
                    );
                };
            })
            .on("end", () => {

                console.log("this.dataIndex==", dataIndex, dataArray.length)
                if (dataIndex < dataArray.length - 1) {
                    ++dataIndex;
                    makeChart(dataArray[dataIndex]);
                }

            })

        console.log("== makeChart end ==");
    }


    console.log("== Barchart 2 ==");

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


BarChart.propTypes = {
    config: PropTypes.object.isRequired,
    getChartContainerSize: PropTypes.func.isRequired

};
