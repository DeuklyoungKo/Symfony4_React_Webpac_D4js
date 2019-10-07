import React, {Component} from 'react';

export default class Constructing extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="text-center">
                <div className="error mx-auto" data-text="503">503</div>
                <p className="lead text-gray-800 mb-5">This page is under construction</p>
                <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                <a href="/">&larr; Back to Dashboard</a>
            </div>

        )
    }

}
