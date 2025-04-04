function addStatusText({ text, id, statusTexts,setStatusTexts }) {
    let previousStatusTexts = localStorage.getItem("status-texts") || "";
    console.log(`Adding text: "${text}" with id: "${id}" to previousString: ${previousStatusTexts}`)

    previousStatusTexts = previousStatusTexts + text
    localStorage.setItem("status-text", previousStatusTexts)
}

function removeText(t) {
    
}

export {
    addStatusText,
    removeText
}