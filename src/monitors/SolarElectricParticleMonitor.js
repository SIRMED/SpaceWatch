import { useEffect, useState } from "react";

const SolarElectricParticleMonitor = () => {

    const [SEPData, setSEPData] = useState([])

    useEffect(() => {
        fetch(`https://api.nasa.gov/DONKI/SEP?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setSEPData(data)
        })
    }, [])

    return (<>
        <div className="monitor sep">
            <div className="title">
                <h1 className="montserrat">
                    {SEPData[0] ?
                        `${SEPData.length} SEP Events Detected`
                        :
                        `Finding SEPs...`
                    }
                </h1>
            </div>

            <div className="content">
                {SEPData && SEPData.map((SEP) => {
                    return(<div style={{ marginBottom: 20 }}>
                        <center>
                            <h1>{SEP.sepID}</h1>
                        </center>

                        <p>
                            Begin @ <b>{new Date(SEP.eventTime).toLocaleString()}</b>
                        </p>
                        <p>
                            Measured using <b>{SEP.instruments[0].displayName}</b>
                        </p>

                        {/* <p>
                            Begin @ <b>{SEP.startTime}</b>
                        </p>
                        <p>
                            Speed <b>{SEP.SEPAnalyses[0].speed} km/s</b>
                        </p>
                        <p style={{ color: new String(SEP.SEPAnalyses[0].type).includes("X") && "red" }} >
                            Class <b style={{ color: new String(SEP.SEPAnalyses[0].type).includes("X") && "red" }} >{SEP.SEPAnalyses[0].type}</b>
                        </p>
                        <p>
                            Located @ <b>LAT {SEP.SEPAnalyses[0].latitude}, LONG {SEP.SEPAnalyses[0].longitude}</b>
                        </p>
                        <p className="note" style={{ color: "#FFFF99" }}>
                            {SEP.note}
                        </p> */}
                    </div>)
                })}
            </div>
        </div>
    </>);
}
 
export default SolarElectricParticleMonitor;