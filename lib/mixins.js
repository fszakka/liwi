'use strict';

var
Messages = require( './messages' )

var
TextBoxMixin = {
	getInitialState: function () {
		return {
			value: '',
			isRequired: this.props.required,
			isValid: true,
			errorSpan: ''
		}
	},
	validate: function ( value ) {
		if( this.state.isRequired && ( value === '') ){
			this.setState(
				{
					errorSpan: Messages.isRequired
				}
			)
		}else{
			this.setState(
				{
					value: value ,
					errorSpan: ''
				}
			)
		}
	},
	onChange: function ( e ) {
		this.validate( e.target.value )
	},
	onBlur: function ( e ) {
		this.validate( e.target.value )
	},
}

var
IntegerBoxMixin = {
	getInitialState: function () {
		return {
			value: '',
			isRequired: this.props.required,
			isValid: false,
			errorSpan: ''
		}
	},
	validate: function ( value ) {
		// eval the input if is integer only
		if ( /^([0-9])+$/.test( value ) ) {
			this.setState(
				{
					value: value,
					isValid: true,
					errorSpan: ''
				}
			)
		}else{
			this.setState(
				{
					value: value,
					isValid: false,
					errorSpan: Messages.wrongFormat
				}
			)
		}
	},
	onChange: function ( e ) {
		this.validate( e.target.value )
	},
	onBlur: function ( e ) {
		this.validate( e.target.value )
	},
}

var
TextAreaMixin = {
	getInitialState: function () {
		return {
			value: '',
			isRequired: this.props.required,
			isValid: false,
			errorSpan: ''
		}
	},
	validate: function ( value ) {
		if ( value ) {
			this.setState({ value: value })
		}
	},
	onChange: function ( e ) {
		this.validate( e.target.value )
	},
	onBlur: function ( e ) {
		this.validate( e.target.value )
	},
}

var
DropDownListMixin = {
	getInitialState: function () {
		return {
			isRequired: this.props.required,
			isValid: false,
			errorSpan: ''
		}
	},
	onChange: function ( e ) {
		this.setState({ value: e.target.value })

		if ( this.props.onChage ) {
			this.props.onChange( e )
		}
	},
}

module.exports = {
	TextBoxMixin 		: TextBoxMixin,
	IntegerBoxMixin		: IntegerBoxMixin,
	TextAreaMixin		: TextAreaMixin,
	DropDownListMixin	: DropDownListMixin
}
