!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Liwi=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var
object = require( './object' ),
Fields = require( './fields' )


var
Field = function( props ){
	switch( props.type ){
		/**
		* Render a TextBox Field
		*/
		case 'text':
			return React.createElement(Fields.TextBox, props)
			break
		/**
		* Render a TextBox Field
		*/
		case 'password':
			return React.createElement(Fields.TextBox, props)
			break
		/**
		* Render a TextBox Field
		*/
		case 'int':
			return React.createElement(Fields.IntegerBox, props)
			break
		/**
		* Am Blowing Up, can't believe you did nothing, jerk
		*/
		default:
			throw new Error('Have no idea what kind of field you want rendered')
	}
}

var
/**
* A Collection of HTML Field Controls to render by BaseForm
*/
RenderFields = function ( fields ) {
	// Step 1: extract keys
	var controls = Object.keys(fields)
	var renders = []
	var count = 1

	// Step 2: get controls
	while( controls.length > 0){
		// get control
		var key = controls.pop()
		var props = object.extend({}, fields[key])

		/**
		* add name to props
		*/
		props.name = key.toString() // useful for <input name='' />
		props.key = count++ // TODO: please fix me, use React key iter

		/**
		* Check for the type of field to render
		*/
		if ( (Object.keys( props ).indexOf('type') === -1) ) {
			// TODO: Please fix me
			throw new Error('Can\'t determine the type of ' + key + ' field' )
		}

		/**
		* add the control to the list of controls to render
		*/
		renders.push( Field( props ) )
	}
	/**
	* reverse the rendering order
	*/
	renders.reverse() // TODO: that's alot of work for my computer

	return renders
}

var
BaseForm = React.createClass({displayName: 'BaseForm',

	getInitialState: function (  ) {
		return {
			fields: this.props.fields
		}
	},
	componentDidMount: function ( ) {

	},
	render: function (  ) {
		/**
		* Loop over the Form Fields so we can
		* do some few hacks to them
		*/
		var renderFields = RenderFields( this.state.fields ).map( function ( field ) {
			// TODO: React key
			return field
		})


		return React.DOM.form({className: 'liwi-baseform'},
			renderFields
		)
	},
})

module.exports = {
	BaseForm	: BaseForm,
}

},{"./fields":2,"./object":4}],2:[function(require,module,exports){
'use strict';


var
Label = React.createClass({displayName: 'Label',

	render: function ( ) {

		return React.DOM.label({htmlFor: this.props.htmlFor}, this.props.label)
	},
})

var
/**
* HTML <input type='text|password' />
*/
TextBox = React.createClass({displayName: 'TextBox',

	componentDidMount: function () {
	},
	render: function ( ) {
		if ( this.props.label ) {
			return React.DOM.dl(null,
				React.DOM.dt(null,
					React.createElement(
						Label,
						{
							label: this.props.label,
							htmlFor: this.props.name
						}
					)
				),
				React.DOM.dd(null,
					React.DOM.input(
						{
							type: this.props.type,
							name: this.props.name,
							id: this.props.name
						}
					)
				)
			)
		}else {
			return React.DOM.input(
				{
					type: this.props.type
				}
			)
		}
	},

})

var
/***/
IntegerBox = React.createClass({displayName: 'IntegerBox',

	onChange: function ( e ) {
		// eval the input if is integer only
		if ( /^([0-9])+$/.test( e.target.value ) ) {
			console.log( 'match' )
		}else{
			console.error( 'don\'t match' )
		}
	},
	render: function (  ) {
		if ( this.props.label ) {
			return React.DOM.dl(null,
				React.DOM.dt(null,
					React.createElement(
						Label,
						{
							label: this.props.label,
							htmlFor: this.props.name
						}
					)
				),
				React.DOM.dd(null,
					React.DOM.input(
						{
							type: 'text',
							name: this.props.name,
							id: this.props.name,
							onChange: this.onChange
						}
					)
				)
			)
		}else {
			return React.DOM.input(
				{
					type: 'text',
					onChange: this.onChange
				}
			)
		}

	},
})

// TODO: HTML <input type='password' />

module.exports = {
	TextBox				: TextBox,
	IntegerBox			: IntegerBox,
}

},{}],3:[function(require,module,exports){
/* Felix Boamah <dotfelixb@gmail.com> <github.com/dotfelixb> */
'use strict';
var
base = require( './base' ),
object = require( './object' )


module.exports = {
	BaseForm	: base.BaseForm,
	Type		: object.type,
}

},{"./base":1,"./object":4}],4:[function(require,module,exports){
'use strict';

// var hasOwn = Object.prototype.hasOwnProperty
var toString = Object.prototype.toString

function type( ob ) {
	return toString.call(ob).slice(8, -1).toLowerCase()
}

function extend( dest , src ) {
	for( var prop in src){
		dest[prop] = src[prop]
	}
	return dest
}

module.exports = {
	type 		: type,
	extend		: extend
}

},{}]},{},[3])(3)
});