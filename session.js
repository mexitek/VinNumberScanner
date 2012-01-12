/**
* MDV SESSION: App window for initiating a photoshoot at selected dealership.
*
* Publishes:
*	mdv-session-picked-dealer
* 
* Depends on:
*   mdv_api
*
*/
core.registerModule('mdv_session',function(sb){
	// Private Var
	var priFace = {};
	priFace.dealer = false;
	priFace.dealers = [];
	
	// Table view
	priFace.table = sb.ui.getTableView();
	
	// Windows
	priFace.mainWindow = core.ui.getWindow({ title:'Pick a dealer' });
	
	// Event Handlers
	priFace.clickDealerRow = function(e){
		// Create an object for this dealer
		var dealer = e.rowData.dealerInfo;
		
		Ti.API.info( 'About to fire event for selected Dealer: '+dealer.BUSINESS_NAME);
		// Publish event 
		//sb.publish('mdv-session-picked-dealer', dealer);
		//Ti.App.fireEvent( 'mdv-session-picked-dealer', dealer );
		Ti.App.publish( 'mdv-session-picked-dealer', dealer );
	};
	
	// Events
	priFace.table.addEventListener('click', priFace.clickDealerRow );
	priFace.mainWindow.addEventListener('open',function(){
		// Check to make sure we have no clients
		if( priFace.dealers.length > 0 ) {
			return;
		}

		// Ask Sandbox for MDV_API via sandbox
		sb.use('mdv_api',function(mdv_api){
			// Log entry for debug
			Ti.API.info("mdv-session: Sandbox granted mdv-api object.");
			
			// Make API call
			// MDV API: /getDealers
			mdv_api.getDealers(function(clients){
				// Check for error
				if( clients[0] && clients[0].error ) {
					alert(clients[0].message);
				}

				// Save clients
				priFace.dealers = clients;
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
				priFace.table.data = data;

			}); // END API CALL
			
		}); // END sb.use()
	}); // END addEventListener()
	
	// Arrange all our components.
	priFace.mainWindow.add( priFace.table );
	
	// Return our interface
	return {
		// Return the main window if they ask for it
		getWindow: function(){
			return priFace.mainWindow;
		},
		
		// Return a tab with this window
		getTab: function(opts){
			var tabOpts = opts || {};
			var tmpTab = sb.ui.getTab( tabOpts );
			tmpTab.add( priFace.mainWindow );
			return tmpTab;
		}
	};
});