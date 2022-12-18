import React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import TableComponent from '../components/TableComponent';

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <TableComponent />
      <ButtonComponent />
    </div>
  );
};

export default Home;
