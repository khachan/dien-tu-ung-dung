var _isp_version = "4.13.4531533";
var _isp_min_on = true;
var _isp_host_prefix = null;

try	{
	var _isp_min_on_host = localStorage.getItem('_isp_min_on_host');	
	if (_isp_min_on_host != null && _isp_min_on_host=='1')	{	_isp_min_on = false;	}
}	catch (e) {}	

try {
	_isp_host_prefix = localStorage.getItem('_isp_host_prefix');
	if (_isp_host_prefix.match(/^[a-z0-9-]+$/)) {
		_isp_min_on = false;
	} else {
		_isp_host_prefix = null;
	}
	_isp_force_version = localStorage.getItem('_isp_force_version');
} catch (e) {}

function getJSvars(c, d, e) {
    var g = document.getElementsByTagName("script");
    null == e && (e = "");
    for (var a = 0; a < g.length; a++) {
        var h = g[a].src;
        if (0 <= h.indexOf(c))
            if (d = d.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), c = RegExp("[\\?&]" + d + "=([^&#]*)").exec(h), null == c) break;
            else return c[1]
    }
    return e;
}
var _isp_mode = getJSvars("acp-magento.js", "mode", "magento"),
    _isp_js_load, _isp_js_load_https;


_isp_js_load 		= "http://cdn-gae-default.instantsearchplus.com";
_isp_js_load_https  = "https://acp-magento.appspot.com";
if (_isp_host_prefix) {
	console.info('%cWARNING: %cInstantSearch+ host prefix is %c' + _isp_host_prefix,
				 'font-weight: bold; color: #F00',
				 'font-weight: bold',
			     'font-weight: bold; color: #F00');
	_isp_js_load_https  = "https://" + _isp_host_prefix + "-dot-acp-magento.appspot.com";
	_isp_js_load = _isp_js_load_https;
	if (_isp_force_version) {
		_isp_version = _isp_force_version;
	} else {
		_isp_version += "." + ((new Date).getTime()/1000).toString();
	}
}

var _isp_filename = "/js/isp.v.2.0.1.";
if (_isp_min_on)	{	_isp_filename += 'min.';	}
_isp_filename += "js?v=" + _isp_version + "&mode=" + _isp_mode;
var _isp_final_filename = _isp_js_load + _isp_filename;
if ("https:" == window.location.protocol)	{ _isp_final_filename = _isp_js_load_https + _isp_filename;	}

var _isp_b = document.createElement("script");
_isp_b.type = "text/javascript";
_isp_b.src = _isp_final_filename;
_isp_b.async = !0;
var _isp_a = document.getElementsByTagName("script")[0];

if ( typeof _isp_injected_already === 'undefined' )	{
	_isp_a.parentNode.insertBefore(_isp_b, _isp_a);
	var _isp_injected_already = true;
}
