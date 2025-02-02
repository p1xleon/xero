interface War {
    state: string;
    teamSize: number;
    attacksPerMember: number;
    battleModifier: string;
    preparationStartTime: string;
    startTime: string;
    endTime: string;
    clan: Clan;
    opponent: Clan;
    totalAttacks: number;
    totalStars: number;
    totalDestructionPercentage: number;
  }

interface Attack {
    attackerTag: string;
    defenderTag: string;
    stars: number;
    destructionPercentage: number;
    order: number;
    duration: number;
  }
  
  interface Member {
    tag: string;
    name: string;
    townhallLevel: number;
    mapPosition: number;
    attacks: Attack[];
    opponentAttacks: number;
    bestOpponentAttack: Attack;
  }
  
  interface Clan {
    tag: string;
    name: string;
    badgeUrls: {
      small: string;
      medium: string;
      large: string;
    };
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
    members: Member[];
  }
  
  interface Response {
    state: string;
    teamSize: number;
    attacksPerMember: number;
    battleModifier: string;
    preparationStartTime: string;
    startTime: string;
    endTime: string;
    clan: Clan;
    opponent: Clan;
  }
  