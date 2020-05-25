  export default {
      state: {
          loading: false,
      },
      mutations: {
          setLoading(state, data) {
              state.loading = data
          },
      },
      getters: {
          loading: state => state.loading,
      },
      actions: {

      }
  }