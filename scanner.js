// Name Space
Ti.App.scanner = {
		// Main Tab
		tab : core.ui.getTab({  
    			icon:'KS_nav_ui.png',
    			title:'Scanner'
		}),
		// Button
		button : core.ui.getButton({
		    title: "Scan New Car",
		    height:50,
		    width:250,
		    bottom:20
		}),
		// Windows
		scannerWindow : core.ui.getWindow({ title:'Scanning VIN' })
};

// Button Listener
Ti.App.scanner.button.addEventListener('click', function(){
    Ti.App.barcode.scan({
        configure: {
            classType: "ZBarReaderViewController",
            sourceType: "Camera",
            cameraMode: "Default",
            symbol:{
                "QR-Code":false,
				"CODE-128":true,
				"CODE-39":true,
				"I25":false,
				"DataBar":false,
				"DataBar-Exp":false,
				"EAN-13":false,
				"EAN-8":false,
				"UPC-A":false,
				"UPC-E":false,
				"ISBN-13":false,
				"ISBN-10":false,
				"PDF417":false
            }
        },
        success:function(data){
            Ti.API.info('TiBar success callback!');
            if(data && data.barcode){
                Ti.UI.createAlertDialog({
                    title: "Found VIN",
                    message: data.barcode 
                }).show();
            }
        },
        cancel:function(){
            Ti.API.info('TiBar cancel callback!');
        },
        error:function(){
            Ti.API.info('TiBar error callback!');
        }
    });        
});

// Window Content
Ti.App.scanner.scannerWindow.add(Ti.App.scanner.button);

// Attach default window
Ti.App.scanner.tab.window = Ti.App.scanner.scannerWindow;