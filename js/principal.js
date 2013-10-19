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
		document.getElementById('mapa_normal').hide();
		document.getElementById('mapa_satelital').hide();
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
		if (document.getElementById('map-canvas')) {
		document.getElementById('mapa_normal').hide();
		}
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
		document.getElementById('mapa_normal').hide();
		document.getElementById('mapa_satelital').hide();
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
		document.getElementById('mapa_normal').hide();
		document.getElementById('mapa_satelital').hide();
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
		document.getElementById('mapa_normal').hide();
		document.getElementById('mapa_satelital').hide();
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
		document.getElementById('mapa_normal').hide();
		document.getElementById('mapa_satelital').hide();
	}
}

// Invoke Camera ----------------------------------------------------------------------
function invokeCamera() {
	var canvas = document.getElementById('image-presenter');
	mode = blackberry.invoke.card.CAMERA_MODE_PHOTO,
	onCameraDone = function(path) {
		canvas.src = "file://"+path;
		canvas.onload=function(){
			if (window.innerHeight === 720 & window.innerWidth === 720) {
				if (canvas.width > canvas.height) {
					canvas.style.width = "722px";
					canvas.style.height = "auto";
				}
				else {
					canvas.style.height = "611px";
					canvas.style.width = "auto";
				}
			}
			else {
				if (canvas.width > canvas.height) {
					canvas.style.width = "768px";
					canvas.style.height = "auto";
				}
				else {
					canvas.style.height = "1141px";
					canvas.style.width = "auto";
				}
			}
		}
		if (canvas.src){
			canvas.style.display = "inline";
			document.getElementById('tomarFoto').hide();
			PinchToZoom();
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
		canvas.onload=function(){
			if (window.innerHeight === 720 & window.innerWidth === 720) {
				if (canvas.width > canvas.height) {
					canvas.style.width = "722px";
					canvas.style.height = "auto";
				}
				else {
					canvas.style.height = "611px";
					canvas.style.width = "auto";
				}
			}
			else {
				if (canvas.width > canvas.height) {
					canvas.style.width = "768px";
					canvas.style.height = "auto";
				}
				else {
					canvas.style.height = "1141px";
					canvas.style.width = "auto";
				}
			}
		}
		if (canvas.src){
			canvas.style.display = "inline";
			document.getElementById('tomarFoto').hide();
			PinchToZoom();
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
	document.getElementById('waiting').style.display="block";
	document.getElementById('ubicar').style.display="none";
	if(navigator.geolocation){
		var mapaNormal = document.getElementById('mapa_normal');
		var mapaSatelital = document.getElementById('mapa_satelital');
		document.getElementById('map-canvas').style.position="";
		function onMapSuccess (datos){
			mapaSatelital.style.display="inline";
			document.getElementById('waiting').style.display="none";
			var tipoMapa = google.maps.MapTypeId.ROADMAP;
			var myLat = datos.coords.latitude;
			var myLong = datos.coords.longitude;
			var myLatlng = new google.maps.LatLng(myLat,myLong);
			var mapOptions = {
				center: myLatlng,
				zoom: 18,
				disableDefaultUI:true,
				mapTypeId: tipoMapa
			}

			if (mapaSatelital.style.display= "inline" && google.maps.MapTypeId.ROADMAP) {
				mapaSatelital.onclick=function(){
						map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
						mapaNormal.style.display = "inline";
						mapaSatelital.style.display = "none";
				}
			}
			if (mapaNormal.style.display = "inline" && google.maps.MapTypeId.SATELLITE) {
				mapaNormal.onclick=function(){
						map.setMapTypeId(tipoMapa);
						mapaNormal.style.display = "none";
						mapaSatelital.style.display = "inline";
				}
			}
			var	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			google.maps.event.addListener(map, 'click', function(event) {
				addMarker(event.latLng);
				myLat = event.latLng.lat();
				myLong = event.latLng.lng();
			});

			var image = {
				url: 'assets/icons/location.png',
				size: new google.maps.Size(100, 83),
				anchor: new google.maps.Point(25, 83)
			};

			var marker = new google.maps.Marker({
				position:myLatlng,
				map:map,
				icon: image,
				draggable:true,
				title: "Tu posición",
				animation: google.maps.Animation.DROP
			});

			// Add marker ----------------------------------------------------------------------
			function addMarker(location) {
				if (marker) {
					marker.setPosition(location);
				} else{
					marker = new google.maps.Marker({
						position: location,
						draggable:true,
						animation: google.maps.Animation.DROP,
						map: map
					});
				}
				nueva_posicion = "https://www.google.com.mx/maps/preview#!q="+location.lb+","+location.mb;
				Prueba(nueva_posicion);
			};

			//update Marker Position(latLng) by event listeners---------------------------------

			google.maps.event.addListener(marker, 'dragstart', function() {
				addMarker(marker.getPosition());
			});

			google.maps.event.addListener(marker, 'dragend', function() {
				addMarker(marker.getPosition());
			});

			posicion ="https://www.google.com.mx/maps/preview#!q="+myLat+","+myLong;
			Prueba(posicion);
		};
		function onMapError (error){
			switch(error.code) {
				case error.PERMISSION_DENIED :
					showToast("El usuario negó el permiso para ubicarte");
					break;
				case error.POSITION_UNAVAILABLE:
					showToast("No se pudo determinar tu ubicación");
					break;
				case error.TIMEOUT:
					showToast("Se ha alcanzado el tiempo máximo para ubicarte");
					break;
				case error.TIMEOUT:
					showToast("Error desconocido ajeno a la app");
					break;
			}
			document.getElementById('waiting').style.display="none";
			document.getElementById('map-canvas').style.position="";
			document.getElementById('ubicar').style.display="block";
		};
	
		navigator.geolocation.getCurrentPosition(onMapSuccess,onMapError,{enableHighAccuracy:true,timeout: 10000});
	}
	else{
		showToast("La geolocalización no esta disponible");
		document.getElementById('mostrar_mapa').style.display = 'none';
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
function Prueba(pos){
	console.log(pos);
}
// Invoke to Share content ----------------------------------------------------------------------
function InvokeToShare(){
	try{
		var image = document.getElementById('image-presenter');
		var request = {
			action : 'bb.action.SHARE',
			type: ["text/plain","image/*"],
			data:"hola",
			uri : image.src,
			target_type: ["APPLICATION", "VIEWER", "CARD"]
		};
		blackberry.invoke.card.invokeTargetPicker(request, "Compartir", onShareSuccess, onShareError)

		function onShareSuccess(response) {
			console.log(response);
			
			console.log(response);
			console.log("Invocation works!");
			console.log(request);
		}
		function onShareError(error) {
			console.log(error);
		}
	}
	catch(e){
		showToast("Ocurrio un error");
	}
	
}
