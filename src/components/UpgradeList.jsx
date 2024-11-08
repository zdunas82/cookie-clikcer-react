import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function UpgradeList({ purchaseUpgrade }) {
  const [upgrades, setUpgrades] = useState([]); 

  useEffect(() => {
    async function fetchUpgrades() {
      try {
        const response = await fetch(
          "https://cookie-upgrade-api.vercel.app/api/upgrades"
        );
        const upgradesData = await response.json();
        setUpgrades(upgradesData);
      } catch (error) {
        console.error("Error fetching upgrades:", error);
      }
    }

    fetchUpgrades();
  }, []);

  return (
    <div>
      <h2>Upgrades</h2>
      {upgrades.map((upgrade) => (
        <button key={upgrade.name} onClick={() => purchaseUpgrade(upgrade)}>
          {upgrade.name} (Cost: {upgrade.cost}) +{upgrade.increase} CPS
        </button>
      ))}
    </div>
  );
}

// Adding prop types validation for better error checking

UpgradeList.propTypes = {
  purchaseUpgrade: PropTypes.func.isRequired,
};

export default UpgradeList;
