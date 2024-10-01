//rafce
import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { Marker, Popup } from 'react-leaflet'


import './style.css'

const CsvFileLocal = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        // code
        fetchData()
    }, [])

    const fetchData = async () => {
        const file = process.env.PUBLIC_URL + '/assets/Airport.csv'
        const res = await fetch(file)
        const text = await res.text();

        const json = Papa.parse(text, { header: true }).data

        const filterData = json.filter(item => item.long !== '' && item.lat !== '')


        setData(filterData)
    }
    // console.log(data)
    return data
        ? data.map((item, index) =>
            <Marker key={index} position={[item.lat, item.long]}>
                <Popup className='my-popup'>
                    <h2>{item["Name Thai"]}</h2>
                    <img src={item["Image URL"]} />
                </Popup>
            </Marker>)
        : null
}

export default CsvFileLocal