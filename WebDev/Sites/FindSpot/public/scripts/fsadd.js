var map = initMap();
		
$(function() {
	map.addListener('click', function(event) {
		$('#lat').val(event.latLng.lat());
		$('#long').val(event.latLng.lng());
	});
});
