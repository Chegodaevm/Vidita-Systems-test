import { Button } from 'antd/es/radio';
import React from 'react';
import Popup from './Popup/Popup';

type Props = {};

const ButtonComponent = (props: Props) => {
  const [active, setActive] = React.useState(false);

  return (
    <div className="container">
      <Button className="button__content" onClick={() => setActive(true)}>
        Аннулировать
      </Button>
      {active && <Popup active={active} setActive={setActive} />}
    </div>
  );
};

export default ButtonComponent;
