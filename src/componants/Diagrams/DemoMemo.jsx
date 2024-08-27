import React, { memo, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { Button } from 'antd';
import ReactDOM from 'react-dom';
import { isEqual } from 'lodash-es';
 
const DemoPie = memo(
  ({ data, onReady }) => {
    var config = {
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        text: 'value',
        position: 'outside',
      },
      onReady,
    };
    return <Pie {...config} />;
  },
  (pre, next) => {
    return isEqual(pre?.data, next?.data);
  },
);
 
const DemoMemo = () => {
  const [data, setData] = useState([
    {
      type: 'Noumaan',
      value: 27,
    },
    {
      type: 'Abdul',
      value: 25,
    },
    {
      type: 'Shoaib',
      value: 18,
    },
    {
      type: 'Adnan',
      value: 15,
    },
    {
      type: 'Ikrama',
      value: 10,
    },
    {
      type: 'Muzammil',
      value: 5,
    },
  ]);
 
  return (
    <div>
      <DemoPie data={data} onReady={({ chart }) => {}} />
    </div>
  );
};
 
export default DemoMemo;