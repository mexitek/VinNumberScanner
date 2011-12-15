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
		Ti.API.info( 'ROW: '+JSON.stringify(e.row) );
		Ti.API.info( 'ROWDATA: '+JSON.stringify(e.rowData) );
		Ti.API.info( 'SOURCE: '+JSON.stringify(e.source) );
		Ti.API.info( 'e: '+JSON.stringify(e) );
		Ti.API.info( 'Client Index: '+JSON.stringify( Ti.App.session.clients ) );
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
			
			// Create a row
			var row = core.ui.getTableViewRow();
			//row.selectedBackgroundColor = '#fff';
			//row.height = 70;
			//row.className = 'datarow';
			//row.clickName = 'row';
			
			var label = core.ui.getLabel({ 
				text:dealer.BUSINESS_NAME,
				color:'#576996',
				font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
				//left:70,
				//top:10,
				//height:30,
				//width:200,
				clickName:'user',
			    textAlign:'center'
			});
			// Put it together
			row.filter = label.text;
			row.add(label);
			
			// Add custom field to row
			row.dealer_id = 69;
			
			// Attatch event handler
			row.addEventListener('click', Ti.App.session.clickDealerRow );
			
			// Add to collection
			data.push(row);
		}
		// Add rows to table
		Ti.App.session.table.data = data;
		
	});
	
});