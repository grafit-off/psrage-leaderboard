import { PlayerStatsResponse, PlayerStats } from '../models/PlayerStats';
import { getPlayerCCR } from './getPlayerCCR';
import { formatNumber } from './numberFormatting';

// Format raw stats response to typed stats
export const formatPlayerStats = (rawStats: PlayerStatsResponse): PlayerStats => {
  const kills = formatNumber(rawStats["Kills"]);
  const rounds = formatNumber(rawStats["Rounds"]);
  const deaths = formatNumber(rawStats["Deaths"]);
  const adr = formatNumber(rawStats["ADR"]);
  const entrySuccess = formatNumber(rawStats["Entry Success Rate"]);
  const avgTriple = formatNumber(rawStats["Average Triple Kills"]);
  const avgQuad = formatNumber(rawStats["Average Quadro Kills"]);
  const avgPenta = formatNumber(rawStats["Average Penta Kills"]);
  const totalMatches =  formatNumber(rawStats["Matches"]);

  return {
    "Entry Rate": formatNumber(rawStats["Entry Rate"]),
    "Headshots": formatNumber(rawStats["Headshots"]),
    "Utility Damage Success Rate": formatNumber(rawStats["Utility Damage Success Rate"]),
    "Penta Kills": formatNumber(rawStats["Penta Kills"]),
    "Total Flash Count": formatNumber(rawStats["Total Flash Count"]),
    "MVPs": formatNumber(rawStats["MVPs"]),
    "Flashes per Round": formatNumber(rawStats["Flashes per Round"]),
    "Total Utility Successes": formatNumber(rawStats["Total Utility Successes"]),
    "1v2 Win Rate": formatNumber(rawStats["1v2 Win Rate"]),
    "Utility Damage per Round": formatNumber(rawStats["Utility Damage per Round"]),
    "Total Damage": formatNumber(rawStats["Total Damage"]),
    "Total Entry Wins": formatNumber(rawStats["Total Entry Wins"]),
    "Average Deaths": formatNumber(rawStats["Average Deaths"]),
    "Total 1v1 Count": formatNumber(rawStats["Total 1v1 Count"]),
    "Total Enemies Flashed": formatNumber(rawStats["Total Enemies Flashed"]),
    "1v1 Win Rate": formatNumber(rawStats["1v1 Win Rate"]),
    "Average Quadro Kills": avgQuad,
    "Wins": rawStats["Wins"],
    "Entry Success Rate": entrySuccess,
    "Total Headshots %": formatNumber(rawStats["Total Headshots %"]),
    "Enemies Flashed per Round": formatNumber(rawStats["Enemies Flashed per Round"]),
    "Total Sniper Kills": formatNumber(rawStats["Total Sniper Kills"]),
    "Sniper Kill Rate": formatNumber(rawStats["Sniper Kill Rate"]),
    "Total Flash Successes": formatNumber(rawStats["Total Flash Successes"]),
    "Assists": formatNumber(rawStats["Assists"]),
    "Average MVPs": formatNumber(rawStats["Average MVPs"]),
    "Average Penta Kills": avgPenta,
    "Utility Usage per Round": formatNumber(rawStats["Utility Usage per Round"]),
    "Average Assists": formatNumber(rawStats["Average Assists"]),
    "Average K/R Ratio": formatNumber(rawStats["Average K/R Ratio"]),
    "Utility Success Rate": formatNumber(rawStats["Utility Success Rate"]),
    "Average K/D Ratio": formatNumber(rawStats["Average K/D Ratio"]),
    "K/R Ratio": formatNumber(rawStats["K/R Ratio"]),
    "Sniper Kill Rate per Round": formatNumber(rawStats["Sniper Kill Rate per Round"]),
    "Kills": kills,
    "Total 1v2 Count": formatNumber(rawStats["Total 1v2 Count"]),
    "Total Kills with extended stats": formatNumber(rawStats["Total Kills with extended stats"]),
    "Triple Kills": formatNumber(rawStats["Triple Kills"]),
    "Total Entry Count": formatNumber(rawStats["Total Entry Count"]),
    "Win Rate %": formatNumber(rawStats["Win Rate %"]),
    "Total Utility Count": formatNumber(rawStats["Total Utility Count"]),
    "Flash Success Rate": formatNumber(rawStats["Flash Success Rate"]),
    "Total Matches": totalMatches,
    "Total Utility Damage": formatNumber(rawStats["Total Utility Damage"]),
    "Average Kills": formatNumber(rawStats["Average Kills"]),
    "Average Headshots %": formatNumber(rawStats["Average Headshots %"]),
    "K/D Ratio": formatNumber(rawStats["K/D Ratio"]),
    "Matches": formatNumber(rawStats["Matches"]),
    "Deaths": deaths,
    "Rounds": rounds,
    "Average Triple Kills": avgTriple,
    "Quadro Kills": formatNumber(rawStats["Quadro Kills"]),
    "ADR": adr,
    "Total 1v1 Wins": formatNumber(rawStats["Total 1v1 Wins"]),
    "Headshots per Match": formatNumber(rawStats["Headshots per Match"]),
    "Total 1v2 Wins": formatNumber(rawStats["Total 1v2 Wins"]),
    "Total Rounds with extended stats": formatNumber(rawStats["Total Rounds with extended stats"]),
    "Custom Combat Rating": getPlayerCCR(
      kills,
      rounds,
      deaths,
      adr,
      entrySuccess,
      avgTriple,
      avgQuad,
      avgPenta,
      totalMatches
    ),
  };
};
