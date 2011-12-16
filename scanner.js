// Name Space
Ti.App.scanner = {
		
		// Vars
		VIN: false,
		
		// Main Tab
		tab : core.ui.getTab({  
    			icon:'KS_nav_ui.png',
    			title:'Scanner'
		}),
		// Components
		button : core.ui.getButton({
		    title: "Scan VIN",
		    height:50,
		    width:250,
		    bottom:20
		}),
		/*textField : core.ui.getTextField({
		    color:'#336699',
		    height:35,
		    top:10,
		    left:10,
		    width:250,
		    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		}),*/
		
		
		// Windows
		scannerWindow : core.ui.getWindow({ title:'Input VIN' })
};

var textField = core.ui.getTextField({
    color:'#336699',
    height:35,
    top:10,
    left:10,
    width:250,
    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	value: "Enter VIN"
});


// Button Listener
Ti.App.scanner.button.addEventListener('click', function(){
    Ti.App.barcode.scan({
        configure: {
            classType: "ZBarReaderViewController",
            sourceType: "Camera",
            cameraMode: "Sequence",
			config:{
			        "showsCameraControls":true, // (VC)
			        "showsZBarControls":true,
			        "tracksSymbols":true, // the tracking rectangle that highlights barcodes
			        "enableCache":false,
			        "showsHelpOnFail":true,
			        "takesPicture":false
			},
            symbol:{
                "QR-Code":false,
				"CODE-128":true,
				"CODE-39":true,
				"I25":true,
				"DataBar":true,
				"DataBar-Exp":true,
				"EAN-13":true,
				"EAN-8":true,
				"UPC-A":true,
				"UPC-E":true,
				"ISBN-13":true,
				"ISBN-10":true,
				"PDF417":true
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

// Event Listeners
textField.addEventListener('focus',function(e){
	// Make default text dissappear on focus
	e.source.value = '';
});

// Window Content 
Ti.App.scanner.scannerWindow.add(textField);
Ti.App.scanner.scannerWindow.add(Ti.App.scanner.button);

// Attach default window
//Ti.App.scanner.tab.window = Ti.App.scanner.scannerWindow;