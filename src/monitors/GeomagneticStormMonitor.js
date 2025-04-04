import { useContext, useEffect, useState } from "react";
import { StatusIndicatior } from "../routes/Home";
import { addStatusText, removeText } from "./../global/statusTextHandles";


const GeomagneticStormMonitor = () => {

    const [geomagneticStorms, setGeomagneticStorms] = useState([]);
    const { statusTexts, setStatusTexts } = useContext(StatusIndicatior)

    useEffect(() => {
        addStatusText({
            text: "Fetching Geo Mag Storms feed",
            id: "gms",
            statusTexts, setStatusTexts
        })
        fetch(`https://api.nasa.gov/DONKI/GST?startDate=2016-01-01&endDate=2016-01-30&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setGeomagneticStorms(data);
            })
    }, [])

    return (<>
        <div className="monitor geomag-storm">
            <div className="title">
                <h1 className="montserrat">{
                    geomagneticStorms[0] ?
                        `${geomagneticStorms.length} GeoMagStorms found`
                        :
                        "Finding GeoMagStorms..."
                }</h1>
            </div>

            <div className="content">
                {geomagneticStorms && geomagneticStorms.map((storm, index) => {
                    return (<div className="gst" key={index}>
                        <center>
                            <h1>{storm.gstID}</h1>
                        </center>

                        <p>
                            Begin @ <b>{storm.startTime}</b>
                        </p>
                        <p>
                            Source <b>{storm.allKpIndex[0].source}</b>
                        </p>
                        <p style={{ color: new Number(storm.allKpIndex[0].kpIndex) >= 5 && "red" }} >
                            kpIndex <b style={{ color: new Number(storm.allKpIndex[0].kpIndex) >= 5 && "red" }} >{storm.allKpIndex[0].kpIndex}</b>
                        </p>
                    </div>)
                })}
            </div>
        </div>
    </>);
}

export default GeomagneticStormMonitor;