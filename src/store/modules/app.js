const app = {
    state: {
        direction: 'swiper',       //tip或者swiper(点击返回还是滑动返回)
        userInfo:{
            predictRank:0,
            predictTimes: 0,
            winRank: 0,
            winRatio: 0,
            winTimes: 0,
            isFinished: false,
            isWin:false,
            awardResult:0,
        },
        chainInfo:{
            chainId:'',
            userId:'',
            phoneNum:'',
            accountName:''
        },
    },
    mutations: {
        SET_DIRECTION: (state, direction) => {
            state.direction = direction
        },
        SET_USERINFO:(state,obj)=>{
            state.userInfo = obj
        },
        SET_CHAININFO:(state,obj)=>{
            state.chainInfo = obj
        }
    },
}

export default app
