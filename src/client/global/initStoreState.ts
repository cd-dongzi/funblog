import { IStore } from '@/store'
import { setNavigationState } from '@/store/navigation/action'
import { Session } from '@/utils/cache'
import config from '@/config'
export default (store: IStore) => {
  const navigations = Session.get(config.keys.navigationKey) || []
  store.dispatch(
    setNavigationState({
      navigations
    })
  )
}
