import { BASE_URL } from "./BaseUrl";

export async function searchSongs(query) {
  try {
    const response = await fetch(`${BASE_URL}/search?term=${encodeURIComponent(query)}&entity=song&limit=30`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const filteredResults = filterResults(data.results);
    return filteredResults;
  } catch (error) {
    console.error('Error searching songs:', error);
    throw error;
  }
}

function filterResults(results) {
  const filteredSongs = results.filter(item => item.wrapperType === 'track' && item.kind === 'song');
  const filteredMusicVideos = results.filter(item => item.wrapperType === 'track' && item.kind === 'music-video');
  
  const combinedResults = [...filteredSongs, ...filteredMusicVideos];

  const groupedResults = combinedResults.reduce((acc, curr) => {
    const artistName = curr.artistName;
    if (!acc[artistName]) {
      acc[artistName] = [];
    }
    acc[artistName].push(curr);
    return acc;
  }, {});

  const finalResults = Object.keys(groupedResults).map(artistName => ({
    artistName,
    songs: groupedResults[artistName].map(song => ({
      trackId: song.trackId,
      trackName: song.trackName,
      artistName: song.artistName,
      kind: song.kind,
    }))
  }));
  return finalResults;
}
