/**
* MDV SCanner: App window allows for entry/scan vehicle VIN
*
* Publishes:
*	mdv-scanner-vin-selected
*
*/
core.registerModule('mdv_scanner',function(sb){
	// ===============================
	// = Private Variable Collection =
	// ===============================
	var priFace = {};
	
	// Vars
	priFace.VIN = false;
	
	// Components
	priFace.button = sb.ui.getButton({
	    title: "Scan VIN",
	    height:50,
	    width:250,
	    bottom:20
	});
	
	priFace.textField = sb.ui.getTextField({
	    color:'#336699',
	    height:35,
	    top:10,
	    left:10,
	    width:250,
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	
	// Windows
	priFace.scannerWindow = sb.ui.getWindow({ title:'Input VIN' });
	
	// ================================
	// = Arrange Module UI Components =
	// ================================
	
	// Button Listener for scanner
	priFace.button.addEventListener('click', function(){
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
	
	// Auto clear text
	priFace.textField.addEventListener('focus',function(e){
		// Make default text dissappear on focus
		e.source.value = '';
	});
	
	// Put txt field and button in place
	priFace.scannerWindow.add(priFace.textField);
	priFace.scannerWindow.add(priFace.button);
	
	// =============================
	// = Module's Public Interface =
	// =============================
	return {
		// Return module main window
		getWindow: function(){
			return priFace.scannerWindow;
		},
		
		// Return a tab with this window
		getTab: function(opts){
			var tabOpts = opts || {};
			var tmpTab = sb.ui.getTab( tabOpts );
			tmpTab.add( priFace.scannerWindow );
			return tmpTab;
		}
	};
});