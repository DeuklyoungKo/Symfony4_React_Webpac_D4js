import React, { Component } from 'react';
import ListChartLibaray from './chart/ListChartLibrary';
import ChartjsIndex from './chart/chartjs/ChartjsIndex';
import ReactVisIndex from './chart/ReactVis/Index';
import C3jsIndex from './chart/C3js/Index';
import D3BarChartApp from './chart/D3/BarChartApp';
import D3SampleApp from './chart/D3/SampleApp';

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      chartLibraryId: 'D3',
      _content: ''
    };


    this.listOfChartLibrary = [
      {
        id: 'D3',
        text: 'D3',
        name: 'D3',
        link: '#'
      },
      {
        id: 'D3SampleApp',
        text: 'D3SampleApp',
        name: 'D3SampleApp',
        link: '#'
      },
      {
        id: 'ChartJs',
        text: 'Chart.js',
        name: 'chartjs',
        link: '#'
      },
      {
        id: 'ReactVis',
        text: 'React-Vis',
        name: 'React-Vis',
        link: '#'
      },
      {
        id: 'C3',
        text: 'C3js',
        name: 'C3js',
        link: '#'
      },
      {
        id: 'test',
        text: 'test',
        name: 'test',
        link: '/test.html'
      }
    ];

    this.handleOnClickLink = this.handleOnClickLink.bind(this);

  }

  getContent() {

    let _content = null;

    switch (this.state.chartLibraryId) {
      case 'ChartJs':
        _content = <ChartjsIndex/>;
        break;

      case 'ReactVis':
        _content = <ReactVisIndex/>;
        break;

      case 'C3':
        _content = <C3jsIndex/>;
        break;

      case 'D3':
        _content = <D3BarChartApp/>;
        break;

      case 'D3SampleApp':
        _content = <D3SampleApp/>;
        break;

      case 'test':
        _content = 'todo:test content';
        break;

      default:
        _content = <p>select Chart Library, Please!</p>;
    }

    return _content;
  }


  handleOnClickLink(e, chartId) {
    e.preventDefault();

    this.setState({
      chartLibraryId: chartId
    });
  }


  render() {

    const listOfChartLibrary = this.listOfChartLibrary;
    const handleOnClickLink = this.handleOnClickLink;

    console.log('listOfChartLibrary==', listOfChartLibrary);

    const title = listOfChartLibrary
      .filter(item => item.id === this.state.chartLibraryId)[0].text;
    console.log(listOfChartLibrary);

    console.log(listOfChartLibrary.filter(item => item.id === this.state.chartLibraryId)[0].text);

    return (
      <div>
        <ListChartLibaray
          {...this.props}
          {...this.state}
          listOfChartLibrary={listOfChartLibrary}
          handleOnClickLink={handleOnClickLink}
        />
        <h1>
          {title}
        </h1>
        {this.getContent()}
      </div>
    );
  }
}
