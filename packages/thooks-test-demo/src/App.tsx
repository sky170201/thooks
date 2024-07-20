import { useState } from "react";
import UseRequestDemo from "./components/UseRequest";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <UseRequestDemo></UseRequestDemo>
        </div>
    );
}

export default App;
