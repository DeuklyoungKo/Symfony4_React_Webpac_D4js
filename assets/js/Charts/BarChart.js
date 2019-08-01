import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import '../../css/barChart.css';
import { getCsvFileNameVersioned } from '../common/Api';


export default class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            csvFileNameConvert: null
        };

        this.dataArray = [];
        this.dataIndex = 0;
        this.x = null;
        this.y = null;
        this.xAxis = null;
        this.yAxis = null;
        this.chart = null;
        this.svgWidth = null;
        this.svgHeight = null;

        this.makeChart = this.makeChart.bind(this);
        this.reSetInit = this.reSetInit.bind(this);

    }

    componentDidMount() {

        const { fatchLink } = this.props;
        const {csvFileName} = this.props.config;
        const result = getCsvFileNameVersioned(fatchLink, csvFileName);
        result.then((data)=>{
            this.setState({
                csvFileNameConvert:data
            });
            this.init();
        });


        let preDivWidth = document.getElementById('chartContainer').clientWidth;
        let preDivHeight = document.getElementById('chartContainer').clientHeight;

        window.addEventListener('resize',(data)=>{
            let divWidth = document.getElementById('chartContainer').clientWidth;
            let divHeight = document.getElementById('chartContainer').clientHeight

            if (preDivWidth !== divWidth || preDivHeight !== divHeight) {
                preDivWidth = divWidth;

                this.reSetInit();
            }

        });

    }


    reSetInit(){
        d3.select('#chartContainer').select("svg").remove();
        this.dataIndex = 0;
        this.init();
    };

    playButton(e){
        event.preventDefault();
        this.reSetInit();
        this.makeChart(this.dataArray[this.dataIndex]);
    }

    init() {

        console.log('==start init ==');

        // const {margin, width, height, startDate, endDate, csvFileName} = this.props.config;
        const {margin, startDate, endDate, csvFileName} = this.props.config;
        const {csvFileNameConvert} = this.state;

        const width =  document.getElementById('chartContainer').clientWidth
        const height = document.getElementById('chartContainer').clientHeight


        let dataArray = this.dataArray;
        // let dataIndex = this.dataIndex;
        let x = this.x;
        let y = this.y;
        let xAxis = this.xAxis;
        let yAxis = this.yAxis;
        let chart = this.chart;


        this.svgWidth = width - margin.left - margin.right;
        this.svgHeight = height - margin.top - margin.bottom;

        this.x = d3.scaleLinear()
            .rangeRound([0, this.svgWidth]);

        this.y = d3.scaleBand()
            .rangeRound([0, this.svgHeight])
            .padding(0.1);

        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y);


        this.chart = d3.select(".chart").append("svg")
            .attr("width", this.svgWidth + margin.left + margin.right + 60)
            .attr("height", this.svgHeight + margin.top + margin.bottom + 30)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.chart.append("g")
            .attr("class", "x axis xaxis")
            .attr("transform", "translate(0," + this.svgHeight + ")");

        this.chart.append("g")
            .attr("class", "y axis yaxis")
            .attr('fill', "#000099");

        this.chart.append("text")
            .attr("class", "timeTitle")
            .attr("x", this.svgWidth / 2 + 50)
            .attr("y", this.svgHeight + margin.top + 10)
            .attr("text-anchor", "end");


        d3.dsv(",", csvFileNameConvert, (d, i) => ({
                index: i,
                year: d.year,
                name: d.name,
                value: +d.value,
            })
        ).then((data) => {

            this.dataArray = [];

            for (let i = startDate; i <= endDate; i++) {
                this.dataArray = [...this.dataArray, data.filter(data => +data.year === i)]
            }

        })

        console.log('==end init ==');
    }


    makeChart(data) {

        const {margin, durationSec} = this.props.config;

        const t = d3.transition()
            .duration(durationSec)
            .ease(d3.easeLinear);

        let dataArray = this.dataArray;
        // let dataIndex = this.dataIndex;
        let x = this.x;
        let y = this.y;
        let yAxis = this.yAxis;
        let chart = this.chart;
        let svgHeight = this.svgHeight;


        data.sort((a, b) => {
            return b.value - a.value
        });

        x.domain([0, d3.max(data, d => d.value)]);

        y.domain(data.map(d => {
            return d.name
        }));

        this.chart.select(".xaxis")
            .transition(t)
            .call(this.xAxis)


        this.chart.select(".yaxis")
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

                console.log("this.dataIndex==", this.dataIndex, this.dataArray.length)
                if (this.dataIndex < this.dataArray.length - 1) {

                    ++this.dataIndex;
                    this.makeChart(dataArray[this.dataIndex]);
                }

            })

        console.log("== makeChart end ==");
    }


    render() {

        return (
            <div>
                <div className='play-button'>
                    <a href="#" onClick={(e)=>{this.playButton(e)}} className="btn btn-primary btn-icon-split btn-sm">
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
}


BarChart.propTypes = {
    fatchLink: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired
};
