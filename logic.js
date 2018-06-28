var mapBox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoibXUxM2oiLCJhIjoiY2ppMjlvYjZjMHRnZzN3bWpoMTVncnR6cyJ9." +
"WHKvvI3OWTHFxbuXLiYy9A"

// Create a map object
var myMap = L.map("map", {
  center: [37.09, -45.71],
  zoom: 3
});

// Add a tile layer
L.tileLayer(mapBox).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
  return population *50000;
}
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',function(error,data){
var cities=data['features'];

for (var i = 0; i < cities.length; i++) {
  L.circle(cities[i]['geometry']['coordinates'].slice(0,2).reverse(), {
    fillOpacity: 0.55,
    color: getColor(cities[i]['properties']['mag']),
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(cities[i]['properties']['mag'])
  }).bindPopup("<h1>" + cities[i]['properties']['place'] + "</h1> <hr> <h3>Magnitude: " + cities[i]['properties']['mag'] + "</h3>").addTo(myMap);
}
})

function  getColor(s) {
  if ( s < 1) 
      return '#ffc100';
  else if ( s < 2 ) 
      return '#ff9a00';
  else if (s <3 )
      return '#ff7400';
  else if (s <4 )
      return '#ff4d00';
  else 
      return '#ff0000';
}
var legend = L.control({position: 'bottomright'});


legend.onAdd = function (myMap) {
  var legendDiv =  L.DomUtil.create('div', 'info legend'),
     checkins = [0,1,2,3,4],
     titles = ['<1','1-2', '2-3', '3-4', '>4']
     title= ['<strong>Marker Color Codes</strong>'],
      labels = [];
  for ( var i=0; i < checkins.length; i++) {
      labels.push( 
          '<i class="square" style="background:' + getColor(checkins[i]) + '"></i>'+ titles[i] + '')
  }
  legendDiv.innerHTML = labels.join('<br>');


  return legendDiv;
}

legend.addTo(myMap);