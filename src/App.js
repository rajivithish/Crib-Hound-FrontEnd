import React, { Component, Fragment } from 'react';
import CribListTable from './Components/Table/CribListTable';
// import NavBar from './Components/NavBar/NavBar';
import Toast from "./Components/Toast/Toast";
import { Container, Row, Col, Navbar } from 'reactstrap';
import LoadingSpinner from './Components/Loader/Loader';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'react-tippy/dist/tippy.css'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: false
    };
  }

  getItems() {
    this.setState({ loading: true });
    Axios('http://localhost:8080/api/cribs', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (res && res.data.length) {
        this.setState({
          loading: false,
          items: [...res.data]
        })
      }
      else {
        this.setState({
          loading: false,
          items: res
        })
      }

    })
      .catch(err => {
        this.setState({ loading: false });
        Toast("error", "Something Went Wrong");
      })
  }

  addItemToState = (item, isLoading) => {
    this.setState({
      items: [...this.state.items, item],
      loading: isLoading
    })
  }

  updateState = (item,isLoading) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id);
    const newArray = [
      ...this.state.items.slice(0, itemIndex), item,
      ...this.state.items.slice(itemIndex + 1)
    ];
    this.setState({
      items: newArray,
      loading: isLoading
    });
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updatedItems });
  }

  componentDidMount() {
    this.getItems();
  }

  componentWillUnmount() {
    this.getItems();
    this.addItemToState();
    this.updateState();
    this.deleteItemFromState();
  }

  render() {
    const { loading } = this.state;
    const ResultsTable = <Container className="App">
      <Row>
        <Col className="text-center">
          <h1 className="my-3">Crib Hound</h1>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <CribListTable items={this.state?.items} updateState={this.updateState}
            addItemToState={this.addItemToState} deleteItemFromState={this.deleteItemFromState} />
        </Col>
      </Row>
    </Container>;
    return (
      <Fragment>
        {loading ? <LoadingSpinner /> : ResultsTable}
      </Fragment>
    )
  }
}

export default App
