import React, { Component, Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { ToastContainer } from "react-toastify";
import Toast from "../Toast/Toast";
import Axios from "axios";
import LoadingSpinner from "../Loader/Loader";

class UpsertCribForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: "",
            name: "",
            location: "",
            errors: {},
            loading: false,
        };
        this.submitFormEdit = this.submitFormEdit.bind(this);
        this.submitFormAdd = this.submitFormAdd.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        if (this.validateForm()) {
            Axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(res => {
                    const newData = {
                        id: Date.now(),
                        img: this.state.img,
                        name: this.state.name,
                        location: this.state.location,
                    }
                    Toast('success', 'Added');
                    this.props.addItemToState(newData, false)
                    this.props.toggle();
                    this.setState({ loading: false })
                })
                .catch(err => {
                    Toast('error', 'Something Went Wrong');
                })
        } else {
            this.setState({ loading: false })
        }
    }

    submitFormEdit = e => {
        e.preventDefault();
        this.setState({ loading: true }, () => {
            if (this.validateForm()) {
                Axios.get('https://jsonplaceholder.typicode.com/posts')
                    .then(res => {
                        const newData = {
                            id: this.state.id,
                            img: this.state.img,
                            name: this.state.name,
                            location: this.state.location,
                        }
                        Toast('success', 'Updated');
                        this.props.updateState(newData);
                        this.props.toggle();
                        this.setState({ loading: false });
                    })
                    .catch(err => {
                        Toast('error', 'Something Went Wrong');
                    })
            } else {
                this.setState({ loading: false })
            }
        })

    }

    validateForm() {
        let { img, name, location } = this.state;
        let errors = {};
        let formIsValid = true;

        if (!img) {
            formIsValid = false;
            errors["img"] = "*Please enter a url.";
        }

        // if (img) {
        //   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        //   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        //   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        //   '(\\#[-a-z\\d_]*)?$','i'); 
        //   if (!pattern.test(img)) {
        //     formIsValid = false;
        //     errors["img"] = "*Please enter valid url.";
        //   }
        // }

        if (!name) {
            formIsValid = false;
            errors["name"] = "*Please enter a name.";
        }
        if (!location) {
            formIsValid = false;
            errors["location"] = "*Please enter a location.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const { id, img, name, location } = this.props.item;
            this.setState({ id, img, name, location });
        }
    }

    componentWillUnmount() {
        this.submitFormEdit.bind(this);
        this.submitFormAdd.bind(this);
        this.onChange.bind(this);
    }

    render() {
        const { loading } = this.state;
        return (
            <Fragment>
                <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                    <FormGroup>
                        <Label for="imgUrl">Image Url</Label>
                        <Input type="text" name="img" id="imgUrl" onChange={this.onChange} value={this.state.img || ''} />
                        <div className="errorMsg">{this.state.errors.img}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name || ''} />
                        <div className="errorMsg">{this.state.errors.name}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location || ''} />
                        <div className="errorMsg">{this.state.errors.location}</div>
                    </FormGroup>
                    <Row>
                        <Col className="text-right">
                            <Button color="danger" onClick={() => this.props.toggle()} className="mlr-5">Cancel</Button>
                            <Button color="primary" className="mlr-5">{this.props.mode}</Button>
                        </Col>
                    </Row>
                    {loading && <LoadingSpinner />}
                    <ToastContainer />
                </Form>
            </Fragment>
        );
    }
}

export default UpsertCribForm;
