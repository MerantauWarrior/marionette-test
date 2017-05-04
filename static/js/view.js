UsersManager.module('Users.List', function(List, UsersManager, Backbone, Marionette, $, _){

	List.Layout = Marionette.LayoutView.extend({
		template: '#contact-list-layout',
		regions:{
			panelRegion: '#panel-region',
			contactsRegion: '#contacts-region'
		}
	});
	
	List.Panel = Marionette.ItemView.extend({
		template: '#contact-list-panel',
		ui: {
			fname: '#firstName',
			lname: '#lastName'
		},
		events:{
			'click button.js-new': 'submitClicked',
			'click button.js-generate': 'generateClicked'
		},
		submitClicked: function(e){
			e.preventDefault();
			if(this.ui.fname.val() === '' || this.ui.lname.val() === ''){
				alert("Fill the form");
			}else{
				var data = { firstName: this.ui.fname.val(), lastName: this.ui.lname.val() };
				this.trigger('form:submit', data);
				console.log(data);
				this.ui.fname.val('');
				this.ui.lname.val('');
			}			
		},
		generateClicked: function(){
			var self = this;
			$.ajax({
				url: 'https://randomuser.me/api/',
				dataType: 'json',
				success: function(data) {
					var fname = data.results[0].name.first;
					var lname = data.results[0].name.last;
					var data = { firstName: fname, lastName: lname };
					self.trigger('form:generate', data);
				}
			});
		}
		
	});

	List.Contact = Marionette.ItemView.extend({
		tagName: 'tr',
		template: '#contact-list-item',
		id: 'tr-id',
		className: 'tr-class',
		events:{
			'click button.js-delete': 'deleteClicked'
		},
		deleteClicked: function(){
			this.model.destroy();
		}
	});
	
	var NoContactsView = Marionette.ItemView.extend({
		template: '#contact-list-none',
		tagName: 'tr',
		className: 'warning'
	});
	
	List.Contacts = Marionette.CompositeView.extend({
		tagName: 'table',
		className: 'table table-hover',
		template: '#contact-list',
		emptyView: NoContactsView,
		childView: List.Contact,
		childViewContainer: 'tbody'
	});

})