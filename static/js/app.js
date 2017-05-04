var UsersManager = new Marionette.Application();

UsersManager.addRegions({
	mainRegion: '#app-container'
});


UsersManager.on("start", function(){
	var contacts = new UsersManager.Users.ContactCollection();
	contacts.fetch();	
	
	var modelNew = new UsersManager.Users.Contact();
	var usersListLayout = new UsersManager.Users.List.Layout();
	var usersListPanel = new UsersManager.Users.List.Panel({
		model: modelNew
	});
	var usersListView = new UsersManager.Users.List.Contacts({
		collection: contacts
	});	
	
	usersListPanel.on('form:submit', function(data){
		contacts.create(data, {wait: true});
	});
	usersListPanel.on('form:generate', function(data){
		contacts.create(data, {wait: true});
	});
	usersListLayout.on('show', function(){
		usersListLayout.panelRegion.show(usersListPanel);
		usersListLayout.contactsRegion.show(usersListView);
	});	
	UsersManager.mainRegion.show(usersListLayout);
});