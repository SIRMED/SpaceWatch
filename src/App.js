import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom"
import RootPathManager from "./routes/RootPathManager";

function App() {
  return (<Routes>

    <Route path="/" element={<RootPathManager />} />

  </Routes>);
}

export default App;