import { useState, useEffect } from 'react';
import { getCharacters } from '../services/api';
import CharacterGrid from '../components/CharacterGrid';
import Pagination from '../components/Pagination';
import './CharactersPage.css';

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({ count: 0, pages: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await getCharacters(currentPage);
        setCharacters(data.results);
        setInfo(data.info);
        setError(null);
      } catch (err) {
        setError('Failed to fetch characters. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCharacters();
  }, [currentPage]);
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= info.pages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  if (loading && characters.length === 0) {
    return <div className="loading">Loading characters...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  return (
    <div className="characters-page">
      <div className="page-header">
        <h2 className="page-title">Character Gallery</h2>
        <p className="page-description">Explore all your favorite characters from the Rick and Morty universe</p>
      </div>
      
      <CharacterGrid characters={characters} />
      
      <Pagination 
        currentPage={currentPage}
        totalPages={info.pages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default CharactersPage;