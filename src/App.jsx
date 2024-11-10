import { useState, useEffect } from "react";
import CookieButton from "./components/CookieButton";
import Stats from "./components/Stats";
import UpgradeList from "./components/UpgradeList";
import Alert from "./components/Alert";
import "./App.css";

export default function App() {
  const [cookies, setCookies] = useState(
    parseInt(localStorage.getItem("cookies")) || 0
  );
  const [cps, setCps] = useState(parseInt(localStorage.getItem("cps")) || 0);
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: true,
    isVisible: false,
  });

  const clickSound = new Audio("/sounds/crunch.mp3");

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((prevCookies) => {
        const updatedCookies = prevCookies + cps;
        localStorage.setItem("cookies", updatedCookies);
        return updatedCookies;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cps]);

  const incrementCookies = () => {
    setCookies((prevCookies) => {
      const updatedCookies = prevCookies + 1;
      localStorage.setItem("cookies", updatedCookies);
      return updatedCookies;
    });
    clickSound.play();
  };

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

  const showAlert = (message, isSuccess) => {
    setAlert({ message, isSuccess, isVisible: true });
  };

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
