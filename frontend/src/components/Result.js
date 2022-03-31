import PropTypes from "prop-types";
import { Link } from "react-router-dom";


// card model보고 임의로 넣음(카드 완성본 보관용?)
function Result({card_id, text, audio, myvoice, image, video, created_at, voice_num}) {
  return (
    <div>
      <img src={image} alt={card_id}/>
      <h2>
        <Link to={`/card/${card_id}`}>{image}</Link>
      </h2>
      <p>{image}</p>
      <ul>
        {image.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Result.propTypes = {
  card_id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  myvoice: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  voice_num: PropTypes.number.isRequired,
  video: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Result;