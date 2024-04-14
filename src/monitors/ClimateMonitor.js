const ClimateMonitor = () => {
    return (<>
        <div className="monitor climate">
            <div className="content">
                <h1 className="montserrat" style={{ fontSize: "4rem" }}>
                    17:29:34 <span className="montserrat" style={{ fontSize: "2rem", fontWeight: "lighter", marginLeft: "-15px" }} >.54</span>
                </h1>
    
                <div className="weather">
                    <p>
                        Winds: 
                    </p>

                    <p>
                        Temp:
                    </p>

                    <p>
                        Humidity:
                    </p>

                    <p>
                        Pressure:
                    </p>

                    <p>
                        Cloud Cover:
                    </p>

                    <p>
                        Precip:
                    </p>

                    <p>
                        Sunset:
                    </p>

                    <p>
                        Moon Illum:
                    </p>
                </div>
            </div>
        </div>
    </>);
}
 
export default ClimateMonitor;