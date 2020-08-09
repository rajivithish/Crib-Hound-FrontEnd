import React, { Component, Fragment } from "react";
import UpsertCribModal from "../Modal/UpsertCribModal";
import {
    Table,
    Button,
    FormGroup,
    Row,
    Col,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from "reactstrap";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "react-tippy";
import Toast from "../Toast/Toast";
import { ToastContainer } from "react-toastify";
import Axios from "axios";
import LoadingSpinner from "../Loader/Loader";

class CribListTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: null,
            modal: false,
            id: null,
            loading: false,
        };
        this.imageRef = React.createRef();

        this.toggle = this.toggle.bind(this);
        this.searchSpace = this.searchSpace.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    toggle = (id) => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
            id: id,
        }));
    };

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword });
    };

    deleteItem = (id) => {
        this.setState({ loading: true });
        Axios.delete(`http://localhost:8080/api/cribs/${id}`)
            .then((res) => {
                Toast("delete", "Deleted");
                this.props.deleteItemFromState(id);
                this.setState({ loading: false });
                this.toggle();
            })
            .catch((err) => {
                this.setState({ loading: false });
                Toast("error", "Something Went Wrong");
            })
    };

    componentWillUnmount() {
        this.toggle.bind(this);
        this.searchSpace.bind(this);
        this.deleteItem.bind(this);
    }

    render() {
        const { loading } = this.state;
        const closeBtn = (<button className="close outline-none" onClick={this.toggle}> &times;</button>);
        const items = this.props.items.length ? this.props.items
            .filter((item) => {
                if (this.state.search == null) return item;
                else if (
                    item.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                    item.location.toLowerCase().includes(this.state.search.toLowerCase())
                ) {
                    return item;
                }
            })
            .map((item) => {
                return (
                    <tr key={item.id}>
                        <td>
                            <img
                                src={item.img}
                                ref={this.imageRef}
                                className="rounded-circle"
                                onError={(e) => { e.target.onerror = null; e.target.src = "default-thumbnail.jpg" }}
                                alt=''
                                height="50"
                                width="50"
                            />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.location}</td>
                        <td>
                            <UpsertCribModal
                                buttonLabel="Edit"
                                mode="Update"
                                item={item}
                                updateState={this.props.updateState}
                            />{" "}
                            <Tooltip title="Delete" position="top">
                                <MdDelete
                                    color="red"
                                    size="20px"
                                    className="cursor-pointer mt-1 mx-1"
                                    onClick={this.toggle.bind(this, item.id)}
                                ></MdDelete>
                            </Tooltip>
                        </td>
                    </tr>
                );
            }) : [];

        return (
            <Fragment>
                <Row>
                    <Col xs={8} sm={9} md={9} lg={10} >
                        <FormGroup className="w-50">
                            <Input
                                type="search"
                                placeholder="Search..."
                                onChange={(e) => this.searchSpace(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2}>
                        <Row className="justify-content-center">
                            <FormGroup>
                                <UpsertCribModal
                                    buttonLabel="Add Crib"
                                    mode="Add"
                                    addItemToState={this.props.addItemToState}
                                />
                            </FormGroup>
                        </Row>
                    </Col>
                </Row>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length ? (
                            items
                        ) : (
                                <Fragment>
                                    <tr>
                                        <td className="text-center" colSpan="5">
                                            <div>
                                                <span>No records found.</span>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            )}
                    </tbody>
                </Table>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Delete Record
          </ModalHeader>
                    <ModalBody>Are you sure want to delete this record?</ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>
                            Cancel
            </Button>
                        <Button
                            color="primary"
                            onClick={() => this.deleteItem(this.state.id)}>
                            Delete
            </Button>
                    </ModalFooter>
                </Modal>
                {loading && <LoadingSpinner />}
                <ToastContainer />
            </Fragment>
        );
    }
}

export default CribListTable;
