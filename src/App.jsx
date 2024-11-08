import { useState, useEffect } from "react";
import CookieButton from "./components/CookieButton";
import Stats from "./components/Stats";
import UpgradeList from "./components/UpgradeList";
import Alert from "./components/Alert";
// import "./App.css";

export default function App() {
  const [cookies, setCookies] = useState(parseInt(localStorage.getItem("cookies")) || 0);
  const [cps, setCps] = useState(parseInt(localStorage.getItem("cps")) || 0);
  const [alert, setAlert] = useState({ message: "", isSuccess: true, isVisible: false });

  // Effect to handle cookies increment by CPS
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

  // Function to handle cookie click
  const incrementCookies = () => {
    setCookies((prevCookies) => {
      const updatedCookies = prevCookies + 1;
      localStorage.setItem("cookies", updatedCookies);
      return updatedCookies;
    });
  };

  // Function to handle purchase upgrade
  const purchaseUpgrade = (upgrade) => {
    if (cookies >= upgrade.cost) {
      setCookies((prevCookies) => {
        const updatedCookies = prevCookies - upgrade.cost;
        localStorage.setItem("cookies", updatedCookies);
        return updatedCookies;
      });
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

  // Function to show alerts
  const showAlert = (message, isSuccess) => {
    setAlert({ message, isSuccess, isVisible: true });
  };

  // Function to close alert
  const closeAlert = () => {
    setAlert((prevAlert) => ({ ...prevAlert, isVisible: false }));
  };

  return (
    <div>
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
