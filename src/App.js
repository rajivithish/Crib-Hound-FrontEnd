import React, { Component, Fragment } from 'react';
import CribListTable from './Components/Table/CribListTable';
// import NavBar from './Components/NavBar/NavBar';
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
    this.setState({ loading: true }, () => {
      Axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(result => this.setState({
          loading: false,
          items: [
            {
              id: 10,
              name: 'Amygdala homes',
              img:
                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&w=1000& q=80',
              location: 'Chennai'
            },
            {
              id: 11,
              name: 'Fairbanks Ltd',
              img:
                'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&w=1000&q=80',
              location: 'Pondicherry'
            },
            {
              id: 12,
              name: 'Dale homes',
              img: 'https://i.pinimg.com/736x/2f/82/39/2f823993ba069d0aa966144e6f20d459.jpg',
              location: 'Trichy'
            },
            {
              id: 13,
              name: 'Triptico Properties',
              img:
                'https://media.gettyimages.com/photos/idyllic-home-with-covered-porch-picture-id479767332?s=612x612',
              location: 'Madurai'
            },
            {
              id: 14,
              name: 'MC homes',
              img:
                'https://images.livemint.com/img/2019/04/16/600x338/Kerala_1555430371601.jpg',
              location: 'Kanyakumari'
            },
          ],
        }));
    });
  }

  addItemToState = (item, isLoading) => {
    this.setState(prevState => ({
      items: [...prevState.items, item],
      loading: isLoading
    }));
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id);
    const newArray = [
      ...this.state.items.slice(0, itemIndex), item,
      ...this.state.items.slice(itemIndex + 1)
    ];
    this.setState({ items: newArray });
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
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
          <CribListTable items={this.state.items} updateState={this.updateState}
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
