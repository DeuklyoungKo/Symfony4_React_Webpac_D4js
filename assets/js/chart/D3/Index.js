import React, {Component} from 'react';
import * as d3 from "d3";
import './index.css';

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataIndex: 0
        };

        this.config = {
            margin: {top: 20, right: 30, bottom: 30, left: 40},
            width: 500,
            height: 500,
            startDate: 1975,
            endDate: 1978,
            durationSec: 3003,
            csvFileName: "/build/data/data_basic.csv"
        }

        this.dataArray = [];
        // this.dataIndex = 0;
        this.x = null;
        this.y = null;
        this.xAxis = null;
        this.yAxis = null;
        this.chart = null;
        this.svgWidth = null;
        this.svgHeight = null;


        this.makeChart = this.makeChart.bind(this);

    }


    init() {


        const { dataIndex } = this.state;
        const {margin, width, height, startDate, endDate, csvFileName} = this.config;

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


        console.log("width==",this.svgWidth + margin.left + margin.right + 60);

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


        d3.dsv(",", csvFileName, (d, i) => ({
                index: i,
                year: d.year,
                name: d.name,
                value: +d.value,
            })
        ).then((data) => {

            for (let i = startDate; i <= endDate; i++) {
                this.dataArray = [...this.dataArray, data.filter(data => +data.year === i)]
            }
            this.makeChart(this.dataArray[dataIndex]);

        })

    }


    makeChart(data) {

        let { dataIndex } = this.state
        const {margin, durationSec} = this.config;

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

                console.log("dataIndex==",dataIndex,this.dataArray.length)
                if (dataIndex < this.dataArray.length - 1) {


                    this.setState({
                        dataIndex: dataIndex+1
                    })

/*                    this.dataIndex++
                    this.makeChart(dataArray[this.dataIndex]);*/
                }

            })

        console.log("== makeChart end ==");
    }


    componentDidMount() {
        this.init();
    }


    render() {

        return (
            <div className="chart"></div>
        )

    }
}
