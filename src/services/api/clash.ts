import axios from "axios";

const CLASH_URL = "https://api.clashofclans.com/v1";
const CLASH_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImE1YWQ4YWJkLTA5ZDQtNGM4MC1hZjAwLTNiODFiMzU3MzZjMCIsImlhdCI6MTczODkxMjI5NSwic3ViIjoiZGV2ZWxvcGVyLzQyMzRjMjBlLWE0ODItNzRjMy1hMTE2LTY5Yzc0ZjdlODZlYSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjU5LjE4NC4yMzQuMTkzIl0sInR5cGUiOiJjbGllbnQifV19.Dj_hwsPVJykTBaO_hMnyPQM9YTJEbArfgFflD3KaY2ziqGMeI_H33B0pM6RT5X36xJ1Cr9D1Jbd-pjEolNKy_A";

const CLASHKING_URL = "https://api.clashk.ing";

//fetch clan details from official clash of clans api
export const fetchClanDetails = async (clanTag: string) => {
  try {
    const response = await axios.get(`${CLASH_URL}/clans/${encodeURIComponent(clanTag)}`, {
      headers: {
        Authorization: `Bearer ${CLASH_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Error fetching clan data", error);
    // throw error;
  }
};

//fetch clan details from clash king api
export const fetchClan = async (clanTag: string) => {
  try {
    const encodedTag = encodeURIComponent(clanTag); // Ensure proper encoding
    const response = await axios.get(`${CLASHKING_URL}/clan/${encodedTag}/basic`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error("Error fetching clan details:", error.response?.data || error.message);
      // throw new Error(error.response?.data?.message || "Failed to fetch clan data.");
    }
    throw error;
  }
};


//fetch player details from official clash of clans api
export const fetchPlayerDetails = async (playerTag: string) => {
  try {
    const response = await axios.get(`${CLASH_URL}/players/${encodeURIComponent(playerTag)}`, {
      headers: {
        Authorization: `Bearer ${CLASH_TOKEN}`,
      },
    });
    return response.data;
  } catch (error: any) {
    // console.error(`Error fetching player data (${error.response.status}):`, error.response.data);
    if (error.response.status === 404) {
      return null; // if player tag not found, return null instead of crashing
    } else {
      // console.error("Network error or invalid request:", error.message);
    }
    return null;
  }
};


//fetch player details from clash king api
export const fetchPlayer = async (playerTag: string) => {
  try {
    const encodedTag = encodeURIComponent(playerTag); // Ensure proper encoding
    const response = await axios.get(`${CLASHKING_URL}/player/${encodedTag}/stats`);
    return response.data;
  } catch (error: any) {
    // console.error(`Error fetching player data (${error.response.status}):`, error.response.data);
    if (error.response.status === 404) {
      return null; // if player tag not found, return null instead of crashing
    } else {
      // console.error("Network error or invalid request:", error.message);
    }
    return null;
  }
};

//search for clans by clan name using official clash of clans api
export const searchClan = async (clanName: string) => {
  try {
    const response = await axios.get(`${CLASH_URL}/clans`, {
      headers: {
        Authorization: `Bearer ${CLASH_TOKEN}`,
      },
      params: {
        name: clanName, // Clan name search (may return multiple results)
      },
    });

    if (response.data && response.data.items) {
      return response.data.items; // Return array of results
    }

    return []; // return empty array if no results found
  } catch (error: any) {
    console.error("Error searching for clans:", error.response?.data || error.message);
    return []; // Return empty array in case of failure
  }
};


//search clan by tag using clash king api
export const searchClanByTag = async (clanTag: string) => {
  try {
    const encodedTag = encodeURIComponent(clanTag); // Ensure proper encoding
    const response = await axios.get(`${CLASHKING_URL}/clan/${encodedTag}/basic`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error("Error searching for clans:", error.response?.data || error.message);
      // throw new Error(error.response?.data?.message || "Failed to fetch clan data.");
    }
    throw error;
  }
};

//search for player by player name using clash king api
export const searchPlayer = async (player: string) => {
  try {
    const response = await axios.get(`${CLASHKING_URL}/player/search/${player}`);
    return response.data;
  } catch (error) {
    // console.error("Error searching for player", error);
    // throw error;
  }
};

//fetch current clan war info from official clash of clans api
export const getWar = async (clanTag: string) => {
  try {
    const response = await axios.get(`${CLASH_URL}/clans/${encodeURIComponent(clanTag)}/currentwar`, {
      headers: {
        Authorization: `Bearer ${CLASH_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Error fetching clan data", error);
    // throw error;
  }
};
