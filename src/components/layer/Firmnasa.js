// rafce
import React, { useEffect } from 'react'
import Papa from 'papaparse'

const Firmnasa = ({ setFirm }) => {

    useEffect(() => {
        // code
        loadFirm()
    }, [])

    const loadFirm = async () => {
        const apiKey = 'อย่าลืมอัพเดท Key นะครับ'
        const uri = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${apiKey}/VIIRS_SNPP_NRT/THA/2`

        const response = await fetch(uri)
        const text = await response.text();
        const jsonData = await Papa.parse(text, { header: true }).data;

        setFirm(jsonData)

    }


    return null
}

export default Firmnasa