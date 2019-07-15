<template>
  <div class="btc-index">
    <div class="bg">
      <div class="header">
        <img class="title" src="../assets/img/title.png" alt="">
        <div class="decs">
          <flexbox>
            <flexbox-item>
              <div class="wrap">
                <span>抢活跃排位</span>
                <span>再赢金蛋得积分</span>
                <button class="btn" @click="toRouterActiveRule">活动规则 <img class="btn-img"
                                                                          src="../assets/img/rightbtn.png"
                                                                          alt="">
                </button>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="prize-pool">
          <flexbox>
            <flexbox-item>
              <div class="wrap">
                <span class="comment">当前奖池</span>
                <span class="count" v-for="num in poolCount">
                                   <span>{{num}}</span>
                                </span>
                <span class="comment">积分</span>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <vueSeamless class="dialogue" :data="dialogueList" :class-option="classOption">
        <ul>
          <li class="dialogue-wrap" v-for="(usr,index) in dialogueList">
            <img class="img" :src="usr.avatar">
            <span class="word">{{usr.content}}</span>
          </li>
        </ul>
      </vueSeamless>
      <div class="operation">
        <div class="operation-page">
          <button @click="toRouter('dialog')" class="btn operation-btn"><img src="../assets/img/comment.png"
                                                                             width="47px" alt=""></button>
          <div class="operation-text" v-if="!status">
            <div>你还未预言哦</div>
            <div>截止本交易日22:30</div>
          </div>
          <button @click="toRouter('price')" class="btn operation-btn"><img src="../assets/img/gift.png"
                                                                            width="47px"
                                                                            alt=""></button>
        </div>
        <div class="user-operation">
          <div class="date">
            <span class="sp1">{{date}}BTC指数</span>
            <span class="sp2">{{userOperation.price}} {{userOperation.ratio}}</span>
          </div>
          <div class="rate">
            <div id="upbar" class="bar" style="width: 59%">
              <img width="100%" height="100%" src="../assets/img/redbar.png" alt="">
            </div>
            <div id="downbar" class="bar" style="width: 41%">
              <img width="100%" height="100%" src="../assets/img/greenbar.png" alt="">
            </div>
          </div>
          <div class="guess-btn" v-if="!status">
            <button @click="lookUpDown('up')" class="btn guess-sub-btn"><img width="100%"
                                                                             src="../assets/img/redbtn.png"
                                                                             alt=""></button>
            <button @click="lookUpDown('down')" class="btn"><img width="100%"
                                                                 src="../assets/img/greenbtn.png" alt="">
            </button>
          </div>
          <div class="guessed-text" v-if="status">
            <p>您已预言<span v-if="userInfo.predictResult>0" style="color:#C34E4C">涨</span><span v-else
                                                                                             style="color:#36884A">跌</span>
            </p>
            <p class="p1">预计下一个交易日00:30结果揭晓</p>
          </div>
        </div>
        <div>每个交易日涨跌仅可预言一次,每次可投20-500ultrain积分</div>
      </div>
    </div>
    <div class="record">
      <div class="record-info">
        <div class="prophecy" @click="toRouter('prophecy')">
          <span>预言记录</span>
          <img src="../assets/img/arrowR.png" width="5px" height="10px" alt="">
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
    <div v-transfer-dom>
      <x-dialog v-model="showDialog" hide-on-blur
                :dialog-style="{'max-width': '100%',width:'289px', height: '282px', 'background-color': '#001436','border-radius':'22px'}">
        <div class="dialog-wrap"
             style="width: 100%;height: 100%;padding:15px 19px 0 19px;text-align: center;font-size: 12px;">
          <div style="text-align: right;margin-right: -4px">
            <x-icon @click="showDialog = false" type="ios-close-empty" size="24"
                    style="fill:#7A8496;"></x-icon>
          </div>
          <p style="font-size: 18px;font-weight: 700;color:#FFD600;">预言{{nextDate}}大盘指数涨跌</p>
          <p style="display: flex;justify-content: space-between;margin:30px 0 15px;"><span
            style="color: #78BAEC">每次预言扣除2积分手续费</span><span
            style="color: #fff">我的积分:{{userBanlance}}</span></p>
          <div style="display: flex;justify-content: space-between">
            <button
              :style="[{backgroundColor:selectCount.indexOf(item)>-1?'#FFD600':'#0A2A5B'},{color:selectCount.indexOf(item)>-1?'#001436':'#fff'}]"
              @click="handleSelectCount(item)"
              style="width: 54px;height:34px;border:0;background-color: #0A2A5B;border-radius: 3px;color:#fff;font-size: 21px;font-weight: bold;display: flex;justify-content: center"
              v-for="item in countlist">{{item}}
            </button>
          </div>
          <button @click="sureGuess" v-if="statusUpDown=='up'"
                  style="margin-top: 33px;padding:0;width: 100%;height: 65px;border:0;background:none"><img
            width="100%" height="65px" src="../assets/img/sureRedbtn.png" alt=""></button>
          <button @click="sureGuess" v-if="statusUpDown!=='up'"
                  style="margin-top: 33px;padding:0;width: 100%;height: 65px;background: none;border:0;"><img
            width="100%" height="65px" src="../assets/img/sureGreenbtn.png" alt=""></button>
        </div>
      </x-dialog>
      <toast v-model="showToast" type="text">{{errorMsg}}</toast>
    </div>
    <div v-transfer-dom>
      <x-dialog @on-hide="changeResultRead(userInfo._id)" v-model="showResultDialog" hide-on-blur
                :dialog-style="{'max-width': '100%',width:'289px', height: '282px', 'background-color': '#001436','border-radius':'22px'}">
        <div class="dialog-wrap"
             style="width: 100%;height: 100%;padding:15px 19px 0 19px;text-align: center;font-size: 12px;">
          <div style="text-align: right;margin-right: -4px">
            <x-icon @click="changeResultRead(userInfo._id)" type="ios-close-empty" size="24"
                    style="fill:#7A8496;"></x-icon>
          </div>
          <p style="font-size: 18px;font-weight: 700;color:#FFD600;display: flex"><span
            style="flex:1;text-align: left">{{userInfo.date}}大盘指数</span><span
            style="width: 20px;color:#fff;">{{userInfo.actualResult>0?'涨':'跌'}}</span></p>
          <p style="height: 150px;line-height: 150px;font-size:26px;color: #fff;">
            {{userInfo.isWin?'预言成功':'预言失败'}}</p>
          <p style="color: #fff;font-size: 16px;">收获 {{userInfo.actualValue}} Tokens</p>
        </div>
      </x-dialog>
      <toast v-model="showToast" type="text">{{errorMsg}}</toast>
    </div>
    <div v-transfer-dom>
      <x-dialog @on-hide="changeAwardRead(awardInfo.awardId)" v-model="showDialogGlodEgg" hide-on-blur
                :dialog-style="{'max-width': '100%',width:'289px', height: '320px',backgroundColor:'transparent'}">
        <div style="width:100%;height:100%;">
          <div style="width:100%;height159px;position: absolute;top:0;left:0;z-index: 1">
            <img src="../assets/img/eggBg.png" width="100%" alt="">
            <img style="position: absolute;top:127px;left:42px;" src="../assets/img/eggText.png"
                 width="205px"
                 height="24px" alt="">
          </div>
          <div
            style="width: 100%;height: 270px;position:absolute;top:50px;left:0;border-radius: 22px;background-color: #001436;padding:0 29px;">
            <p style="font-size: 18px;color: #FFD600;margin-top: 120px">获得{{awardInfo.awardResult}}积分</p>
            <button @click="changeAwardRead(awardInfo.awardId)"
                    style="background: none;border:0;padding:0;margin-top:32px;"><img width="100%"
                                                                                      src="../assets/img/sure.png"
                                                                                      alt="">
            </button>
          </div>
        </div>
      </x-dialog>
    </div>
    <toast v-model="showToast" type="text">{{errorMsg}}</toast>
  </div>
</template>

<script>
  import vueSeamless from 'vue-seamless-scroll';
  import { createU3 } from 'u3.js';
  import store from '../store';
  import config from '../../config/ultrain';
  import {
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    ButtonTab,
    ButtonTabItem,
    Swiper,
    SwiperItem,
    XDialog,
    TransferDomDirective as TransferDom,
    Toast,
    Loading,
  } from 'vux';
  import '../assets/scss/indexStyle.scss';
  import { mapGetters } from 'vuex';

  export default {
    directives: {
      TransferDom,
    },
    components: {
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      ButtonTab, ButtonTabItem,
      Swiper, SwiperItem,
      XDialog, Toast, Loading, vueSeamless,
    },
    data() {
      return {
        status: false,
        statusUpDown: 'up',
        showDialog: false,
        showResultDialog: false,
        showDialogGlodEgg: false,
        intervalId: null,
        tabIndex: 0,
        tablist: ['活跃度排行', '胜率排行'],
        tableData: {},
        poolCount: [],
        countlist: [20, 100, 200, 500],
        dialogueList: [],
        selectCount: [],
        showToast: false,
        errorMsg: '',
        userOperation: {
          price: '',
          ratio: '',
        },
        userBanlance: 0,
      };
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'chainInfo',
        'awardInfo',
      ]),
      classOption: function() {
        return {
          step: 0.2,
          limitMoveNum: 5,
          hoverStop: false,
          direction: 1,
          openWatch: true,
          singleHeight: '16.98px',
          waitTime: 1000,
        };
      },
      date() {
        let now = new Date();
        let m = now.getMonth() + 1;
        let d = now.getDate();
        return m + '月' + d + '日';
      },
      nextDate() {
        let now = new Date();
        let m = now.getMonth() + 1;
        let d = now.getDate() + 1;
        return m + '月' + d + '日';
      },
    },
    methods: {
      // 获取userinfo
      async getPersonInfo() {
        let perdictInfo = await this.getPersonUrl('/predict/personalLatest');
        let rankInfo = await this.getPersonUrl('/rank/personal');
        if (perdictInfo == null) {
          this.status = false;
        } else {
          if (perdictInfo && !perdictInfo[0].hasRead) {
            this.status = false;
            this.showResultDialog = true;
          } else {
            this.status = true;
          }
          let obj = {
            avatar: rankInfo.avatar,
            predictRank: rankInfo.predictRank,
            predictTimes: rankInfo.predictTimes,
            winRank: rankInfo.winRank,
            winRatio: rankInfo.winRatio,
            winTimes: rankInfo.winTimes,
            date: perdictInfo[0].date,
            isFinished: perdictInfo[0].isFinished,
            predictResult: perdictInfo[0].predictResult,
            predictValue: perdictInfo[0].predictValue,
            actualResult: perdictInfo[0].actualResult,
            actualValue: perdictInfo[0].actualValue,
            isWin: perdictInfo[0].isWin,
            userId: perdictInfo[0].userId,
            username: perdictInfo[0].username,
            _id: perdictInfo[0]._id,
          };
          store.commit('SET_USERINFO', obj);
        }
      },
      // 获取balance
      async getBanlance() {
        const u3 = createU3(config);
        const balance = await u3.getCurrencyBalance({
          code: config.pointAccount,
          account: config.poolAccount,
          symbol: config.symbol,
        });
        const userbalance = await u3.getCurrencyBalance({
          code: config.pointAccount,
          symbol: config.symbol,
          account: this.chainInfo.accountName,
        });
        this.userBanlance = userbalance.length ? userbalance[0].split(' ')[0] : 0;
        this.poolCount = balance.length ? balance[0].split(' ')[0].split('') : 0;
        console.log('balance');
        console.log(this.poolCount);
        console.log('userbalance');
        console.log(this.userBanlance);
      },
      getPersonUrl(url) {
        const promise = new Promise((resolve, reject) => {
          this.axios.get(this.GLOBAL.baseUrl + url + `?userId=${this.chainInfo.userId}`)
            .then((res) => {
              let { state, data } = res.data;
              state == 'success' ? resolve(data) : resolve(null);
            }).catch((err) => {
            reject(err);
          });
        });
        return promise;
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
      // 聊天
      getChatList() {
        this.axios.get(this.GLOBAL.baseUrl + '/chat/list')
          .then((res) => {
            let { state, message, data } = res.data;
            if (state == 'success') {
              this.dialogueList = data;
            }
          })
          .catch((err) => console.log(err));
      },
      // 最新预测信息
      getLatestIndex() {
        this.axios.get(this.GLOBAL.baseUrl + '/predict/latestIndex')
          .then((res) => {
            let { state, message, data } = res.data;
            if (state == 'success') {
              this.userOperation = data;
              let uRate = data.proportion * 100;
              let dRate = (1 - data.proportion) * 100;
              document.getElementById('upbar').style.width = uRate + '%';
              document.getElementById('downbar').style.width = dRate + '%';
            } else {
              this.showToast = true;
              this.errorMsg = message;
            }
          })
          .catch((err) => console.log(err));
      },
      // 获取奖励信息
      async getAward() {
        let award = await this.getPersonUrl('/award/personalLatest');
        if (award.length) {
          let { date, _id, result, hasRead } = award[0];
          let obj = {
            awardDate: date,
            awardId: _id,
            awardResult: result,
          };
          store.commit('SET_AWARDINFO', obj);
          hasRead === false ? this.showDialogGlodEgg = true : this.showDialogGlodEgg = false;
        }
      },
      // 关闭结果弹窗
      changeResultRead(id) {
        let params = { id: id };
        this.axios.post(this.GLOBAL.baseUrl + '/predict/update', JSON.stringify(params))
          .then((res) => {
            let { state } = res.data;
            if (state == 'success') {
              this.showResultDialog = false;
            }
          }).catch(err => console.log(err));
      },
      // 关闭奖励弹窗
      changeAwardRead(id) {
        let params = { id: id };
        this.axios.post(this.GLOBAL.baseUrl + '/award/update', JSON.stringify(params))
          .then((res) => {
            let { state } = res.data;
            if (state == 'success') {
              this.showDialogGlodEgg = false;
            }
          }).catch(err => console.log(err));
      },
      lookUpDown(val) {
        let now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        if ((h >= 22) || (h == 0 && m < 30)) {
          this.errorMsg = '预言时间来哦!';
          this.showToast = true;
          return;
        }
        this.selectCount = [];
        this.showDialog = true;
        this.statusUpDown = val;
      },
      toRouter(name) {
        let index = name == 'prophecy' ? 0 : 1;
        name == 'prophecy' || name == 'price' ? this.$router.push({
          name: 'Mine',
          params: { index: index },
        }) : this.$router.push('MessageBoard');
      },
      toRouterActiveRule() {
        this.$router.push('ActiveRule');
      },
      handleToMore(index) {
        this.$router.push({ name: 'More', params: { index: index } });
      },
      // 选择预言积分
      handleSelectCount(item) {
        let arr = this.selectCount;
        let target = arr.filter(function(a) {
          return a == item;
        });
        if (target.length) {
          let array = arr.filter(function(b) {
            return b != item;
          });
          this.selectCount = array;
        } else {
          arr.pop();
          arr.push(item);
          this.selectCount = arr;
        }
      },
      // 提交预言
      sureGuess() {
        if (this.selectCount.length) {
          if (this.selectCount[0] > this.userBanlance) {
            this.errorMsg = '您的积分不足';
            this.showToast = true;
            return;
          }
          let postData = {
            'chainId': this.chainInfo.chainId,                 //[必填],链ID,从url的参数中获取后回填至此
            'contract': config.pointAccount,             //[必填],如果转账UGAS,则值为"utrio.token"，否则值为具体的发币合约的owner账号
            'action': 'transfer',                   //[必填],转账业务，值为固定的值"transfer"
            'type': 'transfer',                     //[必填],转账业务的固定值为"transfer"
            'bizId': new Date().getMilliseconds(),              //[必填],业务id,用来保证同一业务不会重复转账
            'data': {
              'payer': this.chainInfo.accountName,
              'receiver': config.poolAccount,           //[必填],收款账号，一般为商家的账号
              'quantity': (parseInt(this.selectCount[0]) - 2) + ' UPOINT',           //[必填],数量及单位，如果是UGAS,则比如"100.0000 UGAS"
              'memo': 'predict to pool',                        //[必填],值可以空
            },
          };

          let postData2 = {
            'chainId': this.chainInfo.chainId,                 //[必填],链ID,从url的参数中获取后回填至此
            'contract': config.pointAccount,             //[必填],如果转账UGAS,则值为"utrio.token"，否则值为具体的发币合约的owner账号
            'action': 'transfer',                   //[必填],转账业务，值为固定的值"transfer"
            'type': 'transfer',                     //[必填],转账业务的固定值为"transfer"
            'bizId': new Date().getMilliseconds(),              //[必填],业务id,用来保证同一业务不会重复转账
            'data': {
              'payer': this.chainInfo.accountName,
              'receiver': config.gainAccount,           //[必填],收款账号，一般为商家的账号
              'quantity': '2 UPOINT',           //[必填],数量及单位，如果是UGAS,则比如"100.0000 UGAS"
              'memo': 'predict to fee',                        //[必填],值可以空
            },
          };

          let data = [postData, postData2];
          if (window.postMessage) {
            console.log('sending data to webview...', JSON.stringify(data));
            window.postMessage(JSON.stringify(data));
          } else {
            throw Error('postMessage接口还未注入');
          }
        } else {
          this.errorMsg = '请选择预言积分';
          this.showToast = true;
        }
      },
    },
    async created() {
      let obj = {
        chainId: this.$route.query.chainId,
        userId: this.$route.query.userId,
        phoneNum: this.$route.query.phoneNum,
        accountName: this.$route.query.accountName,
      };
      store.commit('SET_CHAININFO', obj);
      this.getBanlance();
    },
    mounted() {
      this.getChatList();
      this.getLatestIndex();
      this.getTableData();
      this.getPersonInfo();
      this.getAward();
      this.$on('listenChatList', function() {
        this.getChatList();
      });
      this.intervalId = setInterval(() => {
        this.getChatList();
      }, 10000);

      document.addEventListener('message', (e) => {
        let result = e.data;
        let { success, msg } = JSON.parse(result);
        if (success) {
          let params = {
            phoneNum: this.chainInfo.phoneNum,
            predictValue: this.selectCount[0],
            predictResult: this.statusUpDown == 'up' ? 1 : -1,
          };
          this.axios.post(this.GLOBAL.baseUrl + '/predict/add', params)
            .then((res) => {
              let { state, message } = res.data;
              if (state == 'success') {
                this.showDialog = false;
                this.getPersonInfo();
                this.getBanlance();
              } else {
                this.errorMsg = message;
                this.showToast = true;
              }
            })
            .catch((err) => console.log(err));
        } else {
          this.errorMsg = msg;
          this.showToast = true;
        }
      });
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
    },
  };
</script>
