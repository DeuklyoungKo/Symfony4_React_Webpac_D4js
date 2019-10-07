import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChartList from './ChartList';

export default class Charts extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="container-fluid">
                <ChartList/>
            </div>
        )
    }
}
