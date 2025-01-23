
import './App.css';
import { BrowserRouter } from "react-router-dom";
import ResponsiveView from "./lib/ResponsiveView"


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ResponsiveView />
            </BrowserRouter>
        </div>
    );
}

export default App;
