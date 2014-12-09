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
