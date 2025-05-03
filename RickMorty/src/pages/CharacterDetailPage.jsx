import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacter, getEpisodes } from '../services/api';
import './CharacterDetailPage.css';

function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        const characterData = await getCharacter(id);
        setCharacter(characterData);
        
       
        if (characterData.episode && characterData.episode.length > 0) {
          const episodesData = await getEpisodes(characterData.episode);
          setEpisodes(episodesData);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch character details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCharacterDetails();
  }, [id]);
  
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };
  
  if (loading) {
    return <div className="loading">Loading character details...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!character) {
    return <div className="error">Character not found.</div>;
  }
  
  return (
    <div className="character-detail-page">
      <div className="character-profile">
        <div className="character-image-container">
          <img src={character.image} alt={character.name} className="character-image" />
          <div className={`character-status ${getStatusClass(character.status)}`}>
            {character.status}
          </div>
        </div>
        
        <div className="character-info">
          <h2 className="character-name">{character.name}</h2>
          
          <div className="info-section">
            <div className="info-item">
              <span className="info-label">Species</span>
              <span className="info-value">{character.species}</span>
            </div>
            
            {character.type && (
              <div className="info-item">
                <span className="info-label">Type</span>
                <span className="info-value">{character.type}</span>
              </div>
            )}
            
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{character.gender}</span>
            </div>
          </div>
          
          <div className="info-section">
            <div className="info-item">
              <span className="info-label">Origin</span>
              <span className="info-value">{character.origin.name}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{character.location.name}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="episodes-section">
        <h3 className="section-title">Episode Appearances ({episodes.length})</h3>
        
        <div className="episodes-list">
          {episodes.map(episode => (
            <div key={episode.id} className="episode-item">
              <span className="episode-code">{episode.episode}</span>
              <span className="episode-name">{episode.name}</span>
              <span className="episode-date">
                Aired: {new Date(episode.air_date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailPage;