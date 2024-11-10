import { useState, useEffect } from "react";

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
    <div id="upgrades-container">
      <h2>Upgrades</h2>
      {upgrades.map((upgrade) => (
        <button
          key={upgrade.name}
          onClick={() => purchaseUpgrade(upgrade)}
          className="upgrade-button"
        >
          {upgrade.name} (Cost: {upgrade.cost}) +{upgrade.increase} CPS
        </button>
      ))}
    </div>
  );
}

export default UpgradeList;
