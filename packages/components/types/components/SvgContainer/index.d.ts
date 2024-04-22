import React from 'react';
interface SvgContainerProps {
    list: {
        name: string;
        content: string;
    }[];
}
declare function SvgContainer({ list }: SvgContainerProps): React.JSX.Element | null;
export default SvgContainer;
