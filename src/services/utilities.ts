import { RoleImages } from "../constants/IconMaps";

// Function to get a random image
export const getRandomImage = () => {
  return RoleImages[Math.floor(Math.random() * RoleImages.length)];
};

//calculate percentage for heroes, troops, equipment and spells
export const percentage = (lvl: number, max: number) => {
  return (lvl / max) * 100;
};

// const timestamp = 1737970643;

// // Convert to milliseconds (JS uses ms)
// const date = new Date(timestamp * 1000);

// // Format the date to a readable string
// console.log(date.toLocaleString()); // Example output: "2/26/2025, 10:30:19 AM"
export const formatLastOnline = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };

  return date.toLocaleDateString("en-GB", options);
};
