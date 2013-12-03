var tipoMapa,mapaTipo,cambio,compartir,static_map,map,canvas,posicion;

function Calificar(){
    blackberry.invoke.invoke({
        type:"application/xhtml+xml",
        uri: "http://appworld.blackberry.com/webstore/content/39950935"
    }, onShareSuccess, onShareError);
}
function onShareSuccess(response) {
	console.log("Invocation works!");
}
function onShareError(error) {
	console.log(error);
}
function Recommend(){
	blackberry.bbm.platform.users.inviteToDownload();
	return false;
}
// Geolocation ----------------------------------------------------------------------
function Map(){
	cambio = document.getElementById('tipoMapa');
	if (cambio) {
		document.getElementById('mapa').removeChild(cambio);	
		document.getElementById('waiting').style.zIndex="1";
	}
	document.getElementById('waiting').style.display="block";
	document.getElementById('ubicar').style.display="none";
	if(navigator.geolocation){

		document.getElementById('map-canvas').style.position="";
		function onMapSuccess (datos){
			var quitar = document.body.childNodes.item(12).nodeName.id;	
//			document.getElementById('principal').removeChild(quitar);	
			google.maps.visualRefresh = true;
			document.getElementById('waiting').style.display="none";

			var toggle = document.createElement('div');
			toggle.setAttribute('id','tipoMapa');
			toggle.setAttribute('data-bb-type','toggle');
			toggle.setAttribute('data-bb-checked','true');
			toggle.setAttribute('data-bb-on', 'Nmal');
			toggle.setAttribute('data-bb-off', 'Satel');
			toggle.onchange = function() {
				if(document.getElementById('tipoMapa').getChecked()==true){
					map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
				}
				else{
					map.setMapTypeId(google.maps.MapTypeId.HYBRID);
				}
			};
			toggle = bb.toggle.style(toggle);
			document.getElementById('mapa').appendChild(toggle);

			tipoMapa = google.maps.MapTypeId.ROADMAP;
			var myLat = datos.coords.latitude;
			var myLong = datos.coords.longitude;
			var myLatlng = new google.maps.LatLng(myLat,myLong);

			var mapOptions = {
				center: myLatlng,
				zoom: 18,
				disableDefaultUI:true,
				mapTypeId: tipoMapa,
			}
			setTimeout(function(){mapOptions},1000);

			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			setTimeout(function(){map},1000);

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
				animation: google.maps.Animation.DROP,
				crossOnDrag:true,
				draggable:true,
				icon: image,
				map:map,
				position:myLatlng
			});

			// Add marker ----------------------------------------------------------------------
			function addMarker(location) {
				if (marker) {
					marker.setPosition(location);
				} else{
					marker = new google.maps.Marker({
						animation: google.maps.Animation.DROP,
						crossOnDrag:true,
						draggable:true,
						map: map,
						position: location
					});
				}
				posicion = "https://www.google.com.mx/maps/preview#!q="+location.ob+","+location.pb;
				if(document.getElementById('tipoMapa').getChecked()==true){
					mapaTipo = "roadmap";
					static_map = "http://maps.google.com/maps/api/staticmap?sensor=false&center="+location.ob+","+location.pb+"&zoom=18&size=768x1141&maptype=roadmap&markers=color:green%7Clabel:P%7C"+location.ob+","+location.pb
				}
				else{
					mapaTipo = "hybrid";
					static_map = "http://maps.google.com/maps/api/staticmap?sensor=false&center="+location.ob+","+location.pb+"&zoom=20&size=768x1141&maptype=hybrid&markers=color:green%7Clabel:P%7C"+myLat+","+location.pb
				}
				//static_map = "http://maps.google.com/maps/api/staticmap?sensor=false&center="+location.ob+","+location.pb+"&zoom=18&size=768x1141&maptype="+mapaTipo+"&markers=color:green%7Clabel:P%7C"+location.ob+","+location.pb;
				google_map = "http://maps.google.com/maps?q="+location.ob+","+location.pb;
				apple_map = "http://maps.apple.com/maps?q="+location.ob+","+location.pb;
				blackberry_map = "http://maps.blackberry.com?lat="+location.ob+"&lon="+location.pb+"&z=1";
				console.log(location);
				//"http://maps.google.com/maps?q=loc:"+location.ob+","+location.pb;
			};

			//update Marker Position(latLng) by event listeners---------------------------------
			google.maps.event.addListener(marker, 'dragstart', function() {
				addMarker(marker.getPosition());
			});

			google.maps.event.addListener(marker, 'dragend', function() {
				addMarker(marker.getPosition());
			});

			posicion ="https://www.google.com.mx/maps/preview#!q="+myLat+","+myLong;
			console.log(posicion);
			if(document.getElementById('tipoMapa').getChecked()==true){
				mapaTipo = "roadmap";
				static_map = "http://maps.google.com/maps/api/staticmap?sensor=false&center="+myLat+","+myLong+"&zoom=18&size=768x1141&maptype=roadmap&markers=color:green%7Clabel:P%7C"+myLat+","+myLong

			}
			else{
				mapaTipo = "hybrid";
				static_map = "http://maps.google.com/maps/api/staticmap?sensor=false&center="+myLat+","+myLong+"&zoom=20&size=768x1141&maptype=hybrid&markers=color:green%7Clabel:P%7C"+myLat+","+myLong
			}
			
			google_map = "http://maps.google.com/maps?q="+myLat+","+myLong;
			apple_map = "http://maps.apple.com/maps?q="+myLat+","+myLong;
			blackberry_map = "http://maps.blackberry.com?lat="+myLat+"&lon="+myLong+"&z=1"
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
				default:
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
		document.getElementById('ubicarOtraVez').style.display = 'none';
	}
}
// Show Toast ----------------------------------------------------------------------
function showToast(message){
	blackberry.ui.toast.show(message);
}
function InvokeToShareLocation(){
	if (!map) {
		showToast("No hay mapa que compartir");
	}
	var request = {
		action : 'bb.action.SHARE',
		mime:"text/plain",
		data:"\n\nStatic Map\n\n"+static_map+"\n\n Google Map\n\n"+google_map+"\n\n Apple Map\n\n"+apple_map+"\n\n BlackBerry Map\n\n"+blackberry_map,
		target_type: ["APPLICATION", "VIEWER", "CARD"]
	};
	blackberry.invoke.card.invokeTargetPicker(request, "Ubicación", onShareSuccess, onShareError)

	function onShareSuccess(response) {
		console.log("Invocation works!");
	}
	function onShareError(error) {
		console.log(error);
	}
}