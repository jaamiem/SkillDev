// Creates a new map, centres it on Aberdeen and places it in the element with the ID 'map'
var service;

// For pop-ups which emerge from the markers when they are clicked by the user
var infoWindow;

// Initialise the map from Aberdeen
function initMap() {
	
	var abz = new google.maps.LatLng(57.1497, -2.0943);
	return new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: abz
	});
}
 

// This function places a marker on the passed map at the given location.
function placeMarker(map, parkingName, location, appendToSidebar){
	// Place the marker on the map
	var marker = new google.maps.Marker({
		position: location,
		title: parkingName,
		map: map
	});
	
	// Add a pop-up speech box to any clicked markers
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(parkingName);
		infoWindow.open(map, this);
	});
	
	// If the result is from Google, append it to the sidebar
	if (appendToSidebar) {
		$('#accordion').append(
			'<li>' + parkingName + '</li>'
		);
	}
}

// Callback function for adding results from Google
function markerCallback(result, status) {
	// If Google Places is not down
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		
		$('#accordion').append(
			'<li><h6>Results from Google</h6></li>'
		);
		
		// Add a label for each result
		for (var i = 0; i < result.length; i++) {
			var place = result[i];
			addLabel(result[i]);
		}
	}
}

// Add a label to the map
function addLabel(location) {
	var position = location.geometry.location;
	
	placeMarker(map, location.name, position, true);
}

// These functions synchronise the value of labels with the value of their respective sliders
function updateRatingLabel() {
	$('#ratingDisplay').html($('#ratingSlider').val());
}
function updatePriceLabel() {
	$('#priceDisplay').html('£' + $('#priceSlider').val());
}

// Error handling code
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	
	// If the browser does not support geo-location, or the user values their privacy.
	infoWindow.setContent(browserHasGeolocation ?
						'Error: The Geolocation service failed.' :
						'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

// Get the spots from EJS through node and mongo
var urlParams = location.href.substring(location.href.indexOf("?"));

// Store the map itself
var map;

$(function() {
	var abz = new google.maps.LatLng(57.1497, -2.0943);
	var pos;
	
	// Initialise infoWindow
	infoWindow = new google.maps.InfoWindow();
	
	// Geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			infoWindow.setPosition(pos);
			infoWindow.setContent('Location found.');
			infoWindow.open(map);
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});

	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
	
	// Initialise the map functionality
	map = initMap();
	
	// A request to Google Maps
	var request = {
		location: abz,
		radius: '10000',
		type: ['parking']
	};

	// Initialise Google Places
	service = new google.maps.places.PlacesService(map);
	service.textSearch(request, markerCallback);

	// Toggle for the sidebar
	$('.btn-expand-collapse').click(function(e) {
		$('.navbar-primary').toggleClass('collapsed');
	});

	// If the URL contains a question mark character
	if (urlParams.charAt(0) === "?") {
		$.getJSON('/json/query.json' + urlParams, function(result) {
			//console.log(result);

			// Place a marker on the map for each result
			result.forEach(function(item) {
				placeMarker(map, item.name, {lat: item.lat, lng: item.long}, false);
			});
		});
	}

 	// Create the search box and link it to the UI element.
	var input = document.getElementById('locationSearch');
	var searchBox = new google.maps.places.SearchBox(input);
	//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	
	// Show results where the map currently is
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	// Listeners for changes in the value of the rating and price sliders.
	// In the event of a change, they update text displayed near the slider with a clear value.
	$('#ratingSlider').change(function(event) {
		updateRatingLabel();
	});

	$('#priceSlider').change(function(event) {
		updatePriceLabel();
	});

	// Initial update to price and rating labels
	updatePriceLabel();
	updateRatingLabel();
});
