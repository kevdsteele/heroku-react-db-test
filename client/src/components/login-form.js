import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            statusMessage: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ' + response.data)
                console.log(response)
                
                if (response.status === 200) {
                    // update App.js state
                    console.log("Name is " + response.data.firstName)
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
                        firstName:response.data.firstName,
                        lastName:response.data.lastName
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error.message);
                this.setState({statusMessage: 'Login error. Please check your username and password'})
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="row">
  
                <div className="card">
                    <img src="images/login-img.jpg" className="card-img-top login-img" alt="login" />
                    <div className="card-body">
                        <h5 className="card-title text-center">Please Login</h5>

                    <form className="mt-3">
                        <div className="form-group">
                            <div className="form-row">
                                <label className="form-label text-left" htmlFor="username">Email address</label>
                            </div>
                            <div className="form-row">
                                <input className="form-input w-100"
                                    type="email"
                                    id="username"
                                    name="username"
                                    placeholder="Email address"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <label className="form-label text-left" htmlFor="password">Password: </label>
                            </div>
                            <div className="form-row">
                                <input className="form-input w-100"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className=""></div>
                            <button
                                className=""
                               
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                        </div>
                    </form>
                    <div>
					<h6 className="status-message text-center">{this.state.statusMessage}</h6>
				</div>
                    </div>


</div>


</div>  

                  
                
            )
        }
    }
}

export default LoginForm
