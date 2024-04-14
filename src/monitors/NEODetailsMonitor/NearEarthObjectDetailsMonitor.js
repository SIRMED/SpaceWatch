import { useEffect, useState } from "react";
import Expand from "./../../assets/imgs/expand-black.png"
import NEO from "./NEOItem";

const NearEarthObjectDetailsMonitor = () => {

    const [neoCount, setNeoCount] = useState(0);
    const [NEOObjects, setNEOObjects] = useState();
    const [displayCount, setDisplayCount] = useState(2);
    const [error, setError] = useState(null);

    function fecthNEOFeed() {
        var yesterdayDateInYYYYMMDD = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-04-14&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setNeoCount(data.element_count);
                setNEOObjects(data.near_earth_objects);
                setError(data.error);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fecthNEOFeed();
    }, [])

    return (<>
        <div className={`monitor neo-details ${neoCount < 0 && "error"}`}>
            <div className="title">
                <h1>
                    {neoCount > 0&& `${neoCount} NEOs found`}
                    {neoCount === 0 && " Finding NEOs..."}
                    {neoCount < 0 && "Error"}
                </h1>
                <img src={Expand} alt="Expand Icon" />
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