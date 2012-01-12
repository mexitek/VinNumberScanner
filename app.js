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

//Ti.include('scanner.js');
Ti.include('session.js');



/** 
* Application Routing
*
*	The routing decides when certain windows are openned. Basically
*	subscribes for specific events and maybe publishes a few.
*/


// Start App
core.mdv_session.getWindow().open();

// If session is started (dealer picked), open the VIN input screen
Ti.App.subscribe('mdv-session-picked-dealer',function(dealer){
	// Notify console on activity
	Ti.API.info("Closing Session Window and Openning Scanner");
	// Swap app windows
	core.mdv_session.getWindow().close();
	Ti.include('scanner.js');
	core.mdv_scanner.getWindow().open();
});