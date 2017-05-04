UsersManager.module('Users', function(Users, UsersManager, Backbone, Marionette, $, _){

	Users.Contact = Backbone.Model.extend({
		defaults: {
			firstName: '',
			lastName: ''
		},		
		parse: function( response ) {
			response.id = response._id;
			return response;
		}
	});
	
	Users.ContactCollection = Backbone.Collection.extend({
		model: Users.Contact,
		url: '/api/users',
		comparator: function(contact){
			return contact.get('firstName') + " " + contact.get('lastName');
		}		
	});

})