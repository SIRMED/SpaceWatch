import { useEffect, useState } from "react";
import Home from "./Home";
import Logo from "./../assets/imgs/logo.png";

const RootPathManager = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2700);
    }, [])

    return (<>
        {isLoading && <>
            <div className="loading-screen">
                <img src={Logo} alt="logo" width={400} />
                <br /><br />
                <center>
                    <p style={{ color: "gray", fontWeight: "100" }} className="montserrat" >
                        Astronomical data provided by api.nasa.gov <br />
                        Weather data provided by www.weatherapi.com <br />
                        <i style={{ color: "gray" }}>SpaceWatch v0.0.0</i>
                    </p>
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