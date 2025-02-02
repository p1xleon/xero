export type Player = {
  tag: string;
  name: string;
  townHallLevel: 17;
  townHallWeaponLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  builderHallLevel: number;
  builderBaseTrophies: number;
  bestBuilderBaseTrophies: number;
  role: string;
  warPreference: string;
  donations: number;
  donationsReceived: number;
  clanCapitalContributions: number;
  clan: Clan;
  league: League;
  builderBaseLeague: BuilderBaseLeague;
  achievements: Achievements;
  playerHouse: {};
  labels: Labels;
  troops: Troop[];
  heroes: Hero[];
  heroEquipment: HeroEqupment;
  spells: Spell[];
};

type Clan = {
  tag: string;
  name: string;
  clanLevel: number;
  badgeUrls: {
    small: string;
    large: string;
    medium: string;
  };
};

type League = {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    medium: string;
  };
};

type BuilderBaseLeague = {
  id: number;
  name: string;
};

type Achievements = [
  {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
    completionInfo: string;
    village: string;
  }
];

type Labels = [
  {
    id: number;
    name: string;
    iconUrls: {
      small: string;
      medium: string;
    };
  }
];

export type Troop = {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
};

export type Hero = {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
  equipment: {
    name: string;
    level: number;
    maxLevel: number;
    village: string;
  }[];
};

export type HeroEqupment = [
  {
    name: string;
    level: number;
    maxLevel: number;
    village: string;
  }
];

export type Spell = {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
};

export type SearchPlayerData = {
  clan: string;
  clan_name: string;
  league: string;
  name: string;
  tag: string;
  trophies: number;
  th: number;
}[];

export type ClashKingPlayer = {
  tag: string;
  name: string;
  townhall: 17;
  trophies: number;
  warStars: number;
  clanCapitalContributions: number;
  league: string;
  last_online: number;
};