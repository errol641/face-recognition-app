import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import {particleOptions} from './ParticleOptions';
import ENDPOINTS from './endpoints';
import './App.css';

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }});
  }

  calculateFaceLocation = (boundingBox) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return ({
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - (boundingBox.right_col * width),
      bottomRow: height - (boundingBox.bottom_row * height)
    });
  }

  displayBoundingBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onImageSubmit = () => {
    // Set image url
    this.setState({imageUrl: this.state.input});

    // Call API
    fetch(ENDPOINTS.IMAGE_SUBMIT, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if(response) {
          // Display box
          this.displayBoundingBox(this.calculateFaceLocation(response));
          
          // Update enteries
          fetch(ENDPOINTS.UPDATE_SCORE, {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
          })
          .then(res => {
            if(res.ok) {
              res.json().then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}));
              });
            }
          })
          .catch(err => {
              // error occured while updating enteries
          })
        }
      })
    .catch(err => {
        // face recognition API error
    });
  }

  onRouteChange = (route) => {
    if(route === 'signin') {
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    const { name, entries } = this.state.user;
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
          ? <div>
              <Logo/>
              <Rank name={name} entries={entries} />
              <ImageLinkForm onImageSubmit={this.onImageSubmit}
                             onInputChange={this.onInputChange}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin' 
              ? <SignIn SIGN_IN={ENDPOINTS.SIGN_IN} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register REGISTER={ENDPOINTS.REGISTER} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
