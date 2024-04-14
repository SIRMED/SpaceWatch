import ClimateMonitor from "../monitors/ClimateMonitor";
import CoronalMassEjectionMonitor from "../monitors/CoronalMassEjectionMonitor";
import GeomagneticStormMonitor from "../monitors/GeomagneticStormMonitor";
import NearEarthObjectDetailsMonitor from "../monitors/NEODetailsMonitor/NearEarthObjectDetailsMonitor";
import NearEarthObjectRadarMonitor from "../monitors/NearEarthObjectRadarMonitor";
import SolarElectricParticleMonitor from "../monitors/SolarElectricParticleMonitor";
import SolarFlareMonitor from "../monitors/SolarFlare/SolarFlareMonitor";
import SpaceDebrisMonitor from "../monitors/SpaceDebrisMonitor";

const Home = () => {
    return (<div className="home">

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
            All Systems Normal
        </span>
    </footer>

    </div>);
}
 
export default Home;