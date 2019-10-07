import React, {Component, useState} from 'react';

import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Modal from 'react-bootstrap/Modal';

export default function ChartModal() {

    const [lgShow, setLgShow] = useState(false);

    return (
        <ButtonToolbar className={'d-flex justify-content-center'}>
            <Button onClick={() => setLgShow(true)}>view</Button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Large Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal>
        </ButtonToolbar>
    )

}
