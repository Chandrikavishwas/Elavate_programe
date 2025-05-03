import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getCharacters = async (page = 1) => {
  try {
    const response = await api.get(`/character?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacter = async (id) => {
  try {
    const response = await api.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    throw error;
  }
};

export const getEpisodes = async (episodeUrls) => {
  try {
    
    const episodeIds = episodeUrls.map(url => url.split('/').pop());
    
    if (episodeIds.length === 1) {
      const response = await api.get(`/episode/${episodeIds[0]}`);
      return [response.data];
    }    
    const response = await api.get(`/episode/${episodeIds.join(',')}`);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};