import React, { useRef } from 'react';
import { useEchartsScrollByPie } from './hooks';
import { parseData, parseObj } from './utils';

type Props = {
  name: string;
  data: any;
};

const PieFull = ({ name, data }: Props) => {
  const ref = useRef(null);
  useEchartsScrollByPie({
    ref,
    name,
    data: data ? parseData(parseObj(data)) : [],
  });
  return <div className="h-[500px] w-full" ref={ref}></div>;
};

export default PieFull;
