export function getPlayerCCR(
    kills: number,
    rounds: number,
    deaths: number,
    adr: number,
    entrySuccess: number,
    avgTriple: number,
    avgQuad: number,
    avgPenta: number,
    matches: number,
): number {
    const KPR = kills / rounds;
    const SR = 1 - (deaths / rounds);
    const IMP = (entrySuccess * 0.7) + (KPR * 0.3);
    const MK = (avgTriple * 0.5) + (avgQuad * 0.75) + (avgPenta * 1.0);
    const ADRf = adr / 75;
  
    const rating = 
      (KPR * 1.6) +
      (SR * 1.3) +
      (IMP * 1.15) +
      (ADRf * 1.2) +
      (MK * 0.5) +
      (matches * 0.01);
  
    return (rating / 4.25);
}
