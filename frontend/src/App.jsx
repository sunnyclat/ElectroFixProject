import { useState } from "react";
import "./App.css";
import MyRoutes from "./routes/MyRoutes";
import FloatImag from "./components/floatImag";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="AppWrapper">
      <MyRoutes />
    </div>
  );
}

export default App;
