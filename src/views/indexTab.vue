<template>
    <div class="record">
        <div class="record-info">
            <div class="prophecy" @click="toRouter('prophecy')">
                <span>预言记录</span>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAMAAAAlvKiEAAAASFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACrhKybAAAAGHRSTlMAbAVoZFhOLicIYV0WMyIdEEg6GhQNU0GSAe2jAAAAoElEQVQoz23SQRKAIAwDQItVBFFBAf//U4s3UjjuBGZSOk0mmEkdy6mgBSZaUc09izpQ17RmzFrR5cF3N9E9qiyL6qwXPVEfUa/03In4xHLXQjRb1CjKVjWuo2xeiehWlZNkX8iaAcZ2/XXqyfnoc2VpBkV/M6oQb70F3wzGIebB/iFfMOJmua+xtY/rc+4Qq2GwDGWwNup7D05iqJdD+gBcpAWVGGA0BwAAAABJRU5ErkJggg==" width="5px" height="10px" alt="">
            </div>
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
        </div>
        <div class="record-tab">
            <button-tab v-model="tabIndex">
                <button-tab-item>活跃度排行</button-tab-item>
                <button-tab-item>胜率排行</button-tab-item>
            </button-tab>
            <div class="record-desc"><span v-if="tabIndex==0">活跃度排名靠前的人，更有机会瓜分金蛋积分</span><span
                    v-else>太棒了！继续加油哦</span></div>
            <swiper v-model="tabIndex" height="390px" :show-dots="false">
                <swiper-item v-for="(item, index) in tablist" :key="index">
                    <div class="list-block" v-for="(itm,index) in tableData[item]" :key="index">
                        <span class="sp1">{{index+1}}</span>
                        <img width="32px" height="32px" style="border-radius: 32px" :src="itm.avatar" alt="">
                        <span class="sp2">{{itm.username}}</span>
                        <span class="sp3"><span v-if="tabIndex==0">{{itm.predictTimes}}</span><span v-else>{{(itm.winRatio*100).toFixed(2)}}%</span><span
                                class="sp4" v-if="tabIndex==0">活跃度</span></span>
                    </div>
                </swiper-item>
            </swiper>
            <button v-if="tableData[tablist[tabIndex]]&&tableData[tablist[tabIndex]].length>=6"
                    class="btn list-block list-block-btn" @click="handleToMore(tabIndex)"><span>查看更多</span></button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import {
        ButtonTab,
        ButtonTabItem,
        Swiper,
        SwiperItem,
    } from 'vux';
    export default {
        name: "indexTab",
        components: {
            ButtonTab, ButtonTabItem,
            Swiper, SwiperItem,
        },
        data(){
            return{
                tabIndex: 0,
                tablist: ['活跃度排行', '胜率排行'],
                tableData:[],
            }
        },
        created(){
            this.getTableData()
        },
        methods:{
            toRouter(val){
                this.$emit('toRouter',val)
            },
            handleToMore(val){
                this.$emit('handleToMore',val)
            },
            // 活跃度 胜率
            async getTableData() {
                let map = new Map();
                let obj = {};
                let activelist = await this.getDataUrl('/rank/activeList');
                let winlist = await this.getDataUrl('/rank/winList');
                map.set('活跃度排行', activelist);
                map.set('胜率排行', winlist);
                for (let [key, value] of map) {
                    obj[key] = value;
                }
                this.tableData = obj;
            },
            getDataUrl(url) {
                const promise = new Promise((resolve, reject) => {
                    this.axios.get(this.GLOBAL.baseUrl + url + '?currentPage=1&pageSize=6')
                        .then((res) => {
                            let { state, data } = res.data;
                            state == 'success' ? resolve(data) : resolve([]);
                        }).catch((err) => {
                        reject(err);
                    });
                });
                return promise;
            },

        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        }
    }
</script>

<style scoped lang="scss">

</style>
