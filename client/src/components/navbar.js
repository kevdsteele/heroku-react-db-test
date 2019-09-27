import React, { Component } from 'react'
//import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>

                <header className="navbar App-header" id="nav-container">
                <div className="col-4 justify-content-start">
                    <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                        
                    </div>
                    <div className="col-4 text-center">
                    <h1 className="App-title">Welcome to Green Point</h1>
                    </div>
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section justify-content-end">
                                <Link to="#" className="btn  btn-outline-success" >
                                <span className="">learn</span></Link>
                                <Link to="#" className="btn btn-outline-success" >
                                <span className="text-secondary">track</span></Link>
                                <Link to="#" className="btn btn-outline-success" >
                                <span className="text-secondary">compete</span></Link>
                                <Link to="#" className="btn btn-outline-success" onClick={this.logout}>
                                <span className="">logout</span></Link>
                     

                            </section>
                        ) : (
                                <section className="navbar-section justify-content-end">
                                    <Link to="/" className="btn btn-outline-success">
                                        <span className="">home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-outline-success">
                                    <span className="">login</span>
				</Link>
                                    <Link to="/signup" className="btn btn-outline-success">
                                    <span className="">sign up</span>
				</Link>
                                </section>
                            )}
                    </div>
                    
                </header>
            </div>

        );

    }
}

export default Navbar