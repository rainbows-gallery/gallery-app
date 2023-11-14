import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ContactButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    console.log('Button clicked!');
  };

  return (
    <div>
      <Button onClick={handleClick}>Submit</Button>
      {isClicked && <p>Thank you for contacting us!</p>}
    </div>
  );
};

export default ContactButton;
