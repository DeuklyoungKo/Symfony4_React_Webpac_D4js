import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';

import Axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ChartModal from './ChartModal';

export default class ChartList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: 0,
            pages: null,
            loading: true
        };

    }

    componentDidMount() {

    }

    render() {

        const { data, pages, loading } = this.state;


        const columns = [{
            Header: 'Title',
            accessor: 'title', // String-based value accessors!
            Cell: props => (<div className='number text-center'>{props.value}</div>)
        }, {
            Header: 'startYear',
            accessor: 'startYear',
            headerStyle: {textAlign: 'center'},
            Cell: props => (<div className='number text-center'>{props.value}</div>)
        }, {
            Header: 'endYear',
            accessor: 'endYear',
            Cell: props => <div className='number text-center'>{props.value}</div> // Custom cell components!
        }, {
            Header: 'createdAt',
            accessor: 'createdAt',
            Cell: props => <div className='number text-center'>{props.value}</div> // Custom cell components!
        }, {
            Header: 'view',
            accessor: 'id',
            Cell: props =>  <ChartModal data={props.original} />
        }]




        return (
                <ReactTable

                    columns={columns}
                    data={this.state.data} // should default to []
                    pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                    loading={this.state.loading}
                    manual
                    defaultPageSize={5}
                    onFetchData={(state) => {

                        // show the loading overlay
                        this.setState({loading: true})
                        // fetch your data
                        Axios.post('http://reactjs.test.com/chart/data/', {
                            page: state.page+1,
                            pageSize: state.pageSize,
                            sorted: state.sorted,
                            filtered: state.filtered
                        })
                            .then((res) => {

                                // Update react-table
                                this.setState({
                                    data: res.data.rows,
                                    pages: res.data.pages,
                                    loading: false
                                })
                            })
                    }}
                />
        )
    }
}
