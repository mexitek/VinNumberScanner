/**
* MDV API
* Depends on: 
*	utilities.js -> ajax()
*
*/
core.registerModule('mdv_api',function(sb){
	
	// Private Methods
	var url = 'http://localhost/~arlocarreon/CodeIgniter/index.php/json_api';
	
	function _makeCall(endpoint,callback,data){
		var opts = {};
		opts.url = url + (endpoint || '/');
		opts.callback = callback || function(){};
		opts.data = data || {};
		
		// Make our call
		ajax( opts.url, opts.callback, opts.data );
	}
	
	// Public Face
	var pubFace = {
		// Expose the URL
		url: url,
		
		// API ENDPOINTS
		getDealers: function(callback) {
			_makeCall('/getDealers',callback);
		},
		
		getVehicles: function(VIN,callback) {},
		postTimeBracket: function(data,callback) {},
		updateVehicle: function(data,callback) {}
		
	};
	
	// Return public interface
	return pubFace;
	
});