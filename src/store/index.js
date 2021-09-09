import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    // state
    state: {
        initial: '',
        netSalary: '',
        expenditure: '',
        saving: '',
        earning: '',
    },

    // getters
    getters: {

    },

    // mutations
    mutations: {
        setChartData(state, payload) {
            state.initial = payload.initial;
            state.netSalary = payload.netSalary;
            state.expenditure = payload.expenditure;
            state.saving = payload.saving;
            state.earning = payload.earning;
        },
    }
    // actions
})