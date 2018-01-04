<template>
    <el-container class="adduser userinfo" v-loading="loading">
        <el-container>
            <el-main>
                <el-header>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
                        <el-breadcrumb-item v-for="item in title" :key="item.label" :to="{ path: item.to }">{{item.label}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>
                <div class="info-content" style="max-width:1000px">
                    <el-row>
                        <el-col :span="9">
                            <el-row>
                                <el-col class="has-head" :span="6">
                                    <div class="grad-content">
                                        <p class="title">头像</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grad-content">
                                        <div class="head-img"><img :src="userInfo.headImg" alt=""></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6" class="has-head">
                                    <div class="grad-content">
                                        <p class="title">辣椒币</p>
                                    </div>
                                </el-col>
                                <el-col :span="12" class="has-head">
                                    <div class="grad-content">
                                        <!-- <router-link class="red" :to="'/user-info/'+userInfo.id+'/user-pay/money'">{{userInfo.money}}</router-link> -->
                                        <p class="red">{{userInfo.money}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grad-content">
                                        <p class="title">昵称</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grad-content">
                                        <p>{{userInfo.nick}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grad-content">
                                        <p class="title">消费总额</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grad-content">
                                        <!-- <router-link class="red" :to="'/user-info/'+userInfo.id+'/user-pay/RNB'">{{userInfo.RNB}}RNB</router-link> -->
                                        <p class="red">{{userInfo.RNB}}RNB</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grad-content">
                                        <p class="title">账号ID</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grad-content">
                                        <p>{{userInfo.id}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grad-content">
                                        <p class="title">手机号码</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grad-content">
                                        <p>{{userInfo.tel}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grad-content">
                                        <p class="title">性别</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grad-content">
                                        <p>{{userInfo.sex}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grad-content">
                                        <p class="title">个性签名</p>
                                    </div>
                                </el-col>
                                <el-col :span="15">
                                    <div class="grad-content">
                                        <p>{{userInfo.sign}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grad-content">
                                        <p class="title">等级</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grad-content">
                                        <p>{{userInfo.level}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="15">
                            <el-row>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p class="title">已关注</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p>{{userInfo.follow}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p class="title">葱花粉</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <!-- <router-link class="red" :to="'/user-info/'+userInfo.id+'/user-pay/fans'"></router-link>
                                            -->
                                        <p class="red">{{userInfo.fans}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p class="title">蒜泥狠</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p>{{userInfo.black}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-row>
                                <el-col :span="6">
                                    <div class="grad-content">
                                        <p class="title">地区</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grad-content">
                                        <p>{{userInfo.address}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="15">
                            <el-row>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p class="title">擂台</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p>{{userInfo.follow}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p class="title">武林</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p class="red">{{userInfo.fans}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p class="title">风云</p>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grad-content">
                                        <p>{{userInfo.black}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
            <!-- <el-main>
                        <div class="tab-video">
                            <router-view></router-view>
                        </div>
                    </el-main> -->
        </el-container>
    </el-container>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                loading: false,
                wulinSHow: true,
                title: [{
                        label: '用户审核',
                        to: '/user-examine/1'
                    },
                    {
                        label: '用户信息'
                    }],
                userInfo: {
                    headImg: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                    nick: '江湖一姐',
                    id: '333',
                    sex: '女',
                    level: '辣姜V1',
                    address: '澳大利亚',
                    money: '44W',
                    RNB: '4442',
                    tel: '1352554345',
                    sign: '洞洞洞洞顶顶顶顶顶顶顶顶',
                    follow: 33,
                    fans: 33,
                    black: 33
                }
            }
        },
        methods: {
            changeTag() {
                // this.wulinSHow=false;
                this.title = [{
                        label: '用户审核',
                        to: '/user-examine/1'
                    },
                    {
                        label: '用户信息'
                    }
                ]
                let tag = this.$route.params.tag;
                if (tag == 'money' || tag == 'RNB' || tag == 'fans') {
                    // this.wulinSHow=true;
                    this.title = [{
                            label: '用户审核',
                            to: '/user-examine/1'
                        },
                        {
                            label: '用户信息',
                            to: '/user-info/' + this.userInfo.id + '/user-video/leitai'
                        },
                        {
                            label: '数值分析'
                        }
                    ]
                }
            }
        },
        watch: {
            '$route' (to, from) {
                //  this.changeTag();
            }
        },
        created() {
            // this.changeTag();
        }
    }
</script>

<style scoped lang="less">
    .el-aside {
        background: #fff;
        padding: 20px
    }
    .userinfo {
        .grad-content {
            padding: 10px 0 10px 30px;
        }
        .has-head {
            height: 60px;
            line-height: 60px;
        }
        .head-img {
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 30px;
            img {
                width: 100%
            }
        }
    }
</style>
