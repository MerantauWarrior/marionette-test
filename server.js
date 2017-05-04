'use strict';

// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://localhost/users_database' );

//Schemas

var Book = new mongoose.Schema({
	firstName: String,
	lastName: String
});

//Models
var BookModel = mongoose.model( 'Book', Book );

// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//perform route lookup based on url and HTTP method
	app.use( app.router );

	//Where to serve static content
	app.use( express.static( path.join( application_root, 'static') ) );

	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
	response.send( 'Users API is running' );
});

//Get a list of all books
app.get( '/api/users', function( request, response ) {
	return BookModel.find( function( err, books ) {
		if( !err ) {
			return response.send( books );
		} else {
			return console.log( err );
		}
	});
});

//Get a single book by id
app.get( '/api/users/:id', function( request, response ) {
	return BookModel.findById( request.params.id, function( err, book ) {
		if( !err ) {
			return response.send( book );
		} else {
			return console.log( err );
		}
	});
});

//Insert a new book
app.post( '/api/users', function( request, response ) {
	var book = new BookModel({
		firstName: request.body.firstName,
		lastName: request.body.lastName
	});
	book.save( function( err ) {
		if( !err ) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
		return response.send( book );
	});
});

//Delete a book
app.delete( '/api/users/:id', function( request, response ) {
	console.log( 'Deleting book with id: ' + request.params.id );
	return BookModel.findById( request.params.id, function( err, book ) {
		return book.remove( function( err ) {
			if( !err ) {
				console.log( 'Book removed' );
				return response.send( '' );
			} else {
				console.log( err );
			}
		});
	});
});

//Start server
var port = 3000;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
	console.log( application_root );
});