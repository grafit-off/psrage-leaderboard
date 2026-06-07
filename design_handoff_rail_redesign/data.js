// RAIL dashboard — data + bilingual strings.
window.RAIL_PLAYERS = [
  { rank: 1, nick: "psr-Veles",  rating: 1.34, kd: 1.46, adr: 91.3, win: 67, hs: 54, m: 312 },
  { rank: 2, nick: "MavkaOP",    rating: 1.29, kd: 1.39, adr: 87.6, win: 63, hs: 49, m: 188 },
  { rank: 3, nick: "kozak_b1t",  rating: 1.24, kd: 1.33, adr: 85.0, win: 61, hs: 58, m: 274 },
  { rank: 4, nick: "Domovyk",    rating: 1.18, kd: 1.27, adr: 82.1, win: 57, hs: 45, m: 143 },
  { rank: 5, nick: "shadowZSU",  rating: 1.13, kd: 1.21, adr: 79.8, win: 55, hs: 51, m: 201 },
  { rank: 6, nick: "Berehynia",  rating: 1.09, kd: 1.16, adr: 77.2, win: 53, hs: 43, m: 96  },
  { rank: 7, nick: "deadEYEua",  rating: 1.04, kd: 1.10, adr: 74.5, win: 51, hs: 47, m: 167 },
  { rank: 8, nick: "tytanchik",  rating: 0.98, kd: 1.03, adr: 71.0, win: 48, hs: 39, m: 122 },
  { rank: 9, nick: "psr-Mara",   rating: 0.95, kd: 0.99, adr: 68.7, win: 46, hs: 41, m: 88  },
  { rank: 10, nick: "vovk_AWP",  rating: 0.91, kd: 0.94, adr: 66.2, win: 44, hs: 52, m: 134 },
];

window.RAIL_STATS = [
  { icon: "🏆", nick: "psr-Veles", value: "71%", key: "clutch" },
  { icon: "💣", nick: "shadowZSU", value: "13,402", key: "utility" },
  { icon: "🎮", nick: "psr-Veles", value: "312", key: "matches" },
];

window.RAIL_MATCHES = [
  { home: "PSRAGE", away: "BYALES5",    hs: 9,  as: 7,  map: "Mirage",  round: 16, live: true },
  { home: "PSRAGE", away: "NO_LUCK",    hs: 16, as: 11, map: "Inferno", ago: 2 },
  { home: "KOTLETA", away: "PSRAGE",    hs: 13, as: 16, map: "Nuke",    ago: 5 },
  { home: "PSRAGE", away: "VOVK_SQUAD", hs: 13, as: 16, map: "Anubis",  ago: 26 },
  { home: "PSRAGE", away: "TYTANY",     hs: 16, as: 4,  map: "Ancient", ago: 30 },
];

// Parity-first bilingual UI strings (uk is the app default; EN shown first here).
window.RAIL_I18N = {
  en: {
    appTitle: "Leaderboard", appSub: "CS2 · FACEIT Hub · sorted by",
    hub: "HUB", live: "LIVE", liveMatch: "1 MATCH", sync: "Sync data", synced: "Synced",
    nav: { leaderboard: "Leaderboard", matches: "Matches", players: "Players", stats: "Stats" },
    ranking: "Ranking", operatives: "operatives", liveTag: "live",
    cols: { rank: "#", player: "Player", rating: "Rating", kd: "K/D", adr: "ADR", hs: "HS%", win: "Win%", m: "Matches" },
    stat: {
      clutch: { tag: "CLUTCH MASTER", sub: "1v1 · 12/17 won" },
      utility: { tag: "UTILITY KING", sub: "total util damage" },
      matches: { tag: "MOST MATCHES", sub: "matches played" },
    },
    final: "FINAL", rd: "RD", ago: "AGO", hrs: "h", days: "d",
  },
  uk: {
    appTitle: "Таблиця лідерів", appSub: "CS2 · FACEIT Hub · сортування за",
    hub: "ХАБ", live: "НАЖИВО", liveMatch: "1 МАТЧ", sync: "Оновити", synced: "Оновлено",
    nav: { leaderboard: "Лідери", matches: "Матчі", players: "Гравці", stats: "Статистика" },
    ranking: "Рейтинг", operatives: "гравців", liveTag: "наживо",
    cols: { rank: "#", player: "Гравець", rating: "Рейтинг", kd: "K/D", adr: "ADR", hs: "HS%", win: "Перемоги%", m: "Матчі" },
    stat: {
      clutch: { tag: "МАЙСТЕР КЛАТЧІВ", sub: "1v1 · 12/17 виграно" },
      utility: { tag: "КОРОЛЬ УТИЛІТИ", sub: "сумарна шкода утилітою" },
      matches: { tag: "НАЙБІЛЬШЕ МАТЧІВ", sub: "зіграно матчів" },
    },
    final: "ФІНАЛ", rd: "РАУНД", ago: "ТОМУ", hrs: "г", days: "д",
  },
};
