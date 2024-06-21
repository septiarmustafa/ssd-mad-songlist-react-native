import SongRepository from '../repositories/SongRepository';

export default class SearchSongs {
  constructor() {
    this.songRepository = new SongRepository();
  }

  async execute(query) {
    try {
      const results = await this.songRepository.search(query);
      return results;
    } catch (error) {
      console.error('Error executing search:', error);
      throw error;
    }
  }
}