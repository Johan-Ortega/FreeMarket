import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';

import AddVideog from "./components/add-videog.component";
import VideogsList from "./components/videogs-list.component";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }
    return (
      
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/Videogs" className="navbar-brand">
            MarketFree
          </a>
          
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Videogs"} className="nav-link">
                Videogs
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div class="container">
      <Card style={{ width: '600px' }}>
        <Card.Header>
          { !login && 
            <FacebookLogin
              appId="483258963534731"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
          { login &&
            <Image src={picture} roundedCircle />
          }
        </Card.Header>
        { login &&
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              {data.email}
            </Card.Text>
          </Card.Body>
        }
      </Card>
    </div>
        <div className="container mt-3">
          <h2>Comienza a publicar</h2>
          <Switch>
            <Route exact path={["/", "/Videogs"]} component={VideogsList} />
            <Route exact path="/add" component={AddVideog} />
          </Switch>
        </div>
      </div>
    );
  }


export default App;


