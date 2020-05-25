const environmentMixin = {
    data() {
        return {
            publicPath: process.env.BASE_URL
        }
    }
}

export default environmentMixin;