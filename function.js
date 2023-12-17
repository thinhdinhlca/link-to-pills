window.function = function (centerString, radius, zoom) {
  // Data
  centerString = centerString.value ?? "";
  radius = radius.value ?? 5;
  zoom = zoom.value ?? 5;

  // Define your Mapbox access token
  const accessToken = 'pk.eyJ1IjoiZHlsYW5kaWNrbWFuIiwiYSI6ImNrdWlqcHdzazBzbXYyd29mM2hmaTVvdHEifQ.HlV_ER1WGiQiDwItCNMisg';

  // HTML content for the map
  let htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
<script src='https://api.mapbox.com/mapbox.js/plugins/turf/v2.0.2/turf.min.js'></script>
<script src='https://npmcdn.com/mapbox-gl-circle/dist/mapbox-gl-circle.min.js'></script>
<style>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
</head>
<body>
<div id="map"></div>
<script>
mapboxgl.accessToken = '${accessToken}';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v8',
    center: [${centerString}],
    zoom: ${zoom},
    interactive: true
});

// Add a circle to the map
var myCircle = new MapboxCircle([${centerString}], ${radius}*1000, {
        editable: false,
        fillColor: '#29AB87'
    }).addTo(map);

// Add a marker to the map at the same coordinates as the circle's center
var marker = new mapboxgl.Marker()
    .setLngLat([${centerString}])
    .addTo(map);
    
// Add click event to the map for reverse geocoding
map.on('click', function(e) {
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + e.lngLat.lng + ',' + e.lngLat.lat + '.json?types=poi&access_token=${accessToken}')
        .then(response => response.json())
        .then(data => {
            var placeText = data.features.length > 0 ? data.features[0].text : 'Unknown Place';
            var placeName = data.features.length > 0 ? data.features[0].place_name : 'No detailed address found';
            var category = data.features.length > 0 && data.features[0].properties.category ? data.features[0].properties.category : 'No category found';

            // Remove the place text from the place name to avoid duplication
            var cleanedPlaceName = placeName.replace(placeText, '').replace(/^,|,$/g, '').trim();

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + placeText + '</h3><p>' + cleanedPlaceName + '</p><p style="font-style: italic; font-size: smaller;">' + "Categories: " + category + '</p>')
                .addTo(map);
        });
});


</script>
</body>
</html>`;

  // Encode the HTML content to a data URI
  let encodedHtmlContent = encodeURIComponent(htmlContent);
  let dataUri = `data:text/html;charset=utf-8,${encodedHtmlContent}`;
  return dataUri;
}
