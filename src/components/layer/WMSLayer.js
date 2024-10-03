// rafce
import React from 'react'
import { WMSTileLayer } from 'react-leaflet'

const WMSLayer = () => {
    return (
        <>
            {/* <WMSTileLayer
                url='http://localhost:8080/geoserver/map50K/wms'
                layers='map50K:Changwat'
                format='image/png'
                transparent={true}
            /> */}
            <WMSTileLayer
                url='http://localhost:8080/geoserver/Map50K_WMS/wms'
                layers='Map50K_WMS:49252'
                format='image/png'
                transparent={true}
            />
            <WMSTileLayer
                url='http://localhost:8080/geoserver/Map50K_WMS/wms'
                layers='Map50K_WMS:Sentinel2_Color_Composite'
                format='image/png'
                transparent={true}
            />
            <WMSTileLayer
                url='http://localhost:8080/geoserver/Map50K_WMS/wms'
                layers='Map50K_WMS:isan'
                format='image/png'
                transparent={true}
            />

        </>
    )
}

export default WMSLayer