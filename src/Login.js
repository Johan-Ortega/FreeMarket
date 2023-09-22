import React, {Component} from "react";
import { Button } from '@material-ui/core';
import fire from "./firebase";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }

    login(){
        let provider = new fire.auth.GoogleProvider();

        fire.auth().signInWithPopup(provider).then(result=>{console.log(result)})
    }

    render(){
        return(
            <div>
                <Button variant = "container" onClick= {this.login}>
                Iniciar Sesion con Google
                </Button>
            </div>
        );
    }
}