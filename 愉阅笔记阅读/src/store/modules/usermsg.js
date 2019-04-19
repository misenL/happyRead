const state={
    username:'尚未登陆',
    userImg:'zz',
    userId:'',
    loginState:'',
    lili:''
}

const mutations = {
    userchange(state,payload){
        var userId=payload.userId;
        var username=payload.username;
        state.username=username;
        state.userId=userId;
    }
}
const getters={}
const actions={
    userchange:({commit},payload)=>{
        commit('userchange',payload);
    }
}
export default {
    state,
    mutations,
    getters,
    actions
};
