import { useContext, useEffect, useState } from "react";
import SolarFlare from "./SolarFlare";
import { StatusIndicatior } from "../../routes/Home";
import { addStatusText, removeText } from "../../global/statusTextHandles";


const SolarFlareMonitor = () => {

    const [SolarFlares, setSolarFlares] = useState(null);
    const [numberOfClassMFlares, setNumberOfClassMFlares] = useState(0);
    const [numberOfClassXFlares, setNumberOfClassXFlares] = useState(0);
    const { statusTexts, setStatusTexts } = useContext(StatusIndicatior)

    function FecthSolarFlareFeed() {
        fetch(`https://api.nasa.gov/DONKI/FLR?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
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
        addStatusText({
            text: "Fetching Solar Flare feed",
            id: "sf",
            statusTexts, setStatusTexts
        })
        FecthSolarFlareFeed();
    }, [])

    return (<>
        <div className={`monitor solar-flare ${numberOfClassXFlares > 0 && "warning" || ""}`}>
            <div className={`title ${numberOfClassMFlares > 0 && "alert" || ""}  ${numberOfClassXFlares > 0 && "warning" || ""}`}>
                <h1 className="montserrat">
                    {!SolarFlares && "Finding Solar Flares..."}
                    {SolarFlares && !numberOfClassMFlares && !numberOfClassXFlares && `${SolarFlares.length} Solar Flares found`}
                    {numberOfClassMFlares > 0 && numberOfClassXFlares === 0 && `${numberOfClassMFlares} M-Class Solar Flare${numberOfClassMFlares > 1 && "s" || ""} found`}
                    {numberOfClassXFlares > 0 && `${numberOfClassXFlares} X-Class Solar Flare${numberOfClassXFlares > 1 && "s" || ""} found`}
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