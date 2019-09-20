
//initializes map bases on leaflet and openstreetmap
const mymap = L.map('checkinMap').setView([0, 0], 1);    //lat lon zoom
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(mymap);
//Rememeber mymap needs to have width and height before visable on screen






getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data);
  for (item of data) {
    const marker = L.marker([item.lat,item.lon]).addTo(mymap);
    let txt = `The weather here at ${item.lat}&deg;,
    ${item.lon}&deg; is ${item.weather.summary} with
    a temperature of ${item.weather.temperature}&deg; C.`;
    
    if (item.air.value < 0) {
      txt += '  No air quality reading.';
    } else {
      txt += `  The concentration of particulate matter
    (${item.air.parameter}) is ${item.air.value}
    ${item.air.unit} last read on ${item.air.lastUpdated}`;
    }







    marker.bindPopup(txt);



  }

  console.log(data);
}
