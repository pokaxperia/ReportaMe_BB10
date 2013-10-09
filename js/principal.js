// Show Tabs-------------------------------------------------------
function showTab(id) {
	if (id == 'foto') {
		document.getElementById('foto').style.display = 'inline';
		document.getElementById('mapa').style.display = 'none';
		document.getElementById('direccion').style.display = 'none';
		document.getElementById('atendidos').style.display = 'none';
		document.getElementById('pendientes').style.display = 'none';
		document.getElementById('no_enviados').style.display = 'none';
		document.getElementById('galeria').show();
		document.getElementById('tomar_foto').show();
		document.getElementById('mostrar_mapa').hide();
		document.getElementById('mostrar_direccion').hide();
	} else if (id == 'mapa') {
		document.getElementById('mapa').style.display = 'inline';
		document.getElementById('foto').style.display = 'none';
		document.getElementById('direccion').style.display = 'none';
		document.getElementById('atendidos').style.display = 'none';
		document.getElementById('pendientes').style.display = 'none';
		document.getElementById('no_enviados').style.display = 'none';
		document.getElementById('galeria').hide();
		document.getElementById('tomar_foto').hide();
		document.getElementById('mostrar_mapa').show();
		document.getElementById('mostrar_direccion').hide();
	} else if (id == 'direccion') {
		document.getElementById('direccion').style.display = 'inline';
		document.getElementById('mapa').style.display = 'none';
		document.getElementById('foto').style.display = 'none';
		document.getElementById('atendidos').style.display = 'none';
		document.getElementById('pendientes').style.display = 'none';
		document.getElementById('no_enviados').style.display = 'none';
		document.getElementById('galeria').hide();
		document.getElementById('tomar_foto').hide();
		document.getElementById('mostrar_mapa').hide();
		document.getElementById('mostrar_direccion').show();	
	} else if (id == 'atendidos') {
		document.getElementById('atendidos').style.display = 'inline';
		document.getElementById('mapa').style.display = 'none';
		document.getElementById('foto').style.display = 'none';
		document.getElementById('direccion').style.display = 'none';
		document.getElementById('pendientes').style.display = 'none';
		document.getElementById('no_enviados').style.display = 'none';
		document.getElementById('galeria').hide();
		document.getElementById('tomar_foto').hide();
		document.getElementById('mostrar_mapa').hide();
		document.getElementById('mostrar_direccion').hide();
	} else if (id == 'pendientes') {
		document.getElementById('pendientes').style.display = 'inline';
		document.getElementById('mapa').style.display = 'none';
		document.getElementById('foto').style.display = 'none';
		document.getElementById('direccion').style.display = 'none';
		document.getElementById('atendidos').style.display = 'none';
		document.getElementById('no_enviados').style.display = 'none';
		document.getElementById('galeria').hide();
		document.getElementById('tomar_foto').hide();
		document.getElementById('mostrar_mapa').hide();
		document.getElementById('mostrar_direccion').hide();
	} else if (id == 'no_enviados') {
		document.getElementById('no_enviados').style.display = 'inline';
		document.getElementById('mapa').style.display = 'none';
		document.getElementById('foto').style.display = 'none';
		document.getElementById('direccion').style.display = 'none';
		document.getElementById('pendientes').style.display = 'none';
		document.getElementById('atendidos').style.display = 'none';
		document.getElementById('galeria').hide();
		document.getElementById('tomar_foto').hide();
		document.getElementById('mostrar_mapa').hide();
		document.getElementById('mostrar_direccion').hide();
	}
}

// Invoke Camera ----------------------------------------------------------------------
function invokeCamera() {
	var canvas = document.getElementById('image-presenter');
	mode = blackberry.invoke.card.CAMERA_MODE_PHOTO,
	onCameraDone = function(path) {
		canvas.src = "file://"+path;
		if (canvas.src){
			document.getElementById('tomarFoto').hide();
			onResize(path);
		}
	},
	onCameraCancel = function (reason) {
		if (canvas.src=="") {
			showToast("No hay imagen");
		}
	},
	onCameraError = function (error) {
		if (error) {
			showToast("Hay un error con la cámara");
		}
		else {
			console.log("invoke success " );
		}
	};
	blackberry.invoke.card.invokeCamera(mode, onCameraDone, onCameraCancel, onCameraError);
}
// Invoke FilePicker (image gallery) ----------------------------------------------------------------------
function invokeFilePicker() {
	var canvas = document.getElementById('image-presenter');
	options = {
		filter: ["*.jpg","*.png","*.gif","*.jpeg"],
		mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
		sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_DATE,
		sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_DESCENDING,
		type: [blackberry.invoke.card.FILEPICKER_TYPE_PICTURE],
		viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID
	},
	onPickerDone = function(path){
		canvas.src = "file://"+path;
		if (canvas.src){
			document.getElementById('tomarFoto').hide();
/*			canvas.onload = function(){
				var width = canvas.width;
				var height = canvas.height;
				onResize(path,width,height);
			}*/
		}
	},
	onPickerCancel = function (reason) {
		if (canvas.src=="") {
			showToast("No hay imagen");
		}
	},
	onPickerInvoke = function(error) {
		if (error) {
			showToast("No se puede acceder a los archivos");
		} else {
			console.log("Invoke success" );
		}
	};
	blackberry.invoke.card.invokeFilePicker (options, onPickerDone, onPickerCancel, onPickerInvoke);
}
// Resize image to share ----------------------------------------------------------------------
/*function onResize(path,w,h){
	var image = new Image();
	image.onload=function(){
		var canvas = document.getElementById('image-to-share');
		var ctx = canvas.getContext("2d");
		image.width = w / 2;
		image.height = h / 2;
		canvas.width=image.width;
		canvas.height=image.height;
		console.log(image.width+","+image.height);
		ctx.drawImage(image,0,0,image.width,image.height);
		var dataURL = canvas.toDataURL("image/png");
		document.getElementById("to-share").src = dataURL;
		console.log(dataURL);
	}
	image.src="file://"+path;
}*/
// Invoke to Share content ----------------------------------------------------------------------
function InvokeToShare(){
	var image = document.getElementById('image-presenter');
	var request = {
		action : 'bb.action.SHARE',
		type: 'image/png',
		uri : image.src,
		target_type: ["CARD","APPLICATION"]
	};
	blackberry.invoke.card.invokeTargetPicker(request, "Compartir", onShareSuccess, onShareError)
}
function onShareSuccess(response) {
	console.log("Invocation works!");
}
function onShareError(error) {
	console.log(error);
}
// Geolocation ----------------------------------------------------------------------
function Map(){
	document.getElementById('map-canvas').style.position="absolute";
	document.getElementById('waiting').style.display="block";
	document.getElementById('ubicar').style.display="none";
	if(navigator.geolocation){
	document.getElementById('map-canvas').style.position="";
		navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError,{enableHighAccuracy:true});
	}
	else{
		showToast("La geolocalización no esta disponible");
	}	
}
function onMapSuccess (datos){
	document.getElementById('waiting').style.display="none";
	var gpsPosition = datos;
	var coordinates = gpsPosition.coords;
	myLat = coordinates.latitude;
	myLong = coordinates.longitude;
	var myLatlng = new google.maps.LatLng(myLat,myLong);
	var mapOptions = {
		center: myLatlng,
		zoom: 17,
		zoomControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	google.maps.event.addListener(map, 'click', function(event) {
		addMarker(event.latLng);
		lat = event.latLng.lat();
		lon = event.latLng.lng();
		var link ="https://www.google.com.mx/maps/preview#!q="+myLat+","+myLong;
	});
	var marker = new google.maps.Marker({
		position:myLatlng,
		map:map
	});
	// Add marker ----------------------------------------------------------------------
	function addMarker(location) {
		if (marker) {
			marker.setPosition(location)
		} else{
			marker = new google.maps.Marker({
				position: location,
				map: map
			});
		}
	}

}
function onMapError (error){
	switch(error.code) {
		case error.PERMISSION_DENIED :
			showToast("El usuario negó el permiso para ubicarte");
			break;
		case error.POSITION_UNAVAILABLE:
			showToast("No se pudo determinar tu ubicación");
			break;
		case error.TIMEOUT:
			showToast("Error. Se ha alcanzado el tiempo máximo para ubicarte");
			break;
		case error.TIMEOUT:
			showToast("Error desconocido ajeno a la app");
			break;
	}
	document.getElementById('waiting').style.display="none";
	document.getElementById('map-canvas').style.position="";
	document.getElementById('ubicar').style.display="block";
}
// Show Toast ----------------------------------------------------------------------
function showToast(message){
	blackberry.ui.toast.show(message);
}