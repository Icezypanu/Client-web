// rafce
import React, { useState, useRef } from 'react'
import {
    MapContainer,
    Marker,
    Tooltip,
    useMap,
    LayersControl,
    LayerGroup
} from 'react-leaflet'
import L from 'leaflet'

// EP2
import BaseMap from './layer/BaseMap'
// EP3
import CSVFileLocal from './layer/CSVFileLocal'

// EP7
import 'leaflet-rotatedmarker'

// EP8


// EP9
import Province from './layer/Province'

// EP13



import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import AircraftCSV from './layer/AircraftCSV'
import Morlum from './layer/Morlum'



// EP18
import FormData from './layer/FormData'
import 'bootstrap/dist/css/bootstrap.min.css';

// EP19
import WMSLayer from './layer/WMSLayer'
// Widgets
import LeafletDrawControl from './widgets/LeafletDrawControl'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12.5, 20.5]
});

L.Marker.prototype.options.icon = DefaultIcon;





const MapContent = () => {
    // javascript
    const mapRef = useRef()
    const [aircraft, setAircraft] = useState(null)
    const [firm, setFirm] = useState(null)
    const [data, setData] = useState({
        title: '',
        latitude: '',
        longitude: '',
        icon: '',
        size: ''
    })

    function fitTo(objects) {
        const bounds = objects.reduce(
            function (acc, cur) {
                return acc.extend([cur.latitude, cur.longitude]);
            },
            L.latLngBounds()
        );
        mapRef.current.fitBounds(bounds);
    }

    const onChangeData = (e) => {
        // console.log(e.target.name, e.target.value)
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
    }

    const handleDrawCreated = (geojson) => {
        console.log(geojson)
    }
    // console.log('data', data)
    return (
        <div>
            {/* HTML */}
            
            <AircraftCSV setAircraft={setAircraft} fitTo={fitTo} />

            <div className='row'>
                <div className='col-10'>
                    <MapContainer
                        ref={mapRef}
                        style={{ width: '100%', height: '100vh' }}
                        center={[13, 100]}
                        zoom={6}
                    >
                        <LayersControl position='topright'>
                            {/* EP2 */}
                            <BaseMap />
                            <LayersControl.Overlay name="Map 1:50K" checked >
                                <LayerGroup>
                                    {/* EP19 */}
                                    <WMSLayer />
                                </LayerGroup>
                            </LayersControl.Overlay>

                            <LayersControl.Overlay name="Airport">
                                <LayerGroup>
                                    {/* EP3 */}
                                    <CSVFileLocal />
                                </LayerGroup>
                            </LayersControl.Overlay>

                            

                            <LayersControl.Overlay name="Province" >
                                <LayerGroup>
                                    {/* EP9 */}
                                    <Province />
                                </LayerGroup>
                            </LayersControl.Overlay>

                            
                            <LayersControl.Overlay name="หมอลำ">
                                <LayerGroup>
                                    <Morlum />

                                </LayerGroup>
                            </LayersControl.Overlay>

                            <LayersControl.Overlay name="Map click" checked >
                                <LayerGroup>
                                    {/* EP17 */}
                                    <FormData
                                        DefaultIcon={DefaultIcon}
                                        setData={setData}
                                        data={data} />
                                </LayerGroup>
                            </LayersControl.Overlay>

                        </LayersControl>

                        {/* Widgets */}
                        <LeafletDrawControl
                            onDrawCreated={handleDrawCreated}
                        />
                        
                    </MapContainer>
                </div>
                <div className='col-2'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Title</label>
                            <input
                                onChange={onChangeData}
                                className='form-control'
                                name='title'
                                type='text' />
                        </div>
                        <div className='form-group'>
                            <label>latitude</label>
                            <input
                                className='form-control'
                                value={data.latitude}
                                name='latitude'
                                type='text' />
                        </div>
                        <div className='form-group'>
                            <label>longitude</label>
                            <input
                                className='form-control'
                                value={data.longitude}
                                name='longitude'
                                type='text' />
                        </div>
                        <div className='form-group'>
                            <label>icon</label>
                            <input
                                onChange={onChangeData}
                                className='form-control'
                                name='icon'
                                type='text' />
                        </div>
                        <div className='form-group'>
                            <label>size</label>
                            <input
                                onChange={onChangeData}
                                className='form-control'
                                name='size'
                                type='range' />
                        </div>
                        <hr />
                        <div className='form-group'>
                            <button
                                className='btn btn-primary'
                                type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default MapContent