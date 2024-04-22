/// <reference types="react" />
type Props = {
    children: any;
    container?: any;
};
interface PortalProps {
    (props: Props): JSX.Element | null;
}
declare const Portal: PortalProps;
export default Portal;
