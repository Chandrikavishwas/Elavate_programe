import CharacterCard from './CharacterCard';
import './CharacterGrid.css';

function CharacterGrid({ characters }) {
  if (!characters || characters.length === 0) {
    return <p className="no-results">No characters found.</p>;
  }
  
  return (
    <div className="character-grid">
      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}

export default CharacterGrid;