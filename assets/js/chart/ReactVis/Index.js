import React, {Component} from 'react';
// import './App.css';
import 'react-vis/dist/style.css';
import {
    BarSeries,
    HorizontalBarSeries,
    HorizontalGridLines,
    LabelSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from 'react-vis';

/*

const greenData = [{x: 'A', y: 10}, {x: 'B', y: 5}, {x: 'C', y: 15}];
const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];
*/

const greenData = [{x: 10, y: 'A'}, {x: 5, y: 'B'}, {x: 15, y: 'C'}, {x: 18, y: 'D'}];
const blueData = [{x: 12, y: 'A'}, {x: 2, y: 'B'}, {x: 11, y: 'D'}, {x: 20, y: 'C'}];


export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // dataVal: this.getRandomDatas(5)
            dataVal: greenData,
            labelData: greenData.map((d, idx) => ({
                x: d.x,
                y: d.y
            }))
        }

        this.fncAddData = this.fncAddData.bind(this);
        this.getRandomData = this.getRandomData.bind(this);
        this.getRandomDatas = this.getRandomDatas.bind(this);
        this.getLabelData = this.getLabelData.bind(this);

        this.dataVal = [
            /*
                        {x: 0, y: "a"},
                        {x: 1, y: "b"},
                        {x: 2, y: "c"},
                        {x: 3, y: "d"},
            */

            {x: 0, y: 1},
            {x: 1, y: 2},
            {x: 2, y: 3},
            {x: 3, y: 4},
        ];

        this.newLableData = null;
    }

    getLabelData() {
        return this.state.dataVal.map((d, idx) => ({
            x: this.state.dataVal[idx].x,
            y: d.y
        }));
    }

    getRandomData(yVal) {
        let data = null;
        if (typeof yVal === "number") {
            data = {y: yVal}
        } else {
            data = {y: Math.floor(Math.random() * 100) + 1}
        }

        data = {...data, x: Math.floor(Math.random() * 100) + 1}

        return data
    }

    getRandomDatas(count) {
        let i;
        let result = [];

        for (i = 0; i < count; i++) {
            result.push(this.getRandomData(i));
        }
        return result
    }

    fncAddData(e) {

        console.log('test fncAddData')
        this.setState(
            // {dataVal:this.getRandomDatas(5)}
            {dataVal: blueData}
        )
    }

    render() {

        const data1 = this.getRandomDatas(5);
        const data2 = this.getRandomDatas(5);
        const data3 = this.getRandomDatas(5);
        const {dataVal, labelData} = this.state;


        console.log("dataVal====", dataVal, labelData);

        const ITEMS = [
            'Korea1',
            'Korea2',
            'Korea3',
            'Korea4',
            'Korea5',
        ];




        return (
            <div className="App">
                {/*
                <DiscreteColorLegend orientation="horizontal" width={400} items={ITEMS} />
                <XYPlot xType="ordinal" height={400} width={400}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <BarSeries
                        data={dataVal}
                        style={{stroke:"#74a8f8", fill:"#9ad4ff"}}
                        animation
                    />
                    <XAxis title="X" />
                </XYPlot>*/}
                <XYPlot yType="ordinal" width={300} height={300} xDistance={100}>
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis/>
                    <YAxis/>
                    <HorizontalBarSeries
                        className="vertical-bar-series-example"
                        data={dataVal}
                        animation
                    />
                    <LabelSeries data={dataVal} getLabel={d => d.x}/>
                </XYPlot>
                <button type="button" onClick={(e) => {
                    this.fncAddData(e)
                }}>add Data
                </button>
            </div>
        );
    }
}