import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Modal from 'react-bootstrap/Modal';
import Chart from './Chart';
import Axios from "axios";


export default function ChartModal(prop) {

    const [lgShow, setLgShow] = useState(false);
    const [data, setData] = useState({result:[{title:'defaultTitle'}]});

    const {id} = prop.data;


    useEffect(()=>{




        const fetchData =  async () => {
            const result = await Axios.get(
                'http://reactjs.test.com/chart/data/'+id
            );

            setData(result.data);
        };

        fetchData();

    },[]);


    return (
        <ButtonToolbar className={'d-flex justify-content-center'}>
            <Button onClick={() => setLgShow(true)}>view</Button>
            <Modal
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                dialogClassName={"modal-90w"}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {data.result[0].title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Chart
                        id={id}
                    />
                </Modal.Body>
            </Modal>
        </ButtonToolbar>
    )

}

ChartModal.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number
    })
};
