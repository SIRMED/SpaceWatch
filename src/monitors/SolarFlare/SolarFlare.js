const SolarFlare = ({ solarFlare, index }) => {
    return (<>
        <div className="solar-flare" key={index}>
            <center>
                <h1 style={{ background:  new String(solarFlare.classType).includes("X") && "red"}} >{solarFlare.flrID}</h1>
            </center>

            <p>
                Begin @ <b>{solarFlare.beginTime}</b>
            </p>
            <p>
                Peak @ <b>{solarFlare.peakTime}</b>
            </p>
            <p style={{ color:  new String(solarFlare.classType).includes("X") && "red"}} >
                Class <b style={{ color:  new String(solarFlare.classType).includes("X") && "red"}} >{solarFlare.classType}</b>
            </p>
            <p className="note" style={{ color: "#FFFF99" }}>
                {solarFlare.note}
            </p>
        </div>
    </>);
}

export default SolarFlare;