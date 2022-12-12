import { BrowserRouter as Router, Routes } from 'react-router-dom'
import React, { useRef, useEffect, useState } from 'react'; 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import info from "./information.json";



mapboxgl.accessToken = 'pk.eyJ1IjoiZGNoZW5ldDEwMTciLCJhIjoiY2pzMmswdTBmMXE4ajQzbzloMWVibzVsdSJ9.xH2NkDZmTFe7ioUJ0wPNMQ';
const event1= {"type": "FeatureCollection",
	"features": [
		{type: "Feature",
"geometry": {"type": "Point", "coordinates": [-73.99322412330021, 40.7511059492035]},
"properties": {
name: "Madison Square Garden",
		"event_type": "Sports",
"entertainer": "Knicks vs Lakers",
		"hours": "7:30pm-10pm",
		"capacity": "20,789",
		"capacity_currently": "10,000",
"image1":"https://1000logos.net/wp-content/uploads/2017/12/New-York-Knicks-Logo-768x590.png",
"image2":"https://media.prusaprinters.org/media/prints/103021/images/1031064_195de0b7-0408-4e8a-9fa5-50e498d83cdb/thumbs/cover/1280x960/jpg/lkaers.webp"
        }
      },
      {"type": "Feature",
        "geometry": {"type": "Point", "coordinates": [-73.97538341582957, 40.682744111477064]},
        "properties": {
        name: "Barclays Center",
            "event_type": "Concert",
        "entertainer": "Jayz",
            "hours": "7:30pm-10pm",
            "capacity": "19,00",
            "capacity_currently": "17,000",
        image1:"https://sothebys-com.brightspotcdn.com/dims4/default/65e9a34/2147483647/strip/true/crop/1533x2300+0+0/resize/684x1026!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F44%2Fd5%2F7331dcf545608c0ec90efaea4dd6%2F1-c2a5629.jpg" 
        }
      },
        {"type": "Feature",
        "geometry": {"type": "Point", "coordinates": [-73.95672663095925, 40.80221265059378]},
        "properties": {
        "name": "Paint N Sipr",
          "event_type": " Creative  ",
        "entertainer":  " Bob Ross " ,
        "hours":  " 5pm-11pm ",
        "capacity":  " 60 " ,
        "capacity_currently":   " 45   ",
        "image1": "https://www.kindpng.com/picc/m/427-4276695_paint-n-pour-nyc-paint-and-sip-logos.png"
        }
        }
        
   ]
}

//create empty geoJSON
var eventsGeoJSON = {};
eventsGeoJSON.type = "FeatureCollection";
eventsGeoJSON.features = [];

// loop through events to create features
info._embedded.events.forEach((item, i) => {
  // console.log(item._embedded.venues[0]);
  var venue = item._embedded.venues[0];
  // console.log(venue.location);
  var feature = {};
  feature.type = "Feature";
  feature.geometry = {
    "type": "Point",
    "coordinates": [+venue.location.longitude, +venue.location.latitude]
  };
  // console.log(item);
  // console.log(feature);
  feature.properties = {
    "name": item.name,
    "dates": item.dates,
    "image": item.images[0]
  };
  console.log(feature);
  eventsGeoJSON.features.push(feature);
});
  // import './App.css';


    
    // const fsSourceId = 'featureserver-src'

    // const service = new FeatureService(fsSourceId, map, {
    //   url: 'https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Administrative_Boundaries_Theme/FeatureServer/6'
    // })
    
  
export default 
function App() {
  const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-73.9932241233002);
    const [lat, setLat] = useState(40.7511059492035);
    const [zoom, setZoom] = useState(9);
  
    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/dchenet1017/ckz8v4r2p001315t4whsylv2u',
      center: [lng, lat],
      zoom: zoom
      });
      });

      useEffect(() => {
        if (!map.current) return; // initialize map only once after loaded map 
        map.current.on('load', () => {
          map.current.addSource('open_resturants', {
            type: 'geojson',
            data: event1
            });
          console.log(map.current.getSource("open_resturants"))
          // map.current.addLayer({
          //   'id': 'fill-lyr',
          //   'source': "open_resturants",
          //   'type': 'circle',
          //   'paint': {
          //     'circle-radius': 5,
          //     'circle-color': '#B42222'
          //   }
          // })
            map.current.addLayer({
              'id': 'projects-pulse',
              'type': 'circle',
              'source': 'open_resturants',
              "paint": {
                      "circle-radius": 6,
                      "circle-color": "#B42222"
                  }
            })
          
            map.current.addLayer({
              'id': 'projects',
              'type': 'circle',
              'source': 'open_resturants',
              "paint": {
                      "circle-radius": 6,
                      "circle-color": "#c99393"
                  }
            });
          
            map.current.setPaintProperty('projects-pulse', 'circle-color', '#B42222')
            map.current.setPaintProperty('projects-pulse', 'circle-radius', 3)
            var framesPerSecond = 2;
            var multiplier = 0.1;
            var opacity = .1;
            var circleRadius = 2;
          
            function pulseMarker(timestamp){
              setTimeout(function() {
                requestAnimationFrame(pulseMarker)
                multiplier += .1;
                opacity -= ( .3 / framesPerSecond );
                circleRadius += ( 10 / framesPerSecond );
          
                map.current.setPaintProperty('projects-pulse', 'circle-opacity', opacity)
                map.current.setPaintProperty('projects-pulse', 'circle-radius', circleRadius)
          
                if (opacity <= 0.2) {
                  opacity = 1;
                  circleRadius = 2;
                }
          
              }, 1000 / framesPerSecond );
            }
          
            pulseMarker(0);
          
          
          
      
        })
        });


  

      
   return (
     <div>
    <div>
    <div ref={mapContainer} className="map-container" />
    </div>  

    {/* <div className="App">
        <img src={logo} className="App-logo" alt="logo" /> */}
     {/* <Routes >
         <Route path= "/" element={<Home/>}/>
         <Route path= "/about/*" element={<About />} />
         <Route path= "/waves/*" element={<WAVES />} />
         <Route path= "/signup/*" element={<SignupForm />} />
         <Route path= "/login/*" element={<Login />} />
     </Routes> */}
       
    {/* </div> */}
    </div>
   )
 
};