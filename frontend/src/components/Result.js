import PropTypes from "prop-types";
import { Link } from "react-router-dom";


// card model보고 임의로 넣음(카드 완성본 보관용?)
function Result({id, audio, image, video}) {
  return (
    <div>
      <img src={image} alt={id}/>
      <h2>
        <Link to={`/result/${id}`}>{video}</Link>
      </h2>
      <p>{image}</p>
      <ul>
        {audio.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Result.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  video: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Result;