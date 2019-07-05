import React, { Component } from 'react';
import ReactDOM from "react-dom";
import * as d3 from "d3";
import c3 from 'c3';
import 'c3/c3.css';

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.chart = null;


        this.updateData = this.updateData.bind(this);

    }


    updateData(e){
        console.log(e);

        this.chart.load({
            columns: [
                ['data1', 40, 210, 120, 430, 250, 280]
            ]
        });
    }

    componentDidMount() {

        this.chart = c3.generate({
            bindto: '#chart',
            data: {
                x : 'x',
                columns: [
                    ['x', 'korea1', 'korea2', 'korea3', 'korea4'],
                    ['data1', 30, 200, 100, 400, 150, 250]
                ],

                type:'bar',
                order: 'desc'
            },
            axis: {
                y: {
                    label: {
                        text: 'Y Label',
                        position: 'outer-middle'
                    },
                    tick: {
                        format: d3.format("$,") // ADD
                    },
                },
                x: {
                    type: 'category' // this needed to load string x value
                },
                rotated: true

            }
        });

    }



    render(){

        return (
            <div>
                <div id="chart"></div>
                <button type="button" onClick={this.updateData}>update data</button>
            </div>
        )

    }
}