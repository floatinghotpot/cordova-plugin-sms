
# cordova-plugin-sms #

Plugin to operate SMS, send / list / intercept / delete / restore.

### How to Use? ###

Use the plugin with Cordova CLI:

```cordova plugin add com.rjfun.cordova.sms```

### Quick Start ###

```bash
	# create a demo project
    cordova create test1 com.rjfun.test1 Test1
    cd test1
    cordova platform add android
    
    # now add plugin
    cordova plugin add com.rjfun.cordova.sms
    
    # copy the demo file
    rm -r www/*; cp plugins/com.rjfun.cordova.sms/test/* www/;
    
	# now build and run the demo in your device or emulator
    cordova prepare; 
    cordova run android; 
    
    # or import into Xcode / eclipse
```

# API Overview #

### Methods ###

```javascript
sendSMS(address(s), text, successCallback, failureCallback);
listSMS(filter, successCallback, failureCallback);
deleteSMS(filter, successCallback, failureCallback);

startWatch(successCallback, failureCallback);
stopWatch(successCallback, failureCallback);

enableIntercept(on_off, successCallback, failureCallback);
restoreSMS(msg_or_msgs, successCallback, failureCallback);

setOptions(options, successCallback, failureCallback);
```

### Events ###

```javascript
'onSMSArrive'
```

### Full Example Code ###

Check the [test/index.html] (https://github.com/floatinghotpot/cordova-plugin-sms/blob/master/test/index.html).

# API Reference #

### sendSMS ###

* sendSMS(address(s), text, successCallback, failureCallback);

Example Code:

```javascript
	if(SMS) SMS.sendSMS("+8613612345678", "hello, raymond", function(){}, function(){});

	if(SMS) SMS.sendSMS(["+8613612345678", "+8613987654321"], "hello, raymond", function(){}, function(){});
```

### listSMS ###

* listSMS(filter, successCallback, failureCallback);

Example Code:

```javascript
        	var filter = {
        		box : 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        		
        		// following 4 filters should NOT be used together, they are OR relationship
        		read : 0, // 0 for unread SMS, 1 for SMS already read
        		_id : 1234, // specify the msg id
        		address : '+8613601234567', // sender's phone number
        		body : 'This is a test SMS', // content to match
        		
        		// following 2 filters can be used to list page up/down
        		indexFrom : 0, // start from index 0
        		maxCount : 10, // count of SMS to return each time
        	};
        	if(SMS) SMS.listSMS(filter, function(data){
    			updateStatus('sms listed as json array');
    			updateData( JSON.stringify(data) );
    			
        		if(Array.isArray(data)) {
        			for(var i in data) {
        				var sms = data[i];
        			}
        		}
        	}, function(err){
        		updateStatus('error list sms: ' + err);
        	});
```

### deleteSMS ###

* deleteSMS(filter, successCallback, failureCallback);

>Warning: Be cautious when use this API.

```javascript

        	var filter = {
        		box : 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        		
        		// the following 4 filters are OR relationship
        		_id : 1234, // given a sms id, recommend ONLY use this filter
        		read : 1, // delete all read SMS
        		address : '+8613601234567', // delete all SMS from this phone number
        		body : 'Test is a test SMS' // delete SMS by content
        	};
        	if(SMS) SMS.deleteSMS(filter, function( n ){
        		updateStatus( n + ' sms messages deleted' );
        	}, function(err){
        		updateStatus('error delete sms: ' + err);
        	});
```

### startWatch ###

* startWatch(successCallback, failureCallback);

start observing and send following events to javascript:

* onSMSArrive
* onBluetoothConnected
* onBluetoothDisconnected

```javascript
        	if(SMS) SMS.startWatch(function(){
        		update('watching', 'watching started');
        	}, function(){
        		updateStatus('failed to start watching');
        	});
```

### stopWatch ###

* stopWatch(successCallback, failureCallback);

```javascript
        	if(SMS) SMS.stopWatch(function(){
        		update('watching', 'watching stopped');
        	}, function(){
        		updateStatus('failed to stop watching');
        	});
```

### enableIntercept ###

When intercept in ON, other SMS app will not receive when SMS incoming.

* enableIntercept(on_off, successCallback, failureCallback);

```javascript
        var interceptEnabled = false;
        
        function toggleIntercept() {
        	interceptEnabled = ! interceptEnabled;
        	
        	if(interceptEnabled) { // clear the list before we start intercept
        		smsList.length = 0;
        	}
        	
        	if(SMS) SMS.enableIntercept(interceptEnabled, function(){}, function(){});
        	
        	$('span#intercept').text( 'intercept ' + (interceptEnabled ? 'ON' : 'OFF') );
        	$('button#enable_intercept').text( interceptEnabled ? 'Disable' : 'Enable' );
        }
```

### restoreSMS ###

Restore the intercepted SMS into Inbox.

* restoreSMS(msg_or_msgs, successCallback, failureCallback);

```javascript
        	var smsList = [];
        	
        	// after some intercept
        	
        	if(SMS) SMS.restoreSMS(smsList, function( n ){
        		// clear the list if restore successfully
        		smsList.length = 0;
        		updateStatus(n + ' sms messages restored');
        		
        	}, function(err){
        		updateStatus('error restore sms: ' + err);
        	});
```

### setOptions ###

* setOptions( options, successCallback, failureCallback);

Example Code:

```javascript
	if(SMS) SMS.setOptions({
		license: 'you@gmail.com/xxxxxxxxx'
	});
```

# Events #

### onSMSArrive ###

Triggered when a new SMS is incoming. Need call startWatch() first.

```javascript
            document.addEventListener('onSMSArrive', function(e){
            	var sms = e.data;
            	
            	smsList.push( sms );
            	updateStatus('SMS arrived, count: ' + smsList.length );
            	
            	// sms.address
            	// sms.body
            	
            	var divdata = $('div#data');
            	divdata.html( divdata.html() + JSON.stringify( sms ) );
            	
            });
```

## See Also ##

Cordova/PhoneGap plugins for the world leading Mobile Ad services:

* [AdMob PluginPro](https://github.com/floatinghotpot/cordova-admob-pro), for Google AdMob/DoubleClick.
* [iAd PluginPro](https://github.com/floatinghotpot/cordova-plugin-iad), for Apple iAd. 
* [FacebookAds PluginPro](https://github.com/floatinghotpot/cordova-plugin-facebookads), for Facebook Audience Network.
* [FlurryAds PluginPro](https://github.com/floatinghotpot/cordova-plugin-flurry), for Flurry Ads.
* [mMedia PluginPro](https://github.com/floatinghotpot/cordova-plugin-mmedia), for Millennial Meida.
* [MobFox PluginPro](https://github.com/floatinghotpot/cordova-mobfox-pro), for MobFox.
* [MoPub PluginPro](https://github.com/floatinghotpot/cordova-plugin-mopub), for MoPub.

More Cordova/PhoneGap plugins by Raymond Xie, [visit http://rjfun.github.io/](http://rjfun.github.io/).

Project outsourcing and consulting service is also available. Please [contact us](http://floatinghotpot.github.io) if you have the business needs.

