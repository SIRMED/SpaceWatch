const SolarFlare = ({ solarFlare, index }) => {
    return (<>
        <div className="solar-flare" key={index}>
            <center>
                <h1>{solarFlare.flrID}</h1>
            </center>

            <p>
                Begin @ <b>{solarFlare.beginTime}</b>
            </p>
            <p>
                Peak @ <b>{solarFlare.peakTime}</b>
            </p>
            <p>
                Class <b>{solarFlare.classType}</b>
            </p>
            <p className="note">
                {solarFlare.note}
            </p>
        </div>
    </>);
}

export default SolarFlare;