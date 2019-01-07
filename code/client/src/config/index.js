import app from './app'
import keys from './keys'
import screen from './screen'
import * as classify from './classify'
import keepAliveIncludeList from './keepAliveIncludeList'
import navigationBlackList from './navigationBlackList'
import musicBoxBlackList from './musicBoxBlackList'
import live2DBlackList from './live2DBlackList'

const base = {
    keepAliveIncludeList,
    navigationBlackList,
    musicBoxBlackList,
    live2DBlackList
}
export default Object.assign(base, {app}, {keys}, {screen}, {classify})