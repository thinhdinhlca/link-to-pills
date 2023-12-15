window.function = function (center, radiusKm) {

  // Extract values or set default to empty string
  center = center.value ?? "";
  radiusKm = radiusKm.value ?? "";
  
  // Ensure the input is converted correctly
  center = center.split(',').map(Number); // Convert center to an array of numbers
  radiusKm = Number(radiusKm); // Ensure radius is a number

  // Use Turf.js to create a circle GeoJSON object around the center
  const circle = turf.circle(center, radiusKm, { steps: 64, units: 'kilometers' });

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Map with Radius</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
<script src='https://api.mapbox.com/mapbox.js/plugins/turf/v2.0.2/turf.min.js'></script>
<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; }
  #map { position: absolute; top: 0; bottom: 0; width: 100%; }
</style>
</head>
<body>
<div id="map"></div>
<script>
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: ${JSON.stringify(center)},
  zoom: 12
});

map.on('load', function () {
  map.addSource('circle', {
    type: 'geojson',
    data: ${JSON.stringify(circle)}
  });
  
  map.addLayer({
    id: 'circle',
    type: 'fill',
    source: 'circle',
    paint: {
      'fill-color': '#007cbf',
      'fill-opacity': 0.5
    }
  });

  const bounds = turf.bbox(circle);
  map.fitBounds(bounds, { padding: 20 });
});
</script>
</body>
</html>`;

  let encodedHtmlContent = encodeURIComponent(htmlContent);
  let dataUri = `data:text/html;charset=utf-8,${encodedHtmlContent}`;
  return dataUri;
}
