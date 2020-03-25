<template>
    <div
        class="panelSsl"
        style="opacity: 0; display: none"
        ref="panelSsl"
    >
        <div>
            <div class="head">
                <div>
                    <isIcon i="https"></isIcon>
                    <div>此面板上的 SSL 配置项</div>
                </div>
            </div>
            <div class="main">
                <div>
                    <div
                        class="select"
                        ref="sslSelect"
                    >
                        <el-select
                            v-model="thisValue"
                            placeholder="选择证书类型以继续"
                        >
                            <el-option
                                v-for="item in thisOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div
                        class="self_SSL"
                        ref="self_SSL"
                    >
                        <div class="input">
                            <div>
                                <div>密钥(KEY)</div>
                                <textarea
                                    rows="8"
                                    cols="45"
                                    aria-required="true"
                                    placeholder="在此输入..."
                                    ref="valPrivateKey"
                                    :value="isSSL.ssl.privateKey"
                                ></textarea>
                            </div>
                            <div>
                                <div>证书(PEM格式)</div>
                                <textarea
                                    rows="8"
                                    cols="45"
                                    aria-required="true"
                                    placeholder="在此输入..."
                                    ref="valCertPem"
                                    :value="isSSL.ssl.certPem"
                                ></textarea>
                            </div>
                        </div>
                        <el-divider></el-divider>
                        <div class="PS">
                            <div><i class="el-icon-paperclip"></i>PEM格式证书 = 域名证书.crt + 根证书(root_bundle).crt</div>
                            <div><i class="el-icon-warning-outline"></i>如果浏览器提示证书链不完整，请检查是否正确拼接PEM证书</div>
                            <div><i class="el-icon-s-help"></i>意外启用SSL可登入终端执行下面这条命令关闭:</div>
                            <div style="text-align: center;">rm -f /www/server/panel/data/ssl.pl & bt 1</div>
                        </div>
                    </div>
                    <div
                        class="letsEncrypt_SSL"
                        ref="letsEncrypt_SSL"
                    >
                        <p>键入作用于申请 Let's Encrypt 证书的邮箱地址</p>
                        <el-input
                            placeholder="管理员邮箱"
                            prefix-icon="el-icon-message"
                            clearable
                            size="medium"
                            v-model="vallES"
                            type="mail"
                            :value="isSSL.email"
                        >
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="status">
                    <div>{{ (isHTTPS ? 'SSL已启用' : 'SSL已禁用') + (info === '' ? '' : ' | ' + info) }}</div>
                </div>
                <div class="button">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="close()"
                    >取消</el-button>
                    <el-button
                        v-if="showSave"
                        size="mini"
                        type="success"
                        @click="saveSelfSSL()"
                    >保存并启用</el-button>
                    <el-button
                        v-if="showEmailSave"
                        size="mini"
                        type="success"
                        @click="saveLetsEncryptSSL()"
                    >申请并启用</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        close() {
            this.$refs.panelSsl.style.opacity = 0
            setTimeout(() => this.$refs.panelSsl.style.display = 'none', 500)
            this.$store.commit('thisConfig/changeIsHTTPS', false)
        },
        saveSelfSSL() {
            const that = this
            if (this.$refs.valPrivateKey.value !== '' && this.$refs.valCertPem.value !== ''){
                this.close()
                this.$copop.load('正在保存SSL证书···', 2500)
                if (!this.isDev)
                    this.$http.post('/config?action=SavePanelSSL', {
                        certPem: this.$refs.valCertPem.value,
                        privateKey: this.$refs.valPrivateKey.value
                    }, { emulateJSON: true }).then(R => {
                        that.openSSL(1)
                    }, response => that.$copop.warn('保存失败！请检查网络或修复面板', 2000))
                else that.$copop.warn('Dev 模式无法操作SSL', 2000)
            } else {
                this.info = '不能为空'
                this.$copop.warn('密钥或证书输入框不能为空', 2000)
            }
        },
        saveLetsEncryptSSL() {
            const that = this
            if (this.vallES !== null && this.vallES !== '') {
                this.close()
                if (!this.isDev)
                    this.openSSL(2, this.vallES)
                else that.$copop.warn('Dev 模式无法操作SSL', 2000)
            } else {
                this.info = '邮箱不能为空'
                this.$copop.warn('邮箱输入框不能为空', 2000)
            }
        },
        openSSL( type, mail = '' ) { // 启用 HTTPS
            const that = this
            if(!this.isDev)
                this.$copop.infoUse('现在启用SSL吗？', v => {
                    if(v) {
                        that.$copop.load('正在启用SSL···')
                        let POST = {}
                        POST.cert_type = type
                        if (mail !== undefined && mail !== null && mail !== '') 
                            POST.email = mail
                        that.$http.post('/config?action=SetPanelSSL', POST, { emulateJSON: true }).then(R => {
                            if (R.data.status) {

                                that.$copop.success('启用成功')
                                that.$copop.load('正在重启面板并刷新···')
                                that.$http.get('/system?action=ReWeb').then(R => {
                                    that.$copop.success('服务已重启！')
                                })
                                setTimeout(() => 
                                    window.location.href = ((window.location.protocol.indexOf('https') != -1) ? 'http://' : 'https://') + window.location.host + window.location.pathname
                                , 3000)
                                        
                            } else {
                                that.$copop.warn(R.data.msg, 2500)
                                setTimeout(() => window.location.reload(), 2000)
                            }
                        }, response => that.$copop.warn('启用SSL失败，请检查网络或修复面板', 2500))

                    } else that.$copop.success('证书已保存', 2000)
                })
            else this.$copop.warn('Dev 模式无法启用SSL', 2500)
        }
    },
    watch: {
        showSslChange(v) {
            if(v) {
                this.$refs.panelSsl.style.display = 'flex'
                setTimeout(() => this.$refs.panelSsl.style.opacity = 1, 1)
            } else {
                this.$refs.panelSsl.style.opacity = 0
                setTimeout(() => this.$refs.panelSsl.style.display = 'none', 500)
            }
        },
        thisValue(v) {
            this.$refs.sslSelect.style.opacity = 0
            setTimeout(() => {
                this.$refs.sslSelect.style.display = 'none'
                if (v == 'self') {
                    this.$refs.self_SSL.style.display = 'block'
                    setTimeout(() => this.$refs.self_SSL.style.opacity = 1, 10)
                    this.showSave = true
                } else if (v == 'letsEncrypt') {
                    this.$refs.letsEncrypt_SSL.style.display = 'block'
                    setTimeout(() => this.$refs.letsEncrypt_SSL.style.opacity = 1, 10)
                    this.showEmailSave = true
                } else this.$copop.warn('错误的选项', 2000)
            }, 500)
        }
    },
    data() {
        return {
            thisOptions: [
                {
                    value: 'self',
                    label: '自签证书'
                },
                {
                    value: 'letsEncrypt',
                    label: 'Let\'s Encrypt'
                }
            ],
            thisValue: '',
            vallES: '',
            info: '',

            showSave: false,
            showEmailSave: false
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev']),
        ...mapGetters('thisConfig', ['isHTTPS', 'showSslChange', 'isSSL'])
    }
}
</script>

<style lang="less" scoped>
.panelSsl {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: hsla(0, 0%, 0%, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    > div {
        min-width: 300px;
        margin: 0 12px;
        background: #404040;
        border-radius: 2px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);

        .head {
            position: relative;
            width: 100%;
            margin-bottom: 5px;
            display: flex;
            justify-content: center;
            > div {
                padding: 8px 12px;
                width: 100%;
                display: flex;
                align-items: center;
                background: #303030;
                border-radius: 2px 2px 0 0;
                > i {
                    color: #fff;
                }
                > svg {
                    width: 16px;
                    height: 16px;
                }
                > div {
                    color: #fff;
                    margin-left: 7px;
                    font-size: 14px;
                    font-weight: lighter;
                }
            }
        }
        .main {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            > div {
                width: 100%;
                padding: 0 12px;
                .select {
                    width: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .letsEncrypt_SSL {
                    width: 100%;
                    padding: 4px 0;
                    display: none;
                    opacity: 0;
                    > p {
                        color: #fff;
                        font-size: 12px;
                        margin-bottom: 8px;
                    }
                }
                .self_SSL {
                    width: 100%;
                    min-height: 195px;
                    padding: 4px 0;
                    display: none;
                    opacity: 0;
                    .input {
                        width: 100%;
                        position: relative;
                        display: flex;
                        justify-content: center;
                        > div {
                            position: relative;
                            display: inline-block;
                            margin: 0 5px;
                            padding: 0 0 5px;
                            width: 155px;
                            height: 115px;
                            > textarea {
                                display: inline-block;
                                margin: 10px 0 0;
                                padding: 5px 8px;
                                width: 100%;
                                height: 85px;
                                border: 1px solid #515151;
                                border-radius: 2px;
                                background-color: rgb(81, 81, 81);
                                color: #e6e6e6;
                                text-align: left;
                                font-size: 12px;
                                line-height: normal;
                            }
                            > textarea:focus {
                                outline: none;
                                border: 1px solid #303030;
                            }
                            > div {
                                color: #fff;
                                float: left;
                                font-size: 12px;
                                line-height: 1;
                            }
                        }
                    }
                }
                .el-divider {
                    margin: 4px auto;
                    width: 92%;
                    background-color: #c5c5c5;
                }
                .PS {
                    width: 100%;
                    padding: 2px 10px 5px;
                    text-align: left;
                    > div {
                        color: #fff;
                        font-size: 12px;
                        > i {
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        .bottom {
            width: 100%;
            position: relative;
            margin-top: 8px;
            display: flex;
            .status {
                padding: 2px;
                width: 140px;
                border-radius: 0 2px 0 2px;
                /*background: #303030;*/
                margin-bottom: 8px;
                margin-left: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                > div {
                    color: #fff;
                    font-size: 12px;
                }
            }
            .button {
                position: relative;
                width: 100%;
                padding: 0 8px 8px 0;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .el-button + .el-button {
                    margin-left: 8px;
                }
                > button {
                    color: #fff;
                }
            }
        }
    }
}
</style>