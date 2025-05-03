import { Link } from 'react-router-dom';
import './CharacterCard.css';

function CharacterCard({ character }) {
  const { id, name, status, species, image } = character;
  
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };
  
  return (
    <div className="character-card">
      <Link to={`/character/${id}`} target="_blank" rel="noopener noreferrer">
        <div className="card-image-container">
          <img src={image} alt={name} className="card-image" />
          <div className={`status-badge ${getStatusClass(status)}`}>
            {status}
          </div>
        </div>
        <div className="card-content">
          <h2 className="card-title">{name}</h2>
          <p className="card-species">{species}</p>
        </div>
      </Link>
    </div>
  );
}

export default CharacterCard;