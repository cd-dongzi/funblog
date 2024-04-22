import React from 'react';
type Props = {
    name: string;
    mode?: 'symbol' | 'fontClass';
    color?: string;
    className?: string;
    onClick?: () => void;
};
declare const Icon: React.ForwardRefExoticComponent<Props & React.RefAttributes<SVGSVGElement>>;
export default Icon;
