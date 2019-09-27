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

                <div className="row App-header" id="nav-container">
                    <div className="col-md-4 justify-content-start">
                        <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>

                    <div className="col-md-4 text-center pt-2 mt-4">
                    <h1 className="App-title ">Welcome to Green Point</h1>
                    </div>

                    <div className="col-md-4" >
                        {loggedIn ? (


<nav className="navbar navbar-expand-lg mt-3 text-white">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul className="navbar-nav justify-content-end">
    <Link to="#" className="nav-item nav-link">
                                        <li className="nav-item">
                                       Learn
                                        </li>
                                    </Link>   

                                     <Link to="#" className="nav-item nav-link">
                                        <li className="nav-item">
                                       Track
                                        </li>
                                    </Link> 

                                     <Link to="#" className="nav-item nav-link">
                                        <li className="nav-item">
                                        Challenge
                                        </li>
                                    </Link>  
                                    <Link to="#" className="nav-item nav-link" onClick={this.logout}>
                                        <li className="nav-item">
                                        Logout
                                        </li>
                                    </Link>  
    
    </ul>
  </div>
</nav>

                            // <section className="nav justify-content-end">
                            //     <Link to="#" className="nav-item" >
                            //     <span className="">learn</span></Link>
                            //     <Link to="#" className="nav-item" >
                            //     <span className="text-secondary">track</span></Link>
                            //     <Link to="#" className="nav-item" >
                            //     <span className="text-secondary">compete</span></Link>
                            //     <Link to="#" className="nav-item" onClick={this.logout}>
                            //     <span className="">logout</span></Link>
                     

                            // </section>
                        ) : (


<nav className="navbar navbar-expand-lg mt-3 text-white">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul className="navbar-nav justify-content-end">
    <Link to="/" className="nav-item nav-link">
                                        <li className="nav-item">
                                        Home
                                        </li>
                                    </Link>   

                                     <Link to="/login" className="nav-item nav-link">
                                        <li className="nav-item">
                                       Login
                                        </li>
                                    </Link> 

                                     <Link to="/signup" className="nav-item nav-link">
                                        <li className="nav-item">
                                        Signup
                                        </li>
                                    </Link>  
    
    </ul>
  </div>
</nav>


                                // <nav className="navbar">
                                //     <ul class="navbar-nav d-block justify-content-end">
                                  
                                  
                                   
                                //     </ul>

                                // </nav>
                            )}
                    </div>
                    
                </div>
            </div>

        );

    }
}

export default Navbar