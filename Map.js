import { Wrld, WrldMap } from "wrld-react";
import {geojson,counter} from './PredictHQdata.js';
import {locate} from 'leaflet.locatecontrol/dist/L.Control.Locate.min.js';
import L from "leaflet";

console.log(EventBox)

export default function Map(){
    return(
        <WrldMap
        apiKey={"1101026d8080f2f20b1ee991b549ee9f"}
        containerStyle={{
          width: "100%",
          height: "100vh"
        }}
        mapOptions={{
          center: [40.712742, -74.013382],
          indoorsEnabled: true
        }}
        onInitialStreamingComplete={(map) => {
          L.geoJSON(geojson, {
            pointToLayer: function (geoJsonPoint, latlng) {
              return L.marker(latlng);

            }
          }).bindPopup(function (layer) {
            map.locate()
            map.on('locationfound', (e) => {
              console.log(e)
            })
            let popUpHtml= layer.feature.properties.title;
            popUpHtml += "<button> Check In</button>"
            const checkin= counter.filter(x=> x.id == layer.feature.properties.id)
            popUpHtml += "<span id= "+layer.feature.properties.id+"> "+ checkin.id +" </span>"
            return popUpHtml;
          }).addTo(map);
          L.control.locate().addTo(map); // loads the map 
          navigator.geolocation.getCurrentPosition(showPosition);
          function showPosition(position) {
            let location = "Latitude: " + position.coords.latitude +
              "<br>Longitude: " + position.coords.longitude;
            console.log(location);
            var marker = Wrld.marker([position.coords.latitude, position.coords.longitude], { title: "My marker" }).addTo(map);
          }
        } }
      >

        <div
          id={"wrld-indoor-control"}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            bottom: "40px"
          }}
        >
        </div>
        <div>

        </div>
      </WrldMap>
     )
     }
     
