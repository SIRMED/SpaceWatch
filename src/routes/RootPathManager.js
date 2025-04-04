import { useEffect, useState } from "react";
import Home from "./Home";
import Logo from "./../assets/imgs/logo.png";

const RootPathManager = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2100);
    }, [])

    return (<>
        {isLoading && <>
            <div className="loading-screen">
                <img src={Logo} alt="logo" width={400} />
                <br /><br />
                <center>
                    <p style={{ color: "white", fontWeight: "100" }} className="montserrat" >
                        Astronomical data provided by api.nasa.gov <br />
                        Weather data provided by www.weatherapi.com <br />
                        <i style={{ color: "white" }}>SpaceWatch v0.0.0</i>
                    </p>
                    <h1>
                        SpaceWatch
                    </h1>
                </center>
            </div>
            <span className="l-text">
                Loading you into SpaceWatch...
            </span>
        </>}
        {!isLoading && <Home />}
    </>);
}

export default RootPathManager;