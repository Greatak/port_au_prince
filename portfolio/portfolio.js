var geojson = [
  { "geometry": { "type": "Point", "coordinates": [-83.00508048706054, 39.95497423123964] },
    "properties": { "id": "home", "zoom": 12 } },
  { "geometry": { "type": "Point", "coordinates": [-83.00508048706054,40.3497423123964] },
    "properties": { "id": "cdfa", "zoom": 8 } },
  { "geometry": { "type": "Point", "coordinates": [-83.00508048706054,39.95497423123964] },
    "properties": { "id": "sim", "zoom": 11 } },
  { "geometry": { "type": "Point", "coordinates": [-83.560028, 41.665845] },
    "properties": { "id": "tma", "zoom": 11 } },
  { "geometry": { "type": "Point", "coordinates": [-81.695747, 41.502207] },
    "properties": { "id": "cleveland", "zoom": 12 } },
  { "geometry": { "type": "Point", "coordinates": [-82.982488, 39.949563] },
    "properties": { "id": "parson", "zoom": 14 } }
];
var tiles = mapbox.layer().tilejson({
    tiles: [ "http://a.tiles.mapbox.com/v3/greatak.map-j1ffwgdg/{z}/{x}/{y}.png" ]
    });
var spots = mapbox.markers.layer()
  // Load up markers from geojson data.
  .features(geojson)
  // Define a new factory function. Takes geojson input and returns a
  // DOM element that represents the point.
  .factory(function(f) {
    var el = document.createElement('div');
    el.className = 'spot spot-' + f.properties.id;
    return el;
  });
var map = mapbox.map('map', [tiles,spots],null,[])
        .centerzoom({ lon:-83.00508048706054, lat:39.95497423123964 }, 12);;

// Array of story section elements.
var sections = document.getElementsByTagName('section');

// Array of marker elements with order matching section elements.
var markers = _(sections).map(function(section) {
  return _(spots.markers()).find(function(m) {
    return m.data.properties.id === section.id;
  });
});

// Helper to set the active section.
var setActive = function(index, ease) {
  // Set active class on sections, markers.
  _(sections).each(function(s) { s.className = s.className.replace(' active', '') });
  _(markers).each(function(m) { m.element.className = m.element.className.replace(' active', '') });
  sections[index].className += ' active';
  markers[index].element.className += ' active';

  // Set a body class for the active section.
  document.body.className = 'section-' + index;

  // Ease map to active marker.
  if (!ease) {
    map.centerzoom(markers[index].location, markers[index].data.properties.zoom||14);
  } else {
    map.ease.location(markers[index].location).zoom(markers[index].data.properties.zoom||14).optimal(0.5, 1.00);
  }

  return true;
};

// Bind to scroll events to find the active section.
window.onscroll = _(function() {
  // IE 8
  if (window.pageYOffset === undefined) {
    var y = document.documentElement.scrollTop;
    var h = document.documentElement.clientHeight;
  } else {
    var y = window.pageYOffset;
    var h = window.innerHeight;
  }

  // If scrolled to the very top of the page set the first section active.
  if (y === 0) return setActive(0, true);

  // Otherwise, conditionally determine the extent to which page must be
  // scrolled for each section. The first section that matches the current
  // scroll position wins and exits the loop early.
  var memo = 0;
  var buffer = (h * 0.3333);
  var active = _(sections).any(function(el, index) {
    memo += el.offsetHeight;
    return y < (memo-buffer) ? setActive(index, true) : false;
  });

  // If no section was set active the user has scrolled past the last section.
  // Set the last section active.
  if (!active) setActive(sections.length - 1, true);
}).debounce(10);

// Set map to first section.
setActive(0, false);