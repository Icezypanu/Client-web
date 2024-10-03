// rafce
import React from 'react'
import { Polyline } from 'react-leaflet'


const Routeaircraft = ({ aircraft }) => {

    const position = aircraft && aircraft
        .map(item => [item.latitude, item.longitude])


    return aircraft && <Polyline positions={position}
        pathOptions={{
            color: 'red',
            weight: '3'
        }} />
}

export default Routeaircraft