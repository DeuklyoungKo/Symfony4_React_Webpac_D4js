import React, { Component } from 'react';
import Chart from 'chart.js';

export default class ChartjsIndex extends Component {
    constructor(props) {
        super(props);

        this.myChart = null;
        this.maxValue = 1;

        this.fncDestory = this.fncDestory.bind(this);
        this.addData = this.addData.bind(this);
        this.changeData = this.changeData.bind(this);
        this.number = 0;
    }

    fncDestory() {
        this.myChart.destroy();
    }

    addData(e, myChart, label, data) {

        let maxValue = this.maxValue;
        let number = this.number;

        data = maxValue * data;
        maxValue = data;

        myChart.data.datasets.forEach((dataset) => {
        });

        var meta = myChart.getDatasetMeta(0);

        var indexNo1 = 0;
        var indexNo2 = 5;

        this.changeData(indexNo1, indexNo2, myChart.data.labels);
        this.changeData(indexNo1, indexNo2, myChart.data.datasets[0].backgroundColor);
        this.changeData(indexNo1, indexNo2, myChart.data.datasets[0].borderColor);
        this.changeData(indexNo1, indexNo2, myChart.data.datasets[0].data);
        this.changeData(indexNo1, indexNo2, meta.data);

        myChart.options.title.text = number;
        number++;
        myChart.update();

    }

    componentDidMount() {

        const ctx = document.getElementById('myChart');
        this.myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['', '', '', '', '', ''],
                datasets: [{
                    label: '',
                    data: [13, 19, 1, 5, 3, 2],
                    labels: ['Red4', 'Blue4', 'Yellow4', 'Green4', 'Purple4', 'Orange4'],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {mirror: true}
                    }]
                },
                responsive: false,
                tooltips: {
                    mode: 'index'
                },
                legend: {
                    display: false,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                },

                title: {
                    display: true,
                    text: 'Custom Chart Title'
                },


                animation: {
                    // onComplete: function () {
                    onProgress: function () {
                        var chartInstance = this.chart;
                        var ctx = chartInstance.ctx;
                        console.log('chartInstance', chartInstance);
                        var height = chartInstance.controller.boxes[0].bottom;
                        ctx.textAlign = "left";
                        ctx.textBaseline = 'middle';
                        console.log('Chart.helpers.data=====', Chart.helpers.data);

                        console.log('Chart.helpers=====',  Chart.helpers)

                        Chart.helpers.each(
                            this.data.datasets.forEach(
                                function (dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    Chart.helpers.each(
                                        meta.data.forEach(
                                            function (bar, index) {
                                                var centerPoint = bar.getCenterPoint();
                                                console.log('dataset.data[index] =====',  dataset.data[index])
                                                ctx.fillText(
                                                    dataset.labels[index],
                                                    centerPoint.x,
                                                    centerPoint.y
                                                )
                                            }), this)
                                }))
                    }
                }
            }
        });

        console.log(this.myChart);

        this.myChart.render({
            duration: 800,
            lazy: false,
            easing: 'easeOutQuad'
        });

        // console.log(myChart.toBase64Image());

        document.getElementById('chart-legends').innerHTML = this.myChart.generateLegend();


    }


    changeData(indexNo1, indexNo2, target) {
        let temp = null;

        temp = target[indexNo1];
        target[indexNo1] = target[indexNo2];
        target[indexNo2] = temp;

    }

    render(){

        return(
            <div>
                <div id="chart-legends"></div>
                <canvas id="myChart" width="400" height="400"></canvas>
                <div>
                    <button type="button" onClick={this.fncDestory}>destroy</button>
                    <button type="button" onClick={(e)=>this.addData(e, this.myChart,'Red',20)}>
                        addData
                    </button>
                </div>
            </div>
        )

    }
}