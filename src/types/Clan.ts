export type Clan = {
  name: string;
  tag: string;
  type: string;
  description: string;
  location: Location;
  isFamilyFriendly: boolean;
  badgeUrls: BadgeUrls;
  clanLevel: number;
  clanPoints: number;
  clanBuilderBasePoints: number;
  clanCapitalPoints: number;
  capitalLeague: CapitalLeague;
  requiredTrophies: number;
  warFrequency: string;
  warWinStreak: number;
  warWins: number;
  isWarLogPublic: boolean;
  warLeague: warLeague;
  members: number;
  memberList: MemberList;
  labels: [{}];
  requiredBuilderBaseTrophies: number;
  requiredTownhallLevel: number;
  clanCapital: ClanCapital;
  chatLanguage: Language;
};

type BadgeUrls = {
  small: string;
  large: string;
  medium: string;
};

type warLeague = {
  id: number;
  name: string;
};

type CapitalLeague = {
  id: number;
  name: string;
};

type ClanCapital = {
  capitalHallLevel: number;
  districts: [];
};

type Language = {
  id: number;
  name: string;
  languageCode: string;
};

type Location = {
  id: number;
  name: string;
  isCountry: boolean;
};

type MemberList = [
  {
    tag: string;
    name: string;
    role: string;
    townHallLevel: number;
    expLevel: number;
    league: {
      id: number;
      name: string;
      iconUrls: {
        medium: string;
        small: string;
      };
    };
    trophies: number;
    builderBaseTrophies: number;
    clanRank: number;
    previousClanRank: number;
    donations: number;
    donationsReceived: number;
  }
];

export type SearchClanData = {
  clan: string;
  type: string;
  league: string;
  name: string;
  tag: string;
  trophies: number;
  th: number;
  badgeUrls?: {
    small: string;
    large: string;
    medium: string;
  };
  clanLevel: number;
  clanPoints: number;
  warFrequency: string;
  warLeague: {
    id: number;
    name: string;
  };
  members: number;
  chatLanguage: {
    name: string;
  }
}[];


export type ClashKingClan = {
  name: string;
  tag: string;
  type: string;
  level: number;
  clanPoints: number;
  clanCapitalPoints: number;
  capitalLeague: string;
  warWinStreak: number;
  warWins: number;
  openWarLog: boolean;
  warLeague: string;
  members: number;
  location: ClashKingLocation;
  memberList?: ClashKingMemberList;
  clanCapitalHallLevel: number;
};

type ClashKingMemberList = [
  {
    tag: string;
    name: string;
    role: string;
    townhall: number;
    expLevel: number;
    league: string;
    trophies: number;
    builderTrophies: number;
    donations: number;
    donationsReceived: number;
  }
];

type ClashKingLocation = {
  id: number;
  name: string;
};