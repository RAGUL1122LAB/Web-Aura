/**
 * WEB AURA 2K26 - Competition Ranking Calculator
 * 
 * Strict Competition Ranking (1224 ranking):
 * If scores are: [99, 99, 97, 95]
 * The ranks are: [#1, #1, #3, #4]
 * 
 * Never sequential ranking (#1, #2, #3, #4) for ties.
 */

export function calculateCompetitionRankings(items, scoreKey = 'totalScore') {
  if (!items || items.length === 0) return [];

  // Sort descending by score
  const sorted = [...items].sort((a, b) => {
    const scoreA = Number(a[scoreKey]) || 0;
    const scoreB = Number(b[scoreKey]) || 0;
    return scoreB - scoreA;
  });

  let currentRank = 1;
  const ranked = [];

  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i];
    const score = Number(item[scoreKey]) || 0;

    if (i > 0) {
      const prevScore = Number(sorted[i - 1][scoreKey]) || 0;
      if (score < prevScore) {
        currentRank = i + 1;
      }
    }

    ranked.push({
      ...item,
      rank: currentRank
    });
  }

  return ranked;
}
