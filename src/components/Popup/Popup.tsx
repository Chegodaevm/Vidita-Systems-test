import { Button } from 'antd';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import s from './Popup.module.scss';

type Props = {
  active: boolean;
  setActive: any;
};

const Popup = ({ active, setActive }: Props) => {
  const { resultActiveBoxes, choosenAllCheckboxes, documents } = useAppSelector(
    (state) => state.fetchSlice,
  );

  let arrayOfNamesActive: string[] = [];
  if (choosenAllCheckboxes && resultActiveBoxes.length === 0) {
    arrayOfNamesActive = documents.map((arr) => arr.name);
  }

  let Names: string[] = [];
  let arrayOfNamesActiveWithSingleClick: string[] = [];
  if (choosenAllCheckboxes === false && resultActiveBoxes.length !== 0) {
    arrayOfNamesActiveWithSingleClick = resultActiveBoxes;

    for (let i = 0; i < arrayOfNamesActiveWithSingleClick.length; i++) {
      for (let k = 0; k < documents.length; k++) {
        if (arrayOfNamesActiveWithSingleClick[i] == documents[k].id) {
          Names.push(documents[k].name);
        }
      }
    }
  }

  function submit() {
    fetch('/cancel', {
      method: 'POST',
      body:
        arrayOfNamesActive.length > 0
          ? JSON.stringify(documents.map((arr) => arr.id))
          : JSON.stringify(resultActiveBoxes),
    }).then((response) => console.log(response));
  }

  return (
    <div className={s.modal} onClick={() => setActive(false)}>
      <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
        <p>Вы уверены что хотите аннулировать товар(ы): </p>
        <ul>
          {arrayOfNamesActive.length > 0
            ? arrayOfNamesActive.map((arr, i) => <li key={i}>{arr}</li>)
            : Names.map((arr: any, i: number) => <li key={i}>{arr}</li>)}
        </ul>
        <div className={s.modal__buttons}>
          <Button onClick={() => setActive(false)}>Отменить</Button>
          <Button danger={true} onClick={submit}>
            Применить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
