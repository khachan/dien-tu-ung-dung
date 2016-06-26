// (c) Copyright 2014 Ben Crudo Consulting. Author: Gareth Brown. All Rights Reserved.

/************************************************************
IMPORTANT:

Ajax requests that update Shopify's cart must be queued and sent synchronously to the server.
This library attempts to alleviate that issue by creating a queue system. 

Every request you create will be automatically added to the queue.  All callbacks will still work as expected.
There are several default event callbacks listed below. It is suggested that you override any that you wish to work with. 

There are several tools added for ease of use including 

DEPENDENCIES:

jQuery 1.4+

DOCUMENTATION:

Response examples taken from http://docs.shopify.com/support/your-website/themes/can-i-use-ajax-api
************************************************************/

if ((typeof BCCShopify) === 'undefined') {
	BCCShopify = {};
}

/************************************************************
Set logging level:
	0: none,
	1: full
Todo: Add intermediate levels
************************************************************/

BCCShopify.__logLevel = 0;

/************************************************************
Debugging Status

Controls BCCShopify.debug();
************************************************************/

BCCShopify.__debug = false;

/************************************************************
Preloaded images array.

No get method, just used to load images. 
************************************************************/

BCCShopify.__preloadedImages = new Array();

/************************************************************ 
Override so that BCCShopify.formatMoney returns pretty
money values instead of cents.
************************************************************/

BCCShopify.money_format = '$ ';

/************************************************************ 


							Tools 


************************************************************/

/************************************************************
FUNCTION: BCCShopify.log(message)

Use instead of console.log.

Allows you to keep log statements in place and simply turn off __logLevel for deployment.
************************************************************/

BCCShopify.log = function(message){
	if (!BCCShopify.__logLevel) return;
	if (console) console.log(new Date().toLocaleString()+ ": " + message);
	else alert(message);
};

/************************************************************
FUNCTION: BCCShopify.debug()

Calls debugger if BCCShopify.__debug is true.

Allows you to keep debug statements in place and simply turn off __debug for deployment.
************************************************************/

BCCShopify.debug = function(){
	if (!BCCShopify.__debug) return;
	debugger;
};

/************************************************************
FUNCTION: BCCShopify.preload(<comma separated list of image urls>)

Use instead of console.log.

USAGE:

preload(
	
)
************************************************************/

BCCShopify.preload = function(){
	for (i = 0; i < arguments.length; i++) {
		images[i] = new Image()
		images[i].src = arguments[i]
	}
}

/************************************************************
FUNCTION: BCCShopify.formatMoney(cents, format)

Formats value in cents to money format.  See examples.

Examples of call:
BCCShopify.formatMoney(600000, '€ EUR')
BCCShopify.formatMoney(600000, '€ EUR')
BCCShopify.formatMoney(600000, '$')
BCCShopify.formatMoney(600000, '') in a Liquid template!

In a Liquid template, you have access to a shop money formats with:



All these formats are editable on the Preferences page in your admin.
************************************************************/

BCCShopify.formatMoney = function(cents, format) {
	if (typeof cents == 'string') cents = cents.replace('.','');
	var value = '';
	var patt = /\{\{\s*(\w+)\s*\}\}/;
	var formatString = (format || this.money_format);

	function addCommas(moneyString) {
		return moneyString.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + ',');
	}

	switch(formatString.match(patt)[1]) {
	case 'amount':
		value = addCommas(floatToString(cents/100.0, 2));
		break;
	case 'amount_no_decimals':
		value = addCommas(floatToString(cents/100.0, 0));
		break;
	case 'amount_with_comma_separator':
		value = floatToString(cents/100.0, 2).replace(/\./, ',');
		break;
	case 'amount_no_decimals_with_comma_separator':
		value = addCommas(floatToString(cents/100.0, 0)).replace(/\./, ',');
		break;
	}
	return formatString.replace(patt, value);
};

/************************************************************
FUNCTION: BCCShopify.resizeImage(image, size)

Resizes an image using the Shopify image size strings.

16x16 				pico
32x32 				icon
50x50 				thumb
100x100				small
160x160				compact
240x240				medium
480x480				large
600x600				grande
1024x1024			1024x1024
2048x2048			2048x2048
original size		master

Example:
BCCShopify.resizeImage("//cdn.shopify.com/s/files/1/0242/5403/products/giant_panda.jpg", "large")

returns 

//cdn.shopify.com/s/files/1/0242/5403/products/giant_panda_large.jpg
************************************************************/

BCCShopify.resizeImage = function(image, size) {
	try {
		if(size == 'original') { return image; }
		else {      
			var matches = image.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
			return matches[1] + '_' + size + '.' + matches[2];
		}    
	} catch (e) { return image; }
};

/************************************************************
FUNCTION: BCCShopify.share(btn)

Share to Twitter/FB/Google Plus/Pinterest with custom buttons.

Example buttons (with css background-image):

<a 	href="#" 
	class="twitter" 
	data-social='{	"type":"twitter", 
					"url":"", 
					"text": ""
				}' 
	title="Share on Twitter">
	Share on Twitter
</a>
<a href="#" 
	class="facebook" 
	data-social='{	"type":"facebook", 
					"url":"", 
					"text": "", 
					"image": "//cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_grande.gif"
				}' 
	title="Share on facebook">
	Share on facebook
</a>
<a href="#" 
	class="plusone" 
	data-social='{	"type":"plusone", 
					"url":"", 
					"text": "", 
				}' 
	title="Share on Google Plus">
	Share on Google Plus
</a>
<a href="#" 
	class="pinterest" 
	data-social='{	"type":"pinterest", 
					"url":"", 
					"text": "", 
					"image": "//cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"
				}' 
	title="Pin it">
	Pin it
</a>
<script>
	$('body').on('click','.twitter, .facebook, .plusone, .pinterest',function(){
		BCCShopify.share(this);
	});
</script>
************************************************************/

BCCShopify.shareSettings = {
	"popUpWidth" : 550,               /*Width of the Pop-Up Window*/
	"popUpHeight": 450,               /*Height of the Pop-Up Window*/
	"popUpTop"   : 100,               /*Top value for Pop-Up Window*/
	"useCurrentLocation" : false      /*Whether or not use current location for sharing*/
}
BCCShopify.share = function(btn){              
        /*Define*/
        var social = $(btn).data('social'),
            width=BCCShopify.shareSettings.popUpWidth,
            height=BCCShopify.shareSettings.popUpHeight,
            sHeight=screen.height, 
            sWidth=screen.width, 
            left=Math.round((sWidth/2)-(width/2)), 
            top=BCCShopify.shareSettings.popUpTop, 
            url,
            useCurrentLoc = BCCShopify.shareSettings.useCurrentLocation,
            socialURL = (useCurrentLoc) ? window.location : social.url,
            socialText = social.text,
            socialImage = social.image,
            socialSummary = social.summary;
        
        switch(social.type){
            case 'facebook':
                url = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]='+socialURL+'&p[images][0]='+socialImage+'&p[title]='+socialText+'&p[summary]=' + socialSummary;
                break;
            case 'twitter':
                url = 'http://twitter.com/share?url='+ socialURL + '&text=' + socialText;
                break;
            case 'plusone':
                url = 'https://plusone.google.com/_/+1/confirm?hl=en&url=' + socialURL;
                break;
            case 'pinterest':
                url = 'http://pinterest.com/pin/create/button/?url=' + socialURL + '&media=' + socialImage + '&description=' + socialText ;
                break;
        }
        /*Finally fire the Pop-up*/    
        window.open(url, '', 'left='+left+' , top='+top+', width='+width+', height='+height+', personalbar=0, toolbar=0, scrollbars=1, resizable=1');         
};
/************************************************************ 
				Events (Should be overriden!)

Example overrides:
	BCCShopify.onItemAdded = function(line_item) {
		$('message').update('Added '+line_item.title + '...');
	}
	BCCShopify.onError = function(XMLHttpRequest, textStatus) {
		// Deal with this error with alert messages on the product page.
	}
************************************************************/

/************************************************************
EVENT CALLBACK: BCCShopify.onError(XMLHttpRequest, textStatus)

Logs a description of the error in XMLHttpRequest.responseText - override if you wish to deal with 

Example: {"description":"The product 'Arduino Robot' is already sold out.","status":500,"message":"Cart Error"}
************************************************************/

BCCShopify.onError = function(XMLHttpRequest, textStatus) {
	var data = eval('(' + XMLHttpRequest.responseText + ')');
	if (data.message) {
		BCCShopify.log(data.message + '(' + data.status  + '): ' + data.description);
	} else {
		BCCShopify.log('Error : ' + BCCShopify.fullMessagesFromErrors(data).join('; ') + '.');
	}
};

/************************************************************
EVENT CALLBACK: BCCShopify.fullMessagesFromErrors(errors)

Returns a full description of the error in XMLHttpRequest.responseText 

Example: {"description":"The product 'Arduino Robot' is already sold out.","status":500,"message":"Cart Error"}
************************************************************/

BCCShopify.fullMessagesFromErrors = function(errors) {
	var fullMessages = [];
	jQuery.each(errors, function(attribute, messages) {
		jQuery.each(messages, function(index, message) {
			fullMessages.push(attribute + ' ' + message);
		});
	});
	return fullMessages
};

/************************************************************
EVENT CALLBACK: BCCShopify.onCartUpdate(cart)

Logs the cart data on cart update. 
************************************************************/

BCCShopify.onCartUpdate = function(cart) {
	BCCShopify.log('There are now ' + cart.item_count + ' items in the cart.');
};


/************************************************************
EVENT CALLBACK: BCCShopify.onCartShippingRatesUpdate(rates, shipping_address)

Logs the number of rates and lists the lowest available shipping rate for the address.

************************************************************/

BCCShopify.onCartShippingRatesUpdate = function(rates, shipping_address) {
	var readable_address = '';
	if (shipping_address.zip) readable_address += shipping_address.zip + ', ';
	if (shipping_address.province) readable_address += shipping_address.province + ', ';
	readable_address += shipping_address.country
	BCCShopify.log('There are ' + rates.length + ' shipping rates available for ' + readable_address +', starting at '+ BCCShopify.formatMoney(rates[0].price) +'.');
};  

/************************************************************
EVENT CALLBACK: BCCShopify.onItemAdded(line_item)

Logs that the given product was successfully added to the cart.
************************************************************/

BCCShopify.onItemAdded = function(line_item) {
	BCCShopify.log(line_item.title + ' was successfully added to cart.');
};

/************************************************************
EVENT CALLBACK: BCCShopify.onProduct(product)

Logs that the product was successfully retrieved.
************************************************************/

BCCShopify.onProduct = function(product) {
	BCCShopify.log('Ajax request successful for ' + product.title);
};

/************************************************************
 Ajax API 

	All Ajax requests that deal with the Shopify cart must be queued and sent synchronously to the server.
	In order to do this, we shall set up a queue that will send each request through as the previous one completes.

	The following functions should not be called directly as they deal with the queue.
************************************************************/

BCCShopify.ajaxQueue = [];
BCCShopify.__currentRequest = null;

BCCShopify.queueAjaxRequest = function(requestData){
	BCCShopify.ajaxQueue.push(requestData);
	BCCShopify.__updateQueue()
}
BCCShopify.__updateQueue = function(){
	if (!BCCShopify.__currentRequest){
		if (BCCShopify.ajaxQueue.length == 0) return;
		var newRequest = BCCShopify.ajaxQueue.shift();
		var beforeSendCB,successCB,completeCB,errorCB;
		var keys = [];
		var foundComplete = false;
		var hasRunOnce = false;
		for(var k in newRequest) { 
			if (k == 'beforeSend'){
				var beforeSend_old = newRequest['beforeSend'];
				newRequest[k] = function(){
					beforeSend_old.apply(this,arguments);
				}
			}
			else if (k == 'complete'){
				foundComplete = true;
				var complete_old = newRequest['complete'];
				newRequest[k] = function(){
					BCCShopify.__currentRequest = null;
					BCCShopify.__updateQueue();
					complete_old.apply(this,arguments);
				}
			}
			else if (k == 'error'){
				var error_old = newRequest['error'];
				newRequest[k] = function(){
					error_old.apply(this,arguments);
				}
			}
			else if (k == 'success'){
				var success_old = newRequest['success'];
				newRequest[k] = function(){
					success_old.apply(this,arguments);
				}
			}
		}
		if (!foundComplete){
			newRequest.complete = function(){
				BCCShopify.__currentRequest = null;
				BCCShopify.__updateQueue();
			}
		}
		BCCShopify.__currentRequest = newRequest;
		jQuery.ajax(BCCShopify.__currentRequest)
	}
}

/************************************************************
 BCCShopify.addItem = function(variant_id, quantity, callback)

 POST request to cart/add.js with variant ID and optional quantity and callback.

 RETURNS: JSON data of associated line item

 USAGE:

 BCCShopify.addItem(12345);

 OR 

 BCCShopify.addItem(12345,2,function(cartData){
	// Run code on success with new cartData.
 });
***************************************************************************************/

BCCShopify.addItem = function(variant_id, quantity, callback) {
	if (!variant_id) {
		console.log("BCCShopifyError: Can't add blank ID to cart.");
		return;
	}
	var quantity = quantity || 1;
	var params = {
		type: 'POST',
		url: '/cart/add.js',
		data: 'quantity=' + quantity + '&id=' + variant_id,
		dataType: 'json',
		success: function(line_item) { 
			if ((typeof callback) === 'function') {
				callback(line_item);
			}
			else {
				BCCShopify.onItemAdded(line_item);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	};
	BCCShopify.queueAjaxRequest(params);
};

/************************************************************
 BCCShopify.addItemFromForm = function(form_id, callback)

 POST request to cart/add.js with form data and optional callback.

 RETURNS: JSON data of associated line item

 USAGE:

 BCCShopify.addItem("#formWithData",function(cartData){
	// Run code on success with new cartData.
 });
************************************************************/

BCCShopify.addItemFromForm = function(form_id, callback) {
	var params = {
		type: 'POST',
		url: '/cart/add.js',
		data: jQuery('#' + form_id).serialize(),
		dataType: 'json',
		success: function(line_item) { 
			if ((typeof callback) === 'function') {
				callback(line_item);
			}
			else {
				BCCShopify.onItemAdded(line_item);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	};
	BCCShopify.queueAjaxRequest(params);
};

/************************************************************
 BCCShopify.addItems = function(items, callback)

 POST request to cart/add.js with variant ID and optional quantity and callback for all IDs.

 RETURNS: JSON data of all associated line items

 USAGE:

 var items = [{id:1234,quantity:5},{id:6789,qty:10}]
 BCCShopify.addItem(items,function(cartData){
	// Run code on success with new cartData.
 });
************************************************************/

BCCShopify.addItems = function(items, callback) {
	var currentCount = 0;
	var itemCount = items.length;
	var lineItems = [];
	for (var i=0;i<itemCount;i++){
		var item = items[i];
		if (!item.id || item.id <= 0){
			console.log("BCCShopifyError: Can't add blank ID to cart.");
			return;
		}
		var quantity = item.quantity || 1;
		var params = {
			type: 'POST',
			url: '/cart/add.js',
			data: 'quantity=' + quantity + '&id=' + item.id,
			dataType: 'json',
			success: function(line_item) {
				if ((typeof callback) === 'function') {
					currentCount++;
					lineItems.push(line_item);
					if (currentCount >= itemCount){
						callback(lineItems);
					}
				}
				else {
					BCCShopify.onItemAdded(line_item);
				}
				
			},
			error: function(XMLHttpRequest, textStatus) {
				BCCShopify.onError(XMLHttpRequest, textStatus);
			}
		};
		BCCShopify.queueAjaxRequest(params);
	}	
};
/************************************************************
FUNCTION: BCCShopify.getCart(callback)
*************************************************************

GET cart.js returns the cart in JSON.

Example response:

{
    "items": [
        {
            "handle": "aquarius",
            "line_price": 6000,
            "requires_shipping": true,
            "price": 2000,
            "title": "aquarius - medium",
            "url": "/products/aquarius",
            "quantity": 3,
            "id": 30104042,
            "grams": 181,
            "sku": "",
            "vendor": "the candi factory",
            "image": "http://static.shopify.com/s/files/1/0040/7092/products/aquarius_1.gif?1268045506",
            "variant_id": 30104042
        },
        {
            "handle": "amelia",
            "line_price": 4000,
            "requires_shipping": true,
            "price": 2000,
            "title": "amelia - medium",
            "url": "/products/amelia",
            "quantity": 2,
            "id": 30104012,
            "grams": 200,
            "sku": "",
            "vendor": "the candi factory",
            "image": "http://static.shopify.com/s/files/1/0040/7092/products/2766315_da1b.png?1268045506",
            "variant_id": 30104012
        }
    ],
    "requires_shipping": true,
    "total_price": 10000,
    "attributes": null,
    "item_count": 5,
    "note": null,
    "total_weight": 947
}
************************************************************/

BCCShopify.getCart = function(callback) {
	jQuery.getJSON('/cart.js', function (cart, textStatus) {
		if ((typeof callback) === 'function') {
			callback(cart);
		}
		else {
			BCCShopify.onCartUpdate(cart);
		}
	});
};

	
/************************************************************
FUNCTION: BCCShopify.getCartShippingRatesForDestination(shipping_address, callback)
*************************************************************

GET cart/shipping_rates.js returns a shipping rates object with all rates available.

Example address:

<form action="#" method="POST" id="shipping_rates_form">
	<input type="text" size="6" name="country" value="CA" /> 
	<input type="text" size="6" name="province" value="ON" />
	<input type="text" size="9" name="zip" value="K1N5T2" /> <br />
</form>
<script>
	Shopify.getCartShippingRatesForDestination($('#shipping_rates_form').serialize(), callback)
</script>

OR 

Shopify.getCartShippingRatesForDestination("country=CA&province=ON&zip=K1N5T2", callback)

Example Response:

{
	"shipping_rates": [
		{
			"name": "Ground Shipping",
			"price": "8.00",
			"delivery_date": null,
			"source": "shopify"
		},
		{
			"name": "Expedited Shipping",
			"price": "15.00",
			"delivery_date": null,
			"source": "shopify"
		},
		{
			"name": "Express Shipping",
			"price": "30.00",
			"delivery_date": null,
			"source": "shopify"
		}
	]
}
************************************************************/

BCCShopify.getCartShippingRatesForDestination = function(shipping_address, callback) {
	var params = {
		type: 'GET',
		url: '/cart/shipping_rates.json',
		data: BCCShopify.param({'shipping_address': shipping_address}),
		dataType: 'json',
		success: function(response) { 
			rates = response.shipping_rates;
			if ((typeof callback) === 'function') {
				callback(rates, shipping_address);
			}
			else {
				BCCShopify.onCartShippingRatesUpdate(rates, shipping_address);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	}
	BCCShopify.queueAjaxRequest(params);
};


/************************************************************
FUNCTION: BCCShopify.getProduct(handle, callback)
*************************************************************

GET products/<product-handle>.js returns the product in JSON.

Example Response:

{
    "options": [
        {
            "name": "Size"
        }
    ],
    "handle": "amelia",
    "available": true,
    "price": 2000,
    "title": "amelia",
    "featured_image": "http://static.shopify.com/s/files/1/0040/7092/products/2766315_da1b.png?1268045506",
    "tags": [
        "colorful",
        "cute",
        "woman"
    ],
    "url": "/products/amelia",
    "type": "undies",
    "compare_at_price": 2000,
    "id": 11790322,
    "images": [
        "http://static.shopify.com/s/files/1/0040/7092/products/2766315_da1b.png?1268045506"
    ],
    "compare_at_price_varies": false,
    "compare_at_price_max": 2000,
    "price_varies": false,
    "description": "\u003Cp\u003E\u003Cstrong\u003EThe best underwear you\u0026#8217;ll ever wear!\u003C/strong\u003E\u003Cbr /\u003E\nThese artisan undies are made from a soft \u003Cem\u003Ebreathable\u003C/em\u003E microfibre that won\u0026#8217;t fade or shrink.\u003C/p\u003E",
    "variants": [
        {
            "option2": null,
            "option3": null,
            "options": [
                "small"
            ],
            "requires_shipping": true,
            "available": false,
            "weight": 181,
            "price": 2000,
            "title": "small",
            "inventory_quantity": 0,
            "taxable": true,
            "compare_at_price": 2000,
            "id": 30104002,
            "inventory_management": "shopify",
            "sku": "",
            "option1": "small"
        },
        {
            "option2": null,
            "option3": null,
            "options": [
                "medium"
            ],
            "requires_shipping": true,
            "available": true,
            "weight": 200,
            "price": 2000,
            "title": "medium",
            "inventory_quantity": 10,
            "taxable": true,
            "compare_at_price": 2000,
            "id": 30104012,
            "inventory_management": "shopify",
            "sku": "",
            "option1": "medium"
        },
        {
            "option2": null,
            "option3": null,
            "options": [
                "large"
            ],
            "requires_shipping": true,
            "available": true,
            "weight": 200,
            "price": 2000,
            "title": "large",
            "inventory_quantity": 10,
            "taxable": true,
            "compare_at_price": 2000,
            "id": 30104022,
            "inventory_management": "shopify",
            "sku": "",
            "option1": "large"
        }
    ],
    "price_max": 2000,
    "vendor": "the candi factory",
    "compare_at_price_min": 2000,
    "price_min": 2000
}
************************************************************/

BCCShopify.getProduct = function(handle, callback) {
	jQuery.getJSON('/products/' + handle + '.js', function (product, textStatus) {
		if ((typeof callback) === 'function') {
			callback(product);
		}
		else {
			BCCShopify.onProduct(product);
		}
	});
};

/************************************************************
FUNCTION: BCCShopify.changeItem(variant_id, quantity, callback)
*************************************************************

POST to cart/update.js

Response if successful

The JSON of the amended cart.

If you're trying to change the quantity of an item that's not been added 
to the cart, there will be no error, and yet no change to the cart.

Response if error
If the desired change in quantity is not possible (say you have 60 items 
in the cart for item X, and item X stock is 80, and you're trying to 
change its quantity to a 100), then no change is made to the cart.

{
    "description": "We only have 80 item(s) of aquarius - medium left.",
    "status": 500,
    "message": "Error"
}
************************************************************/

BCCShopify.changeItem = function(variant_id, quantity, callback) {
	var params = {
		type: 'POST',
		url: '/cart/update.js',
		data: "updates["+variant_id+"]="+quantity,
		// data:  'quantity='+quantity+'&id='+variant_id,
		dataType: 'json',
		success: function(cart) { 
			if ((typeof callback) === 'function') {
				callback(cart);
			}
			else {
				BCCShopify.onCartUpdate(cart);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	};
	BCCShopify.queueAjaxRequest(params);
};

/************************************************************
FUNCTION: BCCShopify.removeItem(variant_id, callback)
*************************************************************

POST to cart/update.js

Example Response:

The JSON of the amended cart.

If you're trying to change the quantity of an item that's not been added 
to the cart, there will be no error, and yet no change to the cart.

************************************************************/
BCCShopify.removeItem = function(variant_id, callback) {
	var params = {
		type: 'POST',
		url: '/cart/update.js',
		data: "updates["+variant_id+"]=0",
		//data:  'quantity=0&id='+variant_id,
		dataType: 'json',
		success: function(cart) { 
			if ((typeof callback) === 'function') {
				callback(cart);
			}
			else {
				BCCShopify.onCartUpdate(cart);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	};
	BCCShopify.queueAjaxRequest(params);
};

/************************************************************
FUNCTION: BCCShopify.clear(callback)
*************************************************************

POST to cart/clear.js returns the cart in JSON.

It removes all the items in the cart, but does not clear 
the cart attributes nor the cart note.

Example Response:

{
	"items": [
		
	],
	"requires_shipping": false,
	"total_price": 0,
	"attributes": null,
	"item_count": 0,
	"note": null,
	"total_weight": 0
}
************************************************************/

BCCShopify.clear = function(callback) {
	var params = {
		type: 'POST',
		url: '/cart/clear.js',
		data:  '',
		dataType: 'json',
		success: function(cart) { 
			if ((typeof callback) === 'function') {
				callback(cart);
			}
			else {
				BCCShopify.onCartUpdate(cart);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	};
	BCCShopify.queueAjaxRequest(params);
};

/************************************************************
FUNCTION: BCCShopify.updateCartFromForm(form_id, callback)
*************************************************************

POST to cart/update.js

Response if successful

The JSON of the amended cart.

Response if error
If the desired change in quantity is not possible (say you have 60 items 
in the cart for item X, and item X stock is 80, and you're trying to 
change its quantity to a 100), then no change is made to the cart.

{
    "description": "We only have 80 item(s) of aquarius - medium left.",
    "status": 500,
    "message": "Error"
}
************************************************************/
BCCShopify.updateCartFromForm = function(form_id, callback) {
	var params = {
		type: 'POST',
		url: '/cart/update.js',
		data: jQuery('#' + form_id).serialize(),
		dataType: 'json',
		success: function(cart) {
			if ((typeof callback) === 'function') {
				callback(cart);
			}
			else {
				BCCShopify.onCartUpdate(cart);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	};
	BCCShopify.queueAjaxRequest(params);
};

/************************************************************
FUNCTION: BCCShopify.updateCartAttributes(attributes, callback)
*************************************************************

POST to cart/update.js

To clear a particular attribute, set its value to an empty string.
Receives attributes as a hash or array.

Example usage:

Hash:
BCCShopify.updateCartAttributes({ 'my key' : 'my value', ... }, callback)

Array:
BCCShopify.updateCartAttributes([ { key: 'my key', value: 'my value' }, ... ], callback)


Response:

The JSON of the amended cart.

************************************************************/

BCCShopify.updateCartAttributes = function(attributes, callback) {
	var data = '';
	if (jQuery.isArray(attributes)) {
		jQuery.each(attributes, function(indexInArray, valueOfElement) {
			var key = attributeToString(valueOfElement.key);
			if (key !== '') {
				data += 'attributes[' + key + ']=' + attributeToString(valueOfElement.value) + '&';
			}
		});
	}
	else if ((typeof attributes === 'object') && attributes !== null) {
		jQuery.each(attributes, function(key, value) {
				data += 'attributes[' + attributeToString(key) + ']=' + attributeToString(value) + '&';
		});
	}
	var params = {
		type: 'POST',
		url: '/cart/update.js',
		data: data,
		dataType: 'json',
		success: function(cart) {
			if ((typeof callback) === 'function') {
				callback(cart);
			}
			else {
				BCCShopify.onCartUpdate(cart);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	};
	BCCShopify.queueAjaxRequest(params);
};

/************************************************************
FUNCTION: BCCShopify.updateCartNote(note, callback)
*************************************************************

POST to cart/update.js

Sets the cart note.

Response:

The JSON of the amended cart.

************************************************************/

BCCShopify.updateCartNote = function(note, callback) {
	var params = {
		type: 'POST',
		url: '/cart/update.js',
		data: 'note=' + attributeToString(note),
		dataType: 'json',
		success: function(cart) {
			if ((typeof callback) === 'function') {
				callback(cart);
			}
			else {
				BCCShopify.onCartUpdate(cart);
			}
		},
		error: function(XMLHttpRequest, textStatus) {
			BCCShopify.onError(XMLHttpRequest, textStatus);
		}
	};
	BCCShopify.queueAjaxRequest(params);
};

/************************************************************

If jQuery > 1.4, set BCCShopify.param = jQuery.param

Usage: jQuery.param( obj )
		obj:
		Type: Array or PlainObject
		An array or object to serialize.

Usage: jQuery.param( obj, traditional )
		obj
		Type: Array or PlainObject
		An array or object to serialize.

		traditional
		Type: Boolean
		A Boolean indicating whether to perform a traditional "shallow" serialization.

jQuery.param creates a serialized representation of an array or object, 
suitable for use in a URL query string or Ajax request.

As of jQuery 1.4, the $.param() method serializes deep objects recursively

As of jQuery 1.8, the $.param() method no longer uses jQuery.ajaxSettings.traditional 
as its default setting and will default to false. For best compatibility across 
versions, call $.param() with an explicit value for the second argument and do not use defaults.

See more @ http://api.jquery.com/jquery.param/

Examples:

$.param({ a: { b: 1, c: 2 }, d: [ 3, 4, { e: 5 } ] });

Returns "a[b]=1&a[c]=2&d[]=3&d[]=4&d[2][e]=5"

************************************************************/

if (jQuery.fn.jquery >= '1.4') {
	BCCShopify.param = jQuery.param;
} else {
	BCCShopify.param = function( a ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction(value) ? value() : value;
				s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray(a) || a.jquery ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
		
		} else {
			for ( var prefix in a ) {
				BCCShopify.buildParams( prefix, a[prefix], add );
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

	BCCShopify.buildParams = function( prefix, obj, add ) {
		if ( jQuery.isArray(obj) && obj.length ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					BCCShopify.buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, add );
				}
			});
			
		} else if ( obj != null && typeof obj === "object" ) {
			if ( BCCShopify.isEmptyObject( obj ) ) {
				add( prefix, "" );

			// Serialize object item.
			} else {
				jQuery.each( obj, function( k, v ) {
					BCCShopify.buildParams( prefix + "[" + k + "]", v, add );
				});
			}
					
		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	BCCShopify.isEmptyObject = function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	}
}

/************************************************************
Private Functions

function floatToString(numeric, decimals) 

Used by tools such as FormatMoney to convert floating point numbers to strings with a specific amount of decimals.

************************************************************/

function floatToString(numeric, decimals) {
	var amount = numeric.toFixed(decimals).toString();
	if(amount.match(/^\.\d+/)) {return "0"+amount; }
	else { return amount; }
}

/************************************************************
Private Functions

function floatToString(numeric, decimals) 

Used by API like updateCartAttributes to anything to a string and trim actual strings.

************************************************************/

function attributeToString(attribute) {
	if ((typeof attribute) !== 'string') {
		// Converts to a string.
		attribute += '';
		if (attribute === 'undefined') {
			attribute = '';
		}
	}
	// Removing leading and trailing whitespace.
	return jQuery.trim(attribute);
}
