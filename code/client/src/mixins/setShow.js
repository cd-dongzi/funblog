export default {
    computed: {
        screenSize () {
            if (typeof window !== "undefined") {
                return this.$store.state.system.screenSize
            }
            return ''
        }
    },
    watch: {
        screenSize: {
            immediate: true,
            handler () {
                this.$nextTick(() => {
                    this.setShow()
                })
            }
        }
    }
}