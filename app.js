// =============================================
// = Application Core, Modules and UI settings =
// =============================================

// Include Application Core
Ti.include('core/utilities.js');
Ti.include('core/core.js');
Ti.include('core/basic_ui.js');

// Modules
//Ti.include('PATH_TO_MODULE.js');

// Load TiBar MOdule
Ti.App.barcode = require('tibar');

// Templates
//Ti.include('PATH_TO_UI_TEMPLATE.js');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#FFFFFF');

// ========================================
// = Application Layout and Content Below =
// ========================================
// Application Tab Files
Ti.include('scanner.js');
//Ti.include('PATH_TO_TAB.js');

// Application Tab Group
var tabGroup = core.ui.getTabGroup();

// Application Tabs  
tabGroup.addTab( Ti.App.scanner.tab );

// Open Application
tabGroup.open();