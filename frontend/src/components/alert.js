import { useBeforeunload } from 'react-beforeunload';
import { useState } from 'react';

const Example = (props) => {
  const [value, setValue] = useState('');

  useBeforeunload((event) => {
    if (value !== '') {
      event.preventDefault();
    }
  });

  return (
    <input onChange={(event) => setValue(event.target.value)} value={value} />
  );
};
export default Example;