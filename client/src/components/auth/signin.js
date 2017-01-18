import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
	handleFormSubmit({ email, password }){
		console.log(email, password);
		//need to do something to log user in
		this.props.signinUser({ email, password });
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<Field name='email' component='input' type='text' className='form-control'/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<Field name='password' component='input' type='text' className='form-control'/>
				</div>
				<button action='submit' className='btn btn-primary'>Sign in</button>
			</form>
		)
	}
}

Signin = reduxForm({
	form: 'signin'
})(Signin);

export default connect(null, actions)(Signin);
