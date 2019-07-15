<template>
    <div class="gbt-mine">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="gbt-mine-header">
            <img :src="userInfo.avatar" width="69px" height="69px" style="border-radius: 69px" alt="">
            <span class="name">{{userInfo.username}}</span>
            <div class="price">
                <img src="../assets/img/sGoldEgg.png" width="23px" height="23px" alt="">
                <span class="count">X{{user.price}}</span>
                <span class="desc">金蛋奖励</span>
            </div>
        </div>
        <div class="gbt-mine-content">
            <div class="info">
                <div><p class="rank">{{userInfo.predictRank}}</p>
                    <p class="desc">活跃度排行</p></div>
                <div><p class="rank">{{userInfo.winRank}}</p>
                    <p class="desc">胜率排行</p></div>
                <div><p class="rank">{{(userInfo.winRatio*100).toFixed(2)}}%</p>
                    <p class="desc">胜率</p></div>
                <div><p class="rank">{{userInfo.predictTimes}}</p>
                    <p class="desc">预言战绩</p></div>
            </div>
            <div class="tab">
                <div class="btns" ref="tabbtns">
                    <button class="btn tab-btn active" @click="handleTab($event,'我的预言')">我的预言</button>
                    <button class="btn tab-btn" @click="handleTab($event,'我的奖励')">我的奖励</button>
                </div>
                <div class="list">
                    <div class="list-block" v-for="(itm,index) of tableData[tabIndex]" :key="index">
                        <div class="block-item" v-if="tabIndex=='我的预言'" @click="toRouter(itm)">
                            <p class="item">
                                <span class="sp1">{{itm.predictValue}}积分预言</span>
                                <span class="sp2">{{itm.date}}</span>
                            </p>
                            <p class="item item-sub">
                                <span class="sp3" v-if="itm.status=='success'">{{itm.price}}积分</span>
                                <span class="sp3"><span v-if="itm.isFinished">{{itm.isWin?'成功':'失败'}}</span><span
                                        v-else>待公布</span></span>
                                <button class="btn"><img src="../assets/img/arrowR.png" width="7px" height="11px"
                                                         alt=""></button>
                            </p>
                        </div>
                        <div class="block-item" v-else-if="tabIndex=='我的奖励'">
                            <p class="item-sub">
                                <span class="sp1">金蛋来访</span>
                                <span class="sp2">{{itm.date}}</span>
                            </p>
                            <p class="item item-sub">
                                <span class="sp3">领取{{itm.result}}积分</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <toast v-model="showToast" type="text">{{errorMsg}}</toast>
    </div>
</template>

<script>
    import {Toast} from 'vux'
    import '../assets/scss/mine.scss'
    import {mapGetters} from 'vuex'

    export default {
        components: {
            Toast,
        },
        name: "mine",
        data() {
            return {
                showToast: false,
                errorMsg: '',
                user: {
                    price: 33,
                },
                tabIndex: '我的预言',
                tableData: {},
            }
        },
        created() {
            this.tabIndex = this.$route.params.index == 0 ? '我的预言' : '我的奖励'
        },
        computed: {
            ...mapGetters([
                'userInfo',
                'chainInfo'
            ])
        },
        mounted() {
            if (this.$route.params && this.$route.params.index == 1) {
                this.handleTabPrice()
                this.tabIndex = '我的奖励'
            } else {
                this.tabIndex = '我的预言'
            }
            this.getTableData()
        },
        methods: {
            async getTableData() {
                let map = new Map()
                let predictlist = await this.getList('/predict/list')
                let pricelist = await this.getList(`/award/personal?userId=${this.chainInfo.userId}`)
                map.set('我的预言', predictlist)
                map.set('我的奖励', pricelist)
                console.log(pricelist)
                let obj = {}
                for (let [key, value] of map) {
                    obj[key] = value
                }
                this.tableData = obj
            },
            getList(url) {
                const promise = new Promise((resolve, reject) => {
                    this.axios.get(this.GLOBAL.baseUrl + url)
                        .then((res) => {
                            resolve(res.data.data);
                        }).catch((err) => {
                        reject(err);
                    });
                })
                return promise
            },
            goback() {
                this.$router.go(-1)
            },
            handleTab(e, val) {
                let eles = this.$refs.tabbtns.querySelectorAll('button')
                eles.forEach(item => {
                    item.className = 'btn tab-btn'
                })
                e.target.className = 'btn tab-btn active'
                this.tabIndex = val
            },
            handleTabPrice() {
                let eles = this.$refs.tabbtns.querySelectorAll('button')
                eles.forEach(item => {
                    item.className = 'btn tab-btn'
                })
                eles[1].className = 'btn tab-btn active'
            },
            toRouter(itm) {
                console.log(itm)
                this.$router.push({
                    name: 'MineDetails',
                    params: itm
                })
            },
        },
    }
</script>


