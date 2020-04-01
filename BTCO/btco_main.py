#!/usr/bin/python
# coding: utf-8
# +-------------------------------------------------------------------
# |  ____ _____ ____ ___  
# | | __ )_   _/ ___/ _ \ 
# | |  _ \ | || |  | | | |
# | | |_) || || |__| |_| |
# | |____/ |_| \____\___/ 
# |
# | BTCO - 宝塔响应式解决方案 [ https://github.com/LF112/BTCO ]
# +-------------------------------------------------------------------
# | Author: LF112 <lf@lf112.net>
# | Made with love by LF112 [https://lf112.net]
# +-------------------------------------------------------------------

import sys, os, re

if sys.version_info[0] == 2:
    reload(sys)
    sys.setdefaultencoding('utf-8')
os.chdir('/www/server/panel')
sys.path.append("class/")
import public, json, math
from flask import session
if __name__ != '__main__':  
    import panelAuth
    from BTPanel import comm,redirect,session

class btco_main:
    BtcoIns = []

    # 实例化BTCO
    def __init__(self):
        pass

    def _check(self,args):
        if not comm.local():
            return True
        else:
            return redirect('/login',302)
        if not public.GetConfigValue('btco'): 
            return public.returnMsg(False,'「BTCO」Please configure the license first.')
        return True

    def index(self,args):
        return {'BTCO_BTTOKEN': session['request_token_head']}

    # BTCO 安装
    def BtcoInstall(self, get):
        v = public.version()
        if v[-2] == '.': 
            if  v < '6.9.1': public.returnMsg(False,'抱歉，面板当前版本不支持BTCO，请升级面板至最新版')
            else:
                if v < '6.9.15': public.returnMsg(False,'抱歉，面板当前版本不支持BTCO，请升级面板至最新版')
        if not public.GetConfigValue('btco'): 
            initobj = open('/www/server/panel/BTPanel/templates/default/layout.html','r')
            for initLine in initobj:
                for btcoin in ['<!--BTCO-->']:
                    if btcoin.upper() in initLine.upper():
                        self.BtcoIns.append(btcoin)
                if len(self.BtcoIns) != 0:
                    initobj.close()
                    public.SetConfigValue('btco',True)
                    return public.returnMsg(True, '您已安装过了.')
            # BTCO 强制跳转写入
            BtcoAdd = '<!--BTCO-->\n   <script> var a=document.location.toString().split("//");navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)&&("/"==a[1].substring(a[1].indexOf("/"))?window.location.href="/btco/index.html' + '":"/config"==a[1].substring(a[1].indexOf("/"))&&(window.location.href="/btco/index.html#/config' + '")); </script> \n   <!--BTCO-->'
            initCoutent = open('/www/server/panel/BTPanel/templates/default/layout.html','r')
            BtcoAddIn = initCoutent.read().split("</head>")
            initCoutent.close()
            BtcoAddin = open('/www/server/panel/BTPanel/templates/default/layout.html','w')
            BtcoAddin.write(BtcoAddIn[0] + BtcoAdd + "</head>" + BtcoAddIn[1])
            BtcoAddin.close()
            public.restart_panel()
            public.SetConfigValue('btco',True)
            return public.returnMsg(True, '安装成功，感谢支持.')
        elif public.GetConfigValue('btco'):
            return public.returnMsg(True,'您已安装过了.')
        return public.returnMsg(False,'安装失败')

    #BTCO 卸载
    def BtcoRemove(self, get):
        if not public.GetConfigValue('btco'): return public.returnMsg(False,'未安装怎么移除？')
        initobj = open('/www/server/panel/BTPanel/templates/default/layout.html','r')
        for initLine in initobj:
            for btcoin in ['<!--BTCO-->']:
                if btcoin.upper() in initLine.upper():
                    self.BtcoIns.append(btcoin)
        if len(self.BtcoIns) > 0:        
            initCoutent = open('/www/server/panel/BTPanel/templates/default/layout.html','r')
            BtcoAddOn = initCoutent.read().split("<!--BTCO-->")
            initCoutent.close()
            BtcoAddOnd = open('/www/server/panel/BTPanel/templates/default/layout.html','w')
            BtcoAddOnd.write(BtcoAddOn[0] + BtcoAddOn[2])
            BtcoAddOnd.close()
            public.restart_panel()
            public.SetConfigValue('btco',False)
            return public.returnMsg(True,'移除成功！')
        public.SetConfigValue('btco',False)
        return public.returnMsg(True,'移除成功')

    #BTCO 安装检测
    def BtcoInstallCheck(self, get):
        if public.GetConfigValue('btco'):
            return public.returnMsg(True,'已安装')
        return public.returnMsg(False,'未安装')

    # BTCO 前端请求扩展
    # ----------------
    # 获取 / 
    def BT_index(self, get):
        v_info = sys.version_info
        BTIndex = {}
        BTIndex['siteCount'] = public.M('sites').count()
        BTIndex['ftpCount'] = public.M('ftps').count()
        BTIndex['databaseCount'] = public.M('databases').count()
        BTIndex['BTTitle'] = public.GetConfigValue('title')
        BTIndex['time'] = self.GetBootTime()
        BTIndex['version'] = session['version']
        BTIndex['system'] = self.GetSystemVersion()
        BTIndex['webserver'] = session['webserver']
        BTIndex['py'] = str(v_info.major) + '.' + str(v_info.minor) + '.' + str(v_info.micro)
        BTIndex['check'] = self.is_pro()
        BTIndex['ip'] = public.GetLocalIp()
        return BTIndex
    
    def BT_Config(self, get):
        BTConfig = {}
        BTConfig['BTTitle'] = public.GetConfigValue('title')
        BTConfig['BTUser'] = session['username']
        BTConfig['BTVersion'] = public.version()
        BTConfig['BTBeta'] = session['updateInfo']['is_beta']
        BTConfig['BTPRO'] = self.is_pro()
        return BTConfig

    #BT 原生扩展 / 一次加载使用
    def GetBootTime(self):
        conf = public.readFile('/proc/uptime').split()
        tStr = float(conf[0])
        min = tStr / 60
        hours = min / 60
        days = math.floor(hours / 24)
        hours = math.floor(hours - (days * 24))
        min = math.floor(min - (days * 60 * 24) - (hours * 60))
        return public.getMsg('SYS_BOOT_TIME',(str(int(days)),str(int(hours)),str(int(min))))

    def GetSystemVersion(self):
        version = public.readFile('/etc/redhat-release')
        if not version:
            version = public.readFile('/etc/issue').strip().split("\n")[0].replace('\\n','').replace('\l','').strip()
        else:
            version = version.replace('release ','').strip()
        return version

    def is_pro(self):
        pdata = panelAuth.panelAuth().create_serverid(None)
        url = public.GetConfigValue('home') + '/api/panel/is_pro'
        pluginTmp = public.httpPost(url,pdata)
        pluginInfo = json.loads(pluginTmp)
        return pluginInfo
    #Coding more...