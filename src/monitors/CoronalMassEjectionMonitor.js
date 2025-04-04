import { useEffect, useState } from "react";
import { useContext } from "react";
import { StatusIndicatior } from "../routes/Home";
import { addStatusText, removeText } from "./../global/statusTextHandles";


const CoronalMassEjectionMonitor = () => {

    const [CMEs, setCMEs] = useState(null);
    const [numberOfClassMCMEs, setNumberOfClassMCMEs] = useState(null);
    const [numberOfClassXCMEs, setNumberOfClassXCMEs] = useState(null);
    const { statusTexts, setStatusTexts } = useContext(StatusIndicatior)

    useEffect(() => {
        addStatusText({
            text: "Fetching CME feed",
            id: "cme",
            statusTexts, setStatusTexts
        })

        fetch(`https://api.nasa.gov/DONKI/CME?startDate=2024-04-13&endDate=2024-04-30&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log(data?.error)
                setCMEs(data);
                let tempClassMCMEs = [];
                let tempClassXCMEs = [];

                data.forEach(CME => {
                    var classInString = new String(CME.cmeAnalyses[0].type);
                    if (classInString.includes("M")) {
                        tempClassMCMEs.push(CME);
                    } else if (classInString.includes("X")) {
                        tempClassXCMEs.push(CME);
                    }
                });

                setNumberOfClassMCMEs(tempClassMCMEs.length);
                setNumberOfClassXCMEs(tempClassXCMEs.length);
            })
    }, [])

    return (<>
        <div className="monitor cme">
            <div className="title">
                <h1 className="montserrat">
                    {!CMEs && "Finding CMEs..."}
                    {CMEs && CMEs.length === 0 && "No CMEs found"}
                    {CMEs && !numberOfClassMCMEs && !numberOfClassXCMEs && `${CMEs.length} CMEs found`}
                    {numberOfClassMCMEs > 0 && numberOfClassXCMEs === 0 && `${numberOfClassMCMEs} M-Class CME${numberOfClassMCMEs > 1 && "s" || ""} found`}
                    {numberOfClassXCMEs > 0 && `${numberOfClassXCMEs} X-Class CME${numberOfClassXCMEs > 1 && "s" || ""} found`}
                </h1>
            </div>

            <div className="content">

                {CMEs && CMEs.map((CME, index) => {
                    return (<div className="CME" key={index} style={{ marginBottom: 15 }}>
                        <center>
                            <h1>{CME.activityID}</h1>
                        </center>

                        <p>
                            Begin @ <b>{CME.startTime}</b>
                        </p>
                        <p>
                            Speed <b>{CME.cmeAnalyses[0].speed} km/s</b>
                        </p>
                        <p style={{ color: new String(CME.cmeAnalyses[0].type).includes("X") && "red" }} >
                            Class <b style={{ color: new String(CME.cmeAnalyses[0].type).includes("X") && "red" }} >{CME.cmeAnalyses[0].type}</b>
                        </p>
                        <p>
                            Located @ <b>LAT {CME.cmeAnalyses[0].latitude}, LONG {CME.cmeAnalyses[0].longitude}</b>
                        </p>
                        <p className="note" style={{ color: "#FFFF99" }}>
                            {CME.note}
                        </p>
                    </div>)
                })}

            </div>
        </div>
    </>);
}

export default CoronalMassEjectionMonitor;