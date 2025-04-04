import { useContext, useEffect, useState } from "react";
import Expand from "./../../assets/imgs/expand-black.png"
import NEO from "./NEOItem";
import { StatusIndicatior } from "../../routes/Home";
import { addStatusText, removeText } from "../../global/statusTextHandles";

const NearEarthObjectDetailsMonitor = () => {

    const [neoCount, setNeoCount] = useState(0);
    const [NEOObjects, setNEOObjects] = useState();
    const [displayCount, setDisplayCount] = useState(2);
    const [error, setError] = useState(null);
    const { statusTexts, setStatusTexts } = useContext(StatusIndicatior)

    function fecthNEOFeed() {
        const date = new Date()
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 1}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setNeoCount(data.element_count);
                setNEOObjects(data.near_earth_objects);
                setError(data.error);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        addStatusText({
            text: "Fetching NEO feed",
            id: "neo",
            statusTexts, setStatusTexts
        })
        fecthNEOFeed();
    }, [])

    return (<>
        <div className={`monitor neo-details ${neoCount < 0 && "error"}`}>
            <div className="title">
                <h1>
                    {neoCount > 0 && `${neoCount} NEOs found`}
                    {neoCount === 0 && " Finding NEOs..."}
                    {neoCount < 0 && "Error"}
                </h1>
            </div>

            <div className="content">

                {NEOObjects && !error && <>
                    {Object.values(NEOObjects).slice(0, displayCount).map((neoArray, index) => {
                        return neoArray.map((neo, index) => {
                            return (<NEO key={index} neo={neo} />);
                        });
                    })}
                    <div className="neo" style={{ textAlign: "center" }}>
                        <button onClick={() => setDisplayCount(displayCount + 2)}>Load More</button>
                    </div>
                </>}

                {!NEOObjects && error && <div className="null" style={{ textAlign: "center" }}>
                    <p>
                        {error.message}
                        <br /><br />
                        ERR_CODE: {error.code}
                    </p>
                </div>}


                {/* <div className="null">
                    <h1>
                        /
                    </h1>
                </div> */}
            </div>
        </div>
    </>);
}

export default NearEarthObjectDetailsMonitor;