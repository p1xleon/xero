# Clash of Clans Companion App

A **React Native** application that provides real-time event tracking and game data for **Clash of Clans**. This app fetches data from the **official Clash of Clans API** and displays event schedules, clan information, and more in a clean and user-friendly interface.

## Features

- 📅 **Event Tracking**: Displays upcoming and ongoing **Clash of Clans events** like Clan War League, Raid Weekend, Clan Games, Trader Reset, Season End, and League Reset.
- ⏳ **Countdown Timers**: Shows precise timers for event start and end times in **IST (Indian Standard Time)**.
- 🏆 **Clan & Player Stats**: Fetches real-time data from the **Clash of Clans API**.
- ⚔️ **War Management**: Track ongoing **wars and war leagues** and allow users to **opt in and out of wars** without opening the game.
- 📊 **Player Progress Tracking**: Monitor player progress, including troop levels, achievements, and upgrades.
- 📱 **Optimized UI**: Built with **React Native & Expo** for a smooth experience on mobile devices.

## Screenshots
(Add screenshots here)

## Installation & Setup

### Prerequisites
- Install [Node.js](https://nodejs.org/) & [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Clone the repository:
  ```sh
  git clone https://github.com/your-username/clash-of-clans-app.git
  cd clash-of-clans-app
  ```
- Install dependencies:
  ```sh
  npm install
  ```

### API Configuration
- This app requires access to the **Clash of Clans API**, which needs a **whitelisted IP address**.
- You'll need a **backend server** to handle API requests securely.
- Set up environment variables for API keys:
  ```sh
  echo "API_KEY=your_clash_api_key" > .env
  ```

### Running the App
For development mode:
```sh
expo start
```
To build a production APK:
```sh
eas build -p android --profile production
```

## Deployment
- The app can be built using **EAS Build** for Android & iOS.
- Generate an APK for local installation:
  ```sh
  eas build -p android --profile production
  ```

## Tech Stack
- **React Native** (Expo)
- **TypeScript**
- **Firebase** (for authentication and data storage)
- **Clash of Clans API**
- **ClashKing API** (for additional game insights and statistics)

## Future Enhancements
- 🔍 **Search & Filtering**: Add search functionality for clans and players.
- 📊 **Advanced Stats**: Display player progress and historical data.
- 🛠 **Push Notifications**: Alerts for upcoming events.

## Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request.

## License
MIT License

## Contact
For questions or suggestions, reach out via [GitHub Issues](https://github.com/your-username/clash-of-clans-app/issues).

