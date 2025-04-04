import { useEffect, useState } from "react";

const ClimateMonitor = () => {

    const [time, setTime] = useState("00:00:00.00")

    useEffect(() => {
        updateTime()
    }, [])

    function updateTime() {
        const timeObj = new Date()
        setTime(`${formatTime(timeObj.getHours())}:${formatTime(timeObj.getMinutes())}:${formatTime(timeObj.getSeconds())}.${formatTime(timeObj.getMilliseconds())}`)
        setTimeout(() => {
            updateTime()
        }, 1);
    }

    function formatTime(s) {
        var string = new String(s)

        if (string.length === 1) {
            return `0${string}`
        } else {
            return string
        }
    }

    return (<>
        <div className="monitor climate">
            <div className="content">
                <h1 className="montserrat" style={{ fontSize: "4rem" }}>
                    {time.split(".")[0]} <span className="montserrat" style={{ fontSize: "2rem", fontWeight: "lighter", marginLeft: "-15px" }} >.{time.split(".")[1]} </span>
                </h1>

                <div className="weather">
                    <p>
                        Winds: <b>15 km/h</b>
                    </p>

                    <p>
                        Temp: <b>18 C</b>
                    </p>

                    <p>
                        Humidity: <b>85%</b>
                    </p>

                    <p>
                        Pressure: <b>1002 hPa</b>
                    </p>

                    <p>
                        Cloud Cover: <b>80%</b>
                    </p>

                    <p>
                        Precip: <b>2mm</b>
                    </p>

                    <p>
                        Sunset: <b>645 PM</b>
                    </p>

                    <p>
                        Moon Illum: <b>51%</b>
                    </p>
                </div>
            </div>
        </div>
    </>);
}

export default ClimateMonitor;