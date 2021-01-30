import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import Guide from './components/Guide';

const { Cell } = ResponsiveGrid;

const Workwx = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <Guide />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Workwx;
