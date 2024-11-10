# Cookie Clicker in React!

Welcome to the React remake of the classic Cookie Clicker game! Click cookies, upgrade your CPS (Cookies per Second), and see just how many cookies you can collect.

## Features

- **CPC (Cookies Per Click)**: Earn cookies every time you click the cookie image.
- **CPS (Cookies Per Second)**: Automatically generate cookies over time.
- **Save Feature**: Automatically saves the current game state every second, so you can pick up right where you left off.

## Gameplay

- Click the cookie image to increase your total cookies by the CPC value.
- Purchase upgrades by clicking the upgrade buttons to increase your CPC or CPS.

## Requirements Achieved

- **Implemented the useState Hook**: Used for managing the state of cookies, CPS, and other game properties.
- **Used useEffect**: Implemented to manage intervals and game updates.
- **Component-Based Design**: Divided the game into reusable components for better structure and readability.
- **Applied setInterval**: Used to periodically increment cookies based on CPS.
- **Used .map() Function**: Rendered upgrade buttons dynamically using the .map() function.
- **Logic for Upgrades**: Handled the purchase and application of upgrades using game logic.

## Stretch Goals Implemented

- **Sound and Visual Effects**: Added sound effects when clicking the cookie image for a more interactive experience.
- **Local Storage**: Game data (cookies and upgrades) is saved in local storage to retain progress between sessions.
- **Upgrades API**: Used the Upgrades API to fetch and manage upgrades dynamically.

## Work in Progress

- Unfortunately, I didn't have time to implement the reset button.
- I'm still working on ensuring the alert messages display properly on top of the game UI.

---

Enjoy the game, and see how many cookies you can collect!

