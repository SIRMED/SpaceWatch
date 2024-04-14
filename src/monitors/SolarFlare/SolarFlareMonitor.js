import { useEffect, useState } from "react";
import SolarFlare from "./SolarFlare";

const SolarFlareMonitor = () => {

    const [SolarFlares, setSolarFlares] = useState(null);
    const [numberOfClassMFlares, setNumberOfClassMFlares] = useState(0);
    const [numberOfClassXFlares, setNumberOfClassXFlares] = useState(0);


    function FecthSolarFlareFeed() {
        fetch(`https://api.nasa.gov/DONKI/FLR?startDate=2016-01-01&endDate=2016-01-30&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                let tempClassMFlares = [];
                let tempClassXFlares = [];
                setSolarFlares(data);
                
                data.forEach(solarFlare => {
                    var classInString = new String(solarFlare.classType);
                    if (classInString.includes("M")) {
                        tempClassMFlares.push(solarFlare);
                    } else if (classInString.includes("X")) {
                        tempClassXFlares.push(solarFlare);
                    }
                });

                setNumberOfClassMFlares(tempClassMFlares.length);
                setNumberOfClassXFlares(tempClassXFlares.length);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        FecthSolarFlareFeed();
    }, [])

    return (<>
        <div className={`monitor solar-flare ${numberOfClassXFlares > 0 && "warning" || ""}`}>
            <div className={`title ${numberOfClassMFlares > 0 && "alert" || ""}  ${numberOfClassXFlares > 0 && "warning" || ""}`}>
                <h1 className="montserrat">
                    {!SolarFlares && "Finding Solar Flares..."}
                    {SolarFlares && !numberOfClassMFlares && !numberOfClassXFlares && `${SolarFlares.length} Solar Flares found`}
                    {numberOfClassMFlares > 0 && `${numberOfClassMFlares} Class-M Solar Flare${numberOfClassMFlares > 1 && "s" || ""} found`}
                    {numberOfClassXFlares > 0 && `${numberOfClassXFlares} Class-X Solar Flare${numberOfClassXFlares > 1 && "s" || ""} found`}
                </h1>
            </div>

            <div className="content">
                
                {SolarFlares && SolarFlares.map((solarFlare, index) => {
                    return <SolarFlare key={index} solarFlare={solarFlare} index={index} />;
                })}

            </div>
        </div>
    </>);
}
 
export default SolarFlareMonitor;