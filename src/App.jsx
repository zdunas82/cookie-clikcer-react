import { useState, useEffect } from "react";
import CookieButton from "./components/CookieButton";
import Stats from "./components/Stats";
import UpgradeList from "./components/UpgradeList";
import Alert from "./components/Alert";
import "./App.css";

export default function App() {

  // manage number of cookies initialized from localStorage
  const [cookies, setCookies] = useState(
    parseInt(localStorage.getItem("cookies")) || 0
  );

  //manage cookies per second (CPS); initialized from localStorage
  const [cps, setCps] = useState(parseInt(localStorage.getItem("cps")) || 0);

  // State to manage alert messages; includes message, success status, and visibility
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: true,
    isVisible: false,
  });
 
  // Sound to play when cookie is clicked
  const clickSound = new Audio("/sounds/crunch.mp3");

  // Effect to handle cookies increment by CPS
  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((prevCookies) => {
        const updatedCookies = prevCookies + cps;
        localStorage.setItem("cookies", updatedCookies);
        return updatedCookies;
      });
    }, 1000);

  // Cleanup interval when component unmounts or CPS changes
    return () => clearInterval(interval);
  }, [cps]);

  // Function to handle cookie click event
  const incrementCookies = () => {
    setCookies((prevCookies) => {
      const updatedCookies = prevCookies + 1;
      localStorage.setItem("cookies", updatedCookies);
      return updatedCookies;
    });
    clickSound.play(); //play sound when clicking a cookie
  };

  // Function to handle buying upgrades
  const purchaseUpgrade = (upgrade) => {
    if (cookies >= upgrade.cost) {
      setCookies((prevCookies) => prevCookies - upgrade.cost);
      setCps((prevCps) => {
        const updatedCps = prevCps + upgrade.increase;
        localStorage.setItem("cps", updatedCps);
        return updatedCps;
      });
      showAlert(`You bought the ${upgrade.name} upgrade!`, true);
    } else {
      showAlert("You don't have enough cookies!", false);
    }
  };

  // Function to show alert messages
  const showAlert = (message, isSuccess) => {
    setAlert({ message, isSuccess, isVisible: true });
  };

  // Function to close the alert message
  const closeAlert = () => {
    setAlert((prevAlert) => ({ ...prevAlert, isVisible: false }));
  };

  return (
    <div className="game-container">
      <h1>Cookie Clicker</h1>
      <CookieButton onClick={incrementCookies} />
      <Stats cookies={cookies} cps={cps} />
      <UpgradeList purchaseUpgrade={purchaseUpgrade} />
      {alert.isVisible && (
        <Alert
          message={alert.message}
          isSuccess={alert.isSuccess}
          onClose={closeAlert}
        />
      )}
    </div>
  );
}
