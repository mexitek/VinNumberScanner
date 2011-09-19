// Name Space
Ti.App.scanner = {
		// Main Tab
		tab : core.ui.getTab({  
    			icon:'KS_nav_ui.png',
    			title:'Scanner'
		}),
		// Windows
		scannerWindow : core.ui.getWindow({ title:'Scanning VIN' })
};

// Attach default window
Ti.App.scanner.tab.window = Ti.App.scanner.scannerWindow;