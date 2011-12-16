// =============================================
// = Application Core, Modules and UI settings =
// =============================================


// Include Application Core
Ti.include('core/utilities.js');
Ti.include('core/core.js');
Ti.include('core/basic_ui.js');

// Modules
Ti.include('mdv_api.js');
//Ti.include('PATH_TO_MODULE.js');

// Load TiBar Module
Ti.App.barcode = require('tibar');

// Templates
//Ti.include('PATH_TO_UI_TEMPLATE.js');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#FFFFFF');

// ========================================
// = Application Layout and Content Below =
// ========================================

Ti.include('scanner.js');
Ti.include('session.js');



/** 
* Application Routing
*
*	The routing decides when certain windows are openned. Basically
*	subscribes for specific events and maybe publishes a few.



// Start App
Ti.App.session.mainWindow.open();

// If session is started (dealer picked), open the VIN input screen
core.subscribe('mdv-session-picked-dealer',function(dealer){
	Ti.API.info("Closing Session Window and Openning Scanner");
	Ti.App.session.mainWindow.close();
	Ti.App.scanner.scannerWindow.open();
});*/
Ti.App.scanner.scannerWindow.open();
// Application Tab Group
//var tabGroup = core.ui.getTabGroup();

// Application Tabs  
//tabGroup.addTab( Ti.App.scanner.tab );

// Open Application
//™tabGroup.open();*/