import { Line } from '@ant-design/plots';
import { Card } from 'antd';
import React from 'react';
 
const DemoLine = () => {
  const data = [
    { month: 'January', value: 3 },
    { month: 'February', value: 4 },
    { month: 'March', value: 3.5 },
    { month: 'April', value: 5 },
    { month: 'May', value: 4.9 },
    { month: 'June', value: 6 },
    { month: 'July', value: 7 },
    { month: 'August', value: 9 },
    { month: 'September', value: 13 },
    { month: 'october', value: 5 },
    { month: 'November', value: 4 },
    { month: 'December', value: 2 },
  ];
  const config = {
    data,
    xField: 'month',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return (
    <div>
    <Line {...config} />
    </div>
  )
   
};
 
export default DemoLine;
 