import PullLoad from 'components/PullLoad'

export default (url, params) => {
    return {
        render (h) {
            return h(PullLoad, { props: {url, ...params}})
        }
    }
}