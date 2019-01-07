import IconSvg from 'components/Icon-svg';
import MDinput from 'components/MDinput';

const install = Vue => {
    Vue.component('Icon', IconSvg);
    Vue.component('MDinput', MDinput);
};

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./icons/svg', false, /\.svg$/);
requireAll(req);
export default install;
