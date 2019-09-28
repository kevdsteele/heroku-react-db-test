import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			confirmPassword: '',
			statusMessage: ''

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
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName

		})
			.then(response => {
				//console.log(response)
				if (!response.data.error) {
					console.log('successful signup')
					this.props.updateUser({
						loggedIn: true,
						username: this.state.username,
						firstName: this.state.firstName,
						lastName: this.state.lastName
					  })
					this.setState({ //redirect to login page
						redirectTo: '/',
						statusMessage: "Successful signup"


					})

					

					
				} else {
					console.log('username already taken')
					this.setState({
						statusMessage:"Username already taken"
					})
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	if (this.state.redirectTo) {
		return <Redirect to={{ pathname: this.state.redirectTo,
		loggedIn:true }} />
	} else {
	return (
		<div className="row">
  
		<div className="card">
			<img src="images/login-img.jpg" className="card-img-top login-img" alt="login" />
			<div className="card-body signup">
				<h5 className="card-title text-center">Signup</h5>
			<form className="mt-3">
				<div className="form-row">
				<div className="form-group col-6">
					<div className="">
						<label className="form-label text-left" htmlFor="username">First Name</label>
					</div>
					<div className="">
						<input className="form-input w-100"
							type="text"
							id="username"
							name="firstName"
							placeholder="First name"
							value={this.state.firstName}
							onChange={this.handleChange}
						/>
					</div>
				</div>

				<div className="form-group col-6">
					<div className="">
						<label className="form-label" htmlFor="username">Last Name</label>
					</div>
					<div className="">
						<input className="form-input w-100 "
							type="text"
							id="username"
							name="lastName"
							placeholder="Last Name"
							value={this.state.lastName}
							onChange={this.handleChange}
						/>
					</div>
				</div>

				</div>

				<div className="form-group">
					<div className="">
						<label className="form-label text-left" htmlFor="username">Email address</label>
					</div>
					<div className="">
						<input className="form-input w-100"
							type="text"
							id="username"
							name="username"
							placeholder="Email address"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
				</div>


				<div className="form-group">
					<div className="">
						<label className="form-label text-left" htmlFor="password">Password: </label>
					</div>
					<div className="">
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
						type="submit"
					>Sign up</button>
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

export default Signup
