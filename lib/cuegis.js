var GIS_SERVER;
var IMPL_TYPE;

document.write('<script type="text/javascript" src="gisutil.js" ></script>');

// To read config.xml
CALLER = function() {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", "config.xml", false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	return xmlDoc;
}

// To parse config.xml and set it in var and trigger map server interface import
CONFIG_CALLER = function() {
	_call = new CALLER();
	this.config = _call.getElementsByTagName("Config");
	this.IMPL_TYPE = this.config[0].getElementsByTagName("implementation")[0].childNodes[0].nodeValue;
	this.PATH = this.config[0].getElementsByTagName(this.IMPL_TYPE + "_URL")[0].childNodes[0].nodeValue;
	this._impl = this.config[0].getElementsByTagName(this.IMPL_TYPE + "_IMPL")[0].childNodes[0].nodeValue;
	GIS_SERVER = this.config[0].getElementsByTagName("GIS_SERVER")[0].childNodes[0].nodeValue;
	IMPL_TYPE = this.IMPL_TYPE;

	console.log(this.config + " - " + this.PATH + " - " + this.IMPL_TYPE);

	_interface = new _MAPINTERFACE(IMPL_TYPE);
	_interface._GETINTERFACE(this._impl);
}

// To import implemented map server interface
_MAPINTERFACE = function() {
}
_MAPINTERFACE.prototype._GETINTERFACE = function(_impl) {
	this._impl = _impl;
	console.log("loading interface for map server... " + this._impl);
	document.write('<script type="text/javascript" src="' + this._impl
			+ '_impl.js" ></script>');
}

// To initiate reading the config parameters
var _con_caller = new CONFIG_CALLER();
var path = _con_caller.PATH;
var impl = _con_caller.IMPL_TYPE;

document.write('<script type="text/javascript" src="' + path + '" ></script>');

CuecentGIS = function() {
}
CuecentGIS.prototype.CreateMap = function(component, options) {

	this.component = component;
	this.options = options;
	this.optionsObject=this.options;
	//this.optionsJSON = JSON.stringify(options);
	//this.optionsObject = JSON.parse(this.optionsJSON);

	this.zoomLevel = this.optionsObject.zoom;
	this.refreshTime = this.optionsObject.refresh;
	this.lat = this.optionsObject.latitude;
	this.lon = this.optionsObject.longitude;
	console.log(" GIS Server ::  " + GIS_SERVER + " - " + IMPL_TYPE);

	var _mapobj = CreateMAPServerContainer(IMPL_TYPE,GIS_SERVER);
	console.log(_mapobj);
	_mapobj.initialize(this.lat, this.lon, this.zoomLevel, this.component,this.refreshTime);

	return _mapobj;
	// return new GISMap(this.lat, this.lon, this.zoomLevel, this.component);
}

