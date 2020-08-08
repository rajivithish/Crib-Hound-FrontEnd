import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import UpsertCribForm from '../Form/UpsertCrib'
import { ToastContainer } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import Tippy from '@tippy.js/react';
import { Tooltip } from 'react-tippy';

class UpsertCribModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    componentWillUnmount() {
        this.toggle.bind(this);
    }

    render() {
        const closeBtn = <button className="close outline-none" onClick={this.toggle}>&times;</button>;
        const label = this.props.buttonLabel;
        let button = '';
        let title = '';
        if (label === 'Edit') {
            button = <Tooltip title="Edit" position="top">
                <MdModeEdit
                    color="purple"
                    size='20px'
                    onClick={this.toggle}
                    className="float-left cursor-pointer mt-1 mx-1">{label}
                </MdModeEdit>
            </Tooltip>
            title = 'Edit crib'
        } else {
            button = <Button
                color="success"
                onClick={this.toggle}
                className="float-left">
                {label}
            </Button>
            title = 'Add crib'
        }

        return (
            <Fragment>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} className="" close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        <UpsertCribForm
                            addItemToState={this.props.addItemToState}
                            updateState={this.props.updateState}
                            toggle={this.toggle}
                            item={this.props.item}
                            {...this.props} />
                    </ModalBody>
                </Modal>
                <ToastContainer />
            </Fragment>
        )
    }
}

export default UpsertCribModal
