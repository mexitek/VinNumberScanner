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
        // simple configuration for iPhone simulator
        configure: {
            classType: "ZBarReaderController",
            sourceType: "Album",
            cameraMode: "Default",
            symbol:{
                "QR-Code":true
            }
        },
        success:function(data){
            Ti.API.info('TiBar success callback!');
            if(data && data.barcode){
                Ti.UI.createAlertDialog({
                    title: "Scan result",
                    message: "Barcode: " + data.barcode + " Symbology:" + data.symbology
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