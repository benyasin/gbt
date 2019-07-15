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
                    <button class="btn tab-btn active" @click="handleTab($event,'活跃度排行')">活跃度排行</button>
                    <button class="btn tab-btn" @click="handleTab($event,'胜率排行')">胜率排行</button>
                </div>
                <div class="list">
                    <div class="list-block" v-for="(itm,index) in tableData[tabIndex]" :key="index">
                        <div class="block-item">
                            <span class="sp1-more">{{index+1}}</span>
                            <img width="32px" height="32px" :src="itm.avatar" alt="">
                            <span class="sp2-more">{{itm.username}}</span>
                            <span class="sp3-more"><span v-if="tabIndex=='活跃度排行'">{{itm.predictTimes}}</span><span
                                    v-else>{{(itm.winRatio*100).toFixed(2)}}%</span><span class="sp4-more"
                                                                                          v-if="tabIndex=='活跃度排行'">活跃度</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/mine.scss'
    import {mapGetters} from 'vuex'

    export default {
        components: {},
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        name: "more",
        data() {
            return {
                user: {
                    avatar: '../assets/img/sGoldEgg.png',
                    name: '三生三世',
                    price: 33,
                },
                tabIndex: '活跃度排行',
                tablist: ['活跃度排行', '胜率排行'],
                tableData: {},
            }
        },
        created() {
            this.tabIndex = this.tablist[this.$route.params.index]
        },
        mounted() {
            if (this.$route.params && this.$route.params.index == 1) {
                this.handleTabWin()
                this.tabIndex = this.tablist[this.$route.params.index]
            } else {
                this.tabIndex = this.tablist[0]
            }
            this.getTableData()
        },
        methods: {
            async getTableData() {
                let map = new Map()
                let obj = {}
                let activelist = await this.getDataUrl('/rank/activeList')
                let winlist = await this.getDataUrl('/rank/winList')
                map.set('活跃度排行', activelist)
                map.set('胜率排行', winlist)
                for (let [key, value] of map) {
                    obj[key] = value
                }
                this.tableData = obj
            },
            getDataUrl(url) {
                const promise = new Promise((resolve, reject) => {
                    this.axios.get(this.GLOBAL.baseUrl + url)
                        .then((res) => {
                            let {state, data} = res.data
                            state == 'success' ? resolve(data) : resolve([])
                        }).catch((err) => {
                        reject(err)
                    })
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
            handleTabWin() {
                let eles = this.$refs.tabbtns.querySelectorAll('button')
                eles.forEach(item => {
                    item.className = 'btn tab-btn'
                })
                eles[1].className = 'btn tab-btn active'
            },
        },
    }
</script>


