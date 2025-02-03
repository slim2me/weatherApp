import "./App.css";
import LocationProvider from "./context/LocationProvider";
import Dashboard from "./pages/Dashboard";

function App() {
 
  return (
    <LocationProvider>
      <Dashboard />
    </LocationProvider>
  );
}

export default App;
