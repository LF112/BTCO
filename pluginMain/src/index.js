import './app.css'

console.clear()
console.log('\n %c 🎉BTCO %c https://github.com/LF112/BTCO %c BY%c LF112  \n\n', 'color: #ffffff; background: rgb(0, 145, 228); padding:5px 0;', 'background:rgba(197, 197, 197, 0.89); padding:5px 0;', 'color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;', 'color: rgb(0, 145, 228); background: rgba(49, 49, 49, 0.85); padding:5px 0;');

let deliveryRecord = [
    [
        'V1.0 正式版',
        '1.新增面板设置响应式',
        '2.伪Pjax化',
        '3.优化响应式前端JavaScript架构'
    ],
    [
        'V0.3',
        '1.修复插件页动画BUG',
        '2.新增 BTCO POP',
        '3.去除因导入残余库导致的报错'
    ],
    [
        'V0.2',
        '1.更新插件页样式',
        '2.面板版本限制'
    ],
    [
        'V0.1',
        '1.初始化项目',
        '2.初始构造插件页 (宝塔第三方插件首个不使用官方插件模板)',
        '3.增加首页响应式'
    ]
]

const BTCO = {
    init: (DOMID, callback) => {    // 初始化
        //> layui 弹窗组件调用
        _.LE('msg', ['正在处理 BTCO...', 0])

        //> DOM 插入检测
        if (document.getElementById(DOMID) == null) {

            if (_.isMobile()) document.body.innerHTML = '' // 暴力解决移动端适配滚动条问题

            //> 插入DOM
            let btcoMain = document.createElement('div')
            btcoMain.setAttribute('id', 'BTCO')
            btcoMain.setAttribute('dom-hash', Math.random().toString(36).slice(-8)) // 写入伪 hash
            btcoMain.innerHTML = _btcoTEMP

            if (_.isMobile())
                document.body.appendChild(btcoMain)
            else
                document.body.insertBefore(btcoMain, document.body.firstChild)  // 插入所有元素最上方

            //> 插入meta
            let meta = document.createElement('meta')
            meta.content = 'width=device-width,initial-scale=1.0'
            meta.name = 'viewport'
            document.getElementsByTagName('head')[0].appendChild(meta)

            // callback
            callback(true)

        } else callback(false)
    },
    loadMask: (callback, show = true, text = '') => {    // Loading 元素
        if (show) {
            // 展示
            _.$('#BTCO_loadMaskDOM').style.display = 'block'
            _.$('#BTCO_loadMask').innerHTML = text
            setTimeout(() => {
                _.$('#BTCO_loadMaskDOM').style.opacity = 1
                setTimeout(() => callback(), 500)
            }, 1)
        } else {
            // 隐藏
            _.$('#BTCO_loadMaskDOM').style.opacity = 0
            setTimeout(() => {
                _.$('#BTCO_loadMaskDOM').style.display = 'none'
                _.$('#BTCO_loadMask').innerHTML = ''
                callback()
            }, 500)
        }
    },
    newUSE: () => {     // 第一次使用
        _.$('#BTCO_An').style.display = 'unset'
        setTimeout(() => {
            _.$('#BTCO_textAn').childNodes.forEach(v => {
                if (Global.textAnDOM === undefined || Global.textAnDOM === null) {
                    v.style.display = 'block'
                    setTimeout(() => v.style.opacity = 1, 1)
                    Global.textAnDOM = v
                } else Global.stack.push(() => {
                    setTimeout(() => {
                        Global.textAnDOM.style.opacity = 0
                        setTimeout(() => {
                            Global.textAnDOM.style.display = 'none'
                            v.style.display = 'block'
                            setTimeout(() => v.style.opacity = 1, 1)
                            Global.textAnDOM = v
                            setTimeout(() => _.next(), 500)
                        }, 500)
                    }, 1000)
                })
            })
            _.next()
        }, 1)
    },
    startInstall: () => {   // 启用 BTCO 页面
        _.$('#BTCO_textAn').style.opacity = 0
        setTimeout(() => {
            _.$('#BTCO_textAn').style.display = 'none'
            _.$('#BTCO_An').style.display = 'none'

            _.$('#BTCO_Precautions').style.display = 'flex'
            setTimeout(() => _.$('#BTCO_Precautions').style.opacity = 1, 1)

            // MAIN
            _.$('#BTCO-Install').onclick = () => {
                _.$('#BTCO_Precautions').style.opacity = 0
                setTimeout(() => {
                    _.$('#BTCO_Precautions').style.display = 'none'
                    BTCO.APP.installBTCO()
                }, 500)
            }

        }, 500)
    },
    successInstall: () => {     // 操作启用 BTCO 成功
        BTCO.loadMask(() => {
            _.$('#BTCO_Success').style.display = 'unset'
            setTimeout(() => _.$('#BTCO_Success').style.opacity = 1, 1)
            //setTimeout(() => window.location.reload(), 2000)
        }, false)
    },
    failureInstall: (text = '启用失败') => {
        BTCO.loadMask(() => {
            _.TIP(text, 1500, '#e91e63')
            _.$('#BTCO-Install').innerHTML = '重新尝试启用'
            _.$('#BTCO-warnInstall').innerHTML = '启用 BTCO 时失败了！请谨慎重试'
            BTCO.startInstall()
        }, false)
    },
    unInstall: (text = '') => {
        BTCO.loadMask(() => {

            _.$('#BTCO_Hello').style.display = 'block'
            setTimeout(() => _.$('#BTCO_Hello').style.opacity = 1, 1)
            if (text == '')
                _.TIP('已关闭 BTCO', 1500, '#3fc775')
            else _.TIP(text, 1500, '#e91e63')

            setTimeout(() => window.location.reload(), 2000)

        }, false)
    },
    Hello: () => {

        _.$('#BTCO_Hello').style.display = 'block'
        setTimeout(() => _.$('#BTCO_Hello').style.opacity = 1, 1)

        _.$('#BTCO-unInstall').onclick = () => {
            _.$('#BTCO_Hello').style.opacity = 0
            setTimeout(() => {
                _.$('#BTCO_Hello').style.display = 'none'
                BTCO.loadMask(() => {

                    if (!_.isDev())
                        $.post("/plugin?action=a&s=BtcoRemove&name=btco", {}, (rdata) => {
                            if (rdata.status)   // 关闭成功
                                setTimeout(() => BTCO.unInstall(), 1000)
                            else BTCO.unInstall(rdata.msg)  // 关闭失败
                        })
                    else setTimeout(() => BTCO.unInstall(), 1000) // Dev模式 等待一秒直接成功

                }, true, '正在关闭 BTCO')
            }, 500)
        }

    },

    APP: {
        installBTCO: () => {    // 启用 BTCO
            BTCO.loadMask(() => {
                if (!_.isDev())
                    $.post('/plugin?action=a&s=BtcoInstall&name=btco', {}, (rdata) => {
                        if (rdata.status)   // 启用成功
                            BTCO.successInstall()
                        else BTCO.failureInstall(rdata.msg)  // 启用失败
                    })
                else setTimeout(() => BTCO.successInstall(), 1000) // Dev模式 等待一秒直接成功 | BTCO.failureInstall()
            }, true, '正在启用 BTCO 到您的面板')
        }
    }
}, _ = {
    TIP: (text, end = 1000, color = '#fff') => {    // 弹出 TIP
        _.$('#BTCO_TIP').style.display = 'block'
        _.$('#BTCO_textTIP').innerHTML = text
        if (color != '#fff') _.$('#BTCO_textTIP').style.color = color
        setTimeout(() => _.$('#BTCO_TIP').style.opacity = 1, 1)
        setTimeout(() => {
            _.$('#BTCO_TIP').style.opacity = 0
            setTimeout(() => {
                _.$('#BTCO_TIP').style.display = 'none'
                _.$('#BTCO_textTIP').innerHTML = ''
            }, 500)
        }, end)
    },
    LE: (type, arr = []) => {   // layui 弹窗组件定义
        if (process.env.NODE_ENV !== 'development' && !_.isMobile())
            if (type === 'msg') {
                parent.layer.closeAll()
                layer.msg(arr[0], {
                    time: arr[1]
                })
            } else if (type === 'close')
                parent.layer.closeAll()
            else console.log('[BTCO] layer 类型异常')
        else console.log('[BTCO] 触发 layer 事件 > ' + type)
    },
    $: (strExpr) => {   // 伪 JQuery 元素选择
        let idExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            classExpr = /^(?:\s*(<[\w\W]+>)[^>]*|.([\w-]*))$/
        if (idExpr.test(strExpr))
            return document.getElementById(idExpr.exec(strExpr)[2])
        else if (classExpr.test(strExpr)) {
            let classMatch = classExpr.exec(strExpr),
                allElement = document.getElementsByTagName("*"),
                ClassMatch = []
            for (var i = 0, l = allElement.length; i < l; i++) {
                if (allElement[i].className.match(new RegExp("(\\s|^)" + classMatch[2] + "(\\s|$)")))
                    ClassMatch.push(allElement[i]);
            }
            return ClassMatch
        }
    },
    next: () => {   // 队列执行
        let fn = Global.stack[Global.index]
        Global.index = Global.index + 1
        if (typeof fn === 'function') {
            if (Global.index == Global.stack.length)
                setTimeout(() => BTCO.startInstall(), 2500)
            fn()
        }
    },
    background: () => {     // 彩带背景生成
        _.$('#BTCO_evanyou').width = Global.backgroup.w * Global.backgroup.pr
        _.$('#BTCO_evanyou').height = Global.backgroup.h * Global.backgroup.pr
        let evanyouDom = _.$('#BTCO_evanyou').getContext('2d')
        evanyouDom.scale(Global.backgroup.pr, Global.backgroup.pr)
        evanyouDom.globalAlpha = 0.6

        evanyouDom.clearRect(0, 0, Global.backgroup.w, Global.backgroup.h)
        Global.backgroup.q = [{
            x: 0,
            y: Global.backgroup.h * .7 + Global.backgroup.f
        }, {
            x: 0,
            y: Global.backgroup.h * .7 - Global.backgroup.f
        }]
        while (Global.backgroup.q[1].x < Global.backgroup.w + Global.backgroup.f)
            d(Global.backgroup.q[0], Global.backgroup.q[1])

        function d(i, j) {
            evanyouDom.beginPath()
            evanyouDom.moveTo(i.x, i.y)
            evanyouDom.lineTo(j.x, j.y)
            var k = j.x + (Global.backgroup.z() * 2 - 0.25) * Global.backgroup.f,
                n = Global.backgroup.y(j.y)
            evanyouDom.lineTo(k, n)
            evanyouDom.closePath()
            Global.backgroup.r -= Global.backgroup.u / -50
            evanyouDom.fillStyle = '#' +
                (
                    Global.backgroup.v(Global.backgroup.r) * 127 + 128 << 16 |
                    Global.backgroup.v(Global.backgroup.r + Global.backgroup.u / 3) * 127 + 128 << 8 |
                    Global.backgroup.v(Global.backgroup.r + Global.backgroup.u / 3 * 2) * 127 + 128
                ).toString(16)
            evanyouDom.fill()
            Global.backgroup.q[0] = Global.backgroup.q[1]
            Global.backgroup.q[1] = {
                x: k,
                y: n
            }
        }
    },
    isDev: () => {      // Dev 模式
        if (process.env.NODE_ENV === 'development')
            return true
        else return false
    },
    isMobile: () => {
        if (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent))
            return true
        else return false
    }
}, Global = {   // 全局变量
    index: 0,
    stack: [],
    textAnDOM: undefined,
    backgroup: {
        pr: window.devicePixelRatio || 1,
        w: window.innerWidth,
        h: window.innerHeight,
        f: 90,
        q: '',
        r: 0,
        u: Math.PI * 2,
        v: Math.cos,
        z: Math.random,
        y: (p) => {
            let t = p + (Global.backgroup.z() * 2 - 1.1) * Global.backgroup.f
            return (t > Global.backgroup.h || t < 0) ? Global.backgroup.y(p) : t
        }
    }
}

//> 载入 BTCO
BTCO.init('BTCO', check => {
    if (!check)
        _.LE('msg', ['无需重复打开', 1500])   //> layui 弹窗组件调用
    else {
        _.LE('close')     //> layui 弹窗组件关闭调用

        //> 二次检测 ？ 可去待定
        if (document.getElementById('BTCO') !== null)
            _.background()  // 载入背景

        //> 实时年份
        _.$('#BTCO-crData').innerHTML = '&copy 2019 - ' + new Date().getFullYear()

        //> 载入 BTCO 代送记录
        deliveryRecord.forEach(v => {
            let pDom = ''
            v.forEach(i => {
                pDom += '<p>' + i + '</p>'
            })
            _.$('#BTCO-deliveryRecord').innerHTML += '<div>' + pDom + '</div>'
        })

        if (_.isMobile()) {
            _.$('#BTCO').style.width = '100vw'
            _.$('#BTCO').style.left = 0
        }

        setTimeout(() => {
            _.$('#BTCO').style.opacity = 1  // 展示 BTCO 主要容器

            setTimeout(() => {
                // Main

                if (!_.isDev())
                    $.post('/plugin?action=a&s=BtcoInstallCheck&name=btco', {}, (rdata) => {
                        BTCO.loadMask(() => {
                            if (!rdata.status)  // 未安装
                                BTCO.newUSE()
                            else BTCO.Hello()   // 已安装
                        }, false)
                    })
                else
                    BTCO.loadMask(() => {
                        //BTCO.Hello()
                        BTCO.newUSE()
                    }, false)
                //> 此处可为 除 init 外的任意事件

            }, 500)
        }, 100)

    }
})

// Dev
if (_.isDev()) {
    // 禁用侧边边距
    _.$('#BTCO').style.width = '100vw'
} else if (!_.isMobile()) _.$('#memuAsoft').firstChild.nextElementSibling.innerHTML = 'BTCO'   // 更变宝塔面板侧栏文本