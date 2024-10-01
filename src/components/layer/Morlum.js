import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Marker, Popup } from "react-leaflet";
import MorlumIcon from '../images/microphone.png'
import L from 'leaflet'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let SingerIcon = L.icon({
  iconUrl: MorlumIcon,
  shadowUrl: iconShadow,
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5]
});

const Morlum = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const file = process.env.PUBLIC_URL + "/assets/morlum.csv";
    const res = await fetch(file);
    const text = await res.text();

    const json = Papa.parse(text, { header: true }).data;

    const filterData = json.filter(
      (item) =>
        item.long !== "" &&
        item.long !== "ไม่มีข้อมูล" &&
        item.long !== undefined &&
        item.lat !== "" &&
        item.lat !== "ไม่มีข้อมูล" &&
        item.lat !== undefined
    );

    setData(filterData);
  };
  return data
  ? data.map((item, index) =>
      <Marker icon={SingerIcon} key={index} position={[item.lat, item.long]}>
          <Popup className='my-popup'>
              <h2>ประเภท : {item["type"]}</h2>
              <h2>ชื่อ :{item["name"]}</h2>
              <h2>เบอร์ติดต่อ :{item["contact"]}</h2>
              <h2>รายละเอีขด :{item["detail"]}</h2>
              <h2>Link :{item["link"]}</h2>
              <h2>Video :{item["video"]}</h2>
              
          </Popup>
      </Marker>)
  : null
};

export default Morlum;
