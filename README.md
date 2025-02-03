# Xero

**Clash of Clans Companion App**

A **React Native** application that provides real-time event tracking and game data for **Clash of Clans**. This app fetches data from the **official Clash of Clans API and ClashKing API** and displays event schedules, clan information, and more in a clean and user-friendly interface.

## Features

- 📅 **Event Tracking**: Displays upcoming and ongoing **Clash of Clans events** like Clan War League, Raid Weekend, Clan Games, Trader Reset, Season End, and League Reset.
- ⏳ **Countdown Timers**: Shows precise timers for event start and end times.
- 🏆 **Clan & Player Stats**: Fetches real-time data from the **ClashKing API and Clash of Clans API**.
- ⚔️ **War Management**: Track ongoing **wars and war leagues** and allow users to **opt in and out of wars** without opening the game.
- 📊 **Player Progress Tracking**: Monitor player progress, including troop levels, achievements, and upgrades.
- 📊 **Advanced Stats**: Display player progress and historical data.
- 🔍 **Search & Filtering**: Add search functionality for clans and players.
- 📱 **Optimized UI**: Built with **React Native & Expo** for a smooth experience on mobile devices.

## Tech Stack
- **React Native** (Expo)
- **TypeScript**
- **Firebase** (for authentication and data storage)
- **Clash of Clans API**
- **ClashKing API**

This material is unofficial and is not endorsed by Supercell. For more information see Supercell's Fan Content Policy: https://supercell.com/en/fan-content-policy/

**Installation & Setup**

**Prerequisites**
Install Node.js & Expo CLI
Create a firebase project and setup a web app

**Clone the repository:**
`git clone https://github.com/your-username/clash-of-clans-app.git
cd clash-of-clans-app`
**Install dependencies:**
`npm install`

**Setup firebase with Firebase JS SDK**

API Configuration
This app requires access to the ClashKing API for retrieving game data.

**Running the App**
**For development mode:**
`npm expo start`

**To build a production APK:**
`eas build -p android --profile production`

**Deployment**
The app can be built using EAS Build for Android & iOS.
Generate an APK for local installation:
`eas build -p android --profile production`
