// rafce
import React, { useState } from 'react'
import Papa from 'papaparse'


import * as turf from '@turf/turf'


const AircraftCSV = ({ setAircraft, fitTo }) => {
    const [data, setData] = useState(null)



    const groupKey = (data) => {
        const groupedData = Object.values(data).reduce((acc, cur) => {
            const groupKey = cur.callsign; // Group by ...
            // const groupKey = cur.track_number; // Group by ...
            acc[groupKey] = acc[groupKey] || [];
            acc[groupKey].push(cur);
            return acc;
        }, {});
        return groupedData
    }



    const handleSelectFile = (event) => {
        const file = event.target.files[0]

        if (!file) {
            console.log('No file')
            return
        }


        Papa.parse(file, {
            header: true,
            complete: (results) => {
                const filterData = results.data
                    .filter(item => (item.latitude !== null
                        && item.latitude !== undefined
                        && item.latitude !== '')
                        &&
                        (item.longitude !== null
                            && item.longitude !== undefined
                            && item.longitude !== '')
                    )

                const groupData = groupKey(filterData)
                setData(groupData)
            }
        })



    }


    function addBearing(data) {
        for (let i = 0; i < data.length - 1; i++) {
            const from = [parseFloat(data[i].longitude), parseFloat(data[i].latitude)];
            const to = [parseFloat(data[i + 1].longitude), parseFloat(data[i + 1].latitude)];
            data[i].bearing = turf.bearing(from, to);
        }
        return data;
    }

    const handleSelect = async (event) => {
        const roitai = event.target.value

        const newData = addBearing(data[roitai])

        setAircraft(newData)
        fitTo(newData)

    }

    return (
        <>

            <input type={'file'} onChange={handleSelectFile} />

            <select onChange={handleSelect}>
                {data && Object.keys(data).map((item, index) =>
                    <option key={index} value={item}>{item} </option>
                )}

            </select>

        </>
    )
}

export default AircraftCSV