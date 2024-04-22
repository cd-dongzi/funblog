import { Suspense } from 'react';
import GetData from './GetData';

function GlobalData() {
  return (
    <Suspense>
      <GetData />
    </Suspense>
  );
}

export default GlobalData;
