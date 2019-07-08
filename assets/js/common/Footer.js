import React, {Component} from 'react';

export default class Footer extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2019</span>
                    </div>
                </div>
            </footer>
        )
    }
}
