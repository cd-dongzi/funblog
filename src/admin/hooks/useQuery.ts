import { useLocation } from 'react-router'
import qs from 'qs'

export const useQuery = <T extends AnyObject>(): T => {
  const location = useLocation()
  return qs.parse(location.search, { ignoreQueryPrefix: true }) as any
}
