import { useState } from "react";
import Caret from "./../../assets/imgs/caret.png"
import RoundTo from "../../global/RoundTo";

const NEO = ({ neo, index }) => {

    const [expanded, setExpanded] = useState(false);


    return (<>
        <div className={`neo ${expanded ? "expanded" : ""}`} key={index}>
            <h2>
                <i>{neo.name.replace(/[\(\)]/g, '')} <span style={{ fontWeight: "lighter" }}>({neo.id})</span></i>
            </h2>
            {expanded && <p>
                Est. Diameter of <b> {RoundTo(neo.estimated_diameter.meters.estimated_diameter_max)}m </b>
            </p>}
            <p>
                Closest @ <b>{neo.close_approach_data[0].close_approach_date_full}</b>
            </p>
            {expanded && <p>
                Speed of <b>{RoundTo(neo.close_approach_data[0].relative_velocity.kilometers_per_second)} km/s</b>
            </p>}
            {expanded && <p>
                Miss Distance of <b>{RoundTo(neo.close_approach_data[0].miss_distance.kilometers)} km</b>
            </p>}
            {expanded && <p>
                Orbiting <b>{neo.close_approach_data[0].orbiting_body}</b>
            </p>}
            {neo.is_potentially_hazardous_asteroid && <p className="red" >
                <b>Potentially Hazardous Asteroid</b>
            </p>}
            {expanded && <p>
                {!neo.is_potentially_hazardous_asteroid && "Not a (potentially) Hazardous Asteroid"}
            </p>}

            <div className="caret" onClick={() => {
                setExpanded(!expanded);
            }}>
                <img src={Caret} alt="caret" />
            </div>
        </div>
    </>);
}

export default NEO;