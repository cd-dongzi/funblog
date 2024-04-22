import React, { useRef } from 'react';
import { useEchartsByPie } from './hooks';
import { parseObj } from './utils';

type Props = {
  name: string;
  data: any;
};

const Pie = ({ name, data }: Props) => {
  const ref = useRef(null);
  useEchartsByPie({
    ref,
    name,
    data: data ? parseObj(data) : [],
  });
  return <div className="h-[300px] w-full" ref={ref}></div>;
};

export default Pie;
