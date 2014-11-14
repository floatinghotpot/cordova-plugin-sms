
var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var safesmsExport = {};

/*
 * Methods
 */

safesmsExport.getBTState = function(calbackWithData, failureCallback) {
	cordova.exec( calbackWithData, failureCallback, 'SMS', 'getBTState', [] );
};

safesmsExport.listPairedBTDevices = function(calbackWithData, failureCallback) {
	cordova.exec( calbackWithData, failureCallback, 'SMS', 'listPairedBTDevices', [] );
};

safesmsExport.startWatch = function(successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'SMS', 'startWatch', [] );
};

safesmsExport.stopWatch = function(successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'SMS', 'stopWatch', [] );
};

safesmsExport.enableIntercept = function(on_off, successCallback, failureCallback) {
	on_off = !! on_off;
	cordova.exec( successCallback, failureCallback, 'SMS', 'enableIntercept', [ on_off ] );
};

safesmsExport.sendSMS = function(address, text, successCallback, failureCallback) {
	if( Object.prototype.toString.call( address ) === '[object Array]' ) {
		// ok
	} else if(typeof address === 'string') {
		numbers = [ address ];
	} else {
		if(typeof failureCallback === 'function') {
			failureCallback("require address, phone number as string, or array of string");
		}
		return;
	}
	
	cordova.exec( successCallback, failureCallback, 'SMS', 'sendSMS', [ numbers, text ] );
};

safesmsExport.listSMS = function(filter, successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'SMS', 'listSMS', [ filter ] );
};

safesmsExport.deleteSMS = function(filter, successCallback, failureCallback) {
	cordova.exec( successCallback, failureCallback, 'SMS', 'deleteSMS', [ filter ] );
};

safesmsExport.restoreSMS = function(msg, successCallback, failureCallback) {
	var smsList = [];
	if(Array.isArray(msg)) {
		if(msg.length > 0) smsList = msg;
	} else if(typeof msg === 'object') {
		if(msg !== null) smsList = [ msg ];
	}
	cordova.exec( successCallback, failureCallback, 'SMS', 'restoreSMS', [ msg ] );
};

/*
 * Events:
 * 
 * document.addEventListener('onSMSArrive', function(e) { var sms = e.data; }
 * 
 * document.addEventListener('onBluetoothConnected', function(e) { var deviceinfo = e.data; }
 * document.addEventListener('onBluetoothDisconnected', function(e) { var deviceinfo = e.data; }
 * 
 */

module.exports = safesmsExport;

