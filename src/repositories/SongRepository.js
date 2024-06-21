import { searchSongs } from "../services/Api";

export default class SongRepository {
  async search(query) {
    try {
      const results = await searchSongs(query);
      return results;
    } catch (error) {
      console.error('Error searching songs:', error);
      throw error;
    }
  }
}