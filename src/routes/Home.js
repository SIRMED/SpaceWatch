import { createContext, useEffect, useState } from "react";
import ClimateMonitor from "../monitors/ClimateMonitor";
import CoronalMassEjectionMonitor from "../monitors/CoronalMassEjectionMonitor";
import GeomagneticStormMonitor from "../monitors/GeomagneticStormMonitor";
import NearEarthObjectDetailsMonitor from "../monitors/NEODetailsMonitor/NearEarthObjectDetailsMonitor";
import NearEarthObjectRadarMonitor from "../monitors/NearEarthObjectRadarMonitor";
import SolarElectricParticleMonitor from "../monitors/SolarElectricParticleMonitor";
import SolarFlareMonitor from "../monitors/SolarFlare/SolarFlareMonitor";
import SpaceDebrisMonitor from "../monitors/SpaceDebrisMonitor";

export const StatusIndicatior = createContext();

const Home = () => {

    const [statusTexts, setStatusTexts] = useState("FF");

    // function addStatusText(text, id) {
    //     let previousStatusTexts = statusTexts;

    //     previousStatusTexts = previousStatusTexts + " | " + text
    //     setStatusTexts(previousStatusTexts)
    // }

    // function removeText(t) {
    //     // setStatusTexts(currentStatusTexts => currentStatusTexts.split(",").filter(item => item !== t).join(", "));
    // }


    useEffect(() => {
        setStatusTexts(currentStatusTexts => currentStatusTexts.split(",").map(item => item.trimStart()).filter((item, index, arr) => arr.indexOf(item) === index).join(", ")); console.log(statusTexts);
    }, [statusTexts])

    return (<StatusIndicatior.Provider value={{ statusTexts, setStatusTexts }}>
        <div className="home">

            <div className="main">
                <div className="top">
                    <NearEarthObjectRadarMonitor />
                    <NearEarthObjectDetailsMonitor />
                    <SpaceDebrisMonitor />
                    <ClimateMonitor />
                </div>

                <div className="bottom">
                    <SolarFlareMonitor />
                    <CoronalMassEjectionMonitor />
                    <GeomagneticStormMonitor />
                    <SolarElectricParticleMonitor />
                </div>
            </div>


            <footer>
                <span className="left">
                    SpaceWatch v0.0.0
                </span>
                <span className="right">
                    {/* {statusTexts} */}
                </span>
            </footer>

        </div>
    </StatusIndicatior.Provider>);
}

export default Home;

