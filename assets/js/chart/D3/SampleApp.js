import React, {Component} from 'react';
import Sample from './Sample';

export default class SampleApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [12, 5, 6, 6, 9, 10],
            width: 500,
            height: 300,
            id: "root"
        }

    }



    render() {
        return (
            <div className="App">
                <Sample
                    data={this.state.data}
                    width={this.state.width}
                    height={this.state.height}
                    id={this.state.id}
                />
            </div>
        );
    }
}