// Name Space
Ti.App.session = {
	// Global Var
	clientId: false,
	clients: [],
	
	// Table view
	table: core.ui.getTableView(),
	
	// Windows
	mainWindow : core.ui.getWindow({ title:'Pick a dealer' }),
	
	// Main Tab
	/*tab : core.ui.getTab({  
			icon:'KS_nav_ui.png',
			title:'Scanner'
	}),*/
	
	// Event Handlers
	clickDealerRow : function(e){
		Ti.API.info( 'ROW: ');
		Ti.API.info( e.rowData.dealerInfo );
	}
};

// Arrange Components
Ti.App.session.mainWindow.add(Ti.App.session.table);

// Fetch all the clients when app loads
Ti.App.session.mainWindow.addEventListener('open',function(){
	// Check to make sure we have no clients
	if( Ti.App.session.clients.length > 0 ) {
		return;
	}
	
	// MDV API: /getDealers
	core.mdv_api.getDealers(function(clients){
		// Check for error
		if( clients[0] && clients[0].error ) {
			alert(clients[0].message);
		}
		
		// Save clients
		Ti.App.session.clients = clients;
		//Ti.API.info("Captured clients?: "+JSON.stringify(Ti.App.session.clients));
		var data = [];
		
		// Iterate through clients and make table data
		for( var i=0; i < clients.length; i++ ) {
			
			// Get dealer object
			var dealer = clients[i];
			
			// Add to collection
			data.push({
				title:dealer.BUSINESS_NAME,
				dealerInfo:dealer
			});
		}
		// Add rows to table
		Ti.App.session.table.addEventListener('click', Ti.App.session.clickDealerRow )
			
		Ti.App.session.table.data = data;
		
	});
	
});