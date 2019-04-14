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
# | (｢･ω･)｢ Do you believe this is destined? 
# +-------------------------------------------------------------------

import sys, os, re

if sys.version_info[0] == 2:
    reload(sys)
    sys.setdefaultencoding('utf-8')
os.chdir('/www/server/panel')
sys.path.append("class/")
import public, json, requests

class btco_main:
    BtcoIns = []

    # 实例化BTCO
    def __init__(self):
    #    if os.path.exists(self.__SitePath):
    #        if not os.path.isfile(self.__SitePath + self.__BtcoNick):
    #            public.ExecShell('cp -rf  %s' % self.__BtcoPath + '/Main/' + self.__BtcoNick +' '+ self.__SitePath)
        # 已向宝塔申请开发动态路由，转移文件已取消。
        pass

    def _check(self,args):
        if session["login"] != True:
            return public.returnMsg(False,'「BTCO」Please login BT-Panel first.')
        if not public.GetConfigValue('btco'): 
            return public.returnMsg(False,'「BTCO」Please configure the license first.')
        return True

    def index(self,args):
        return True

    # BTCO 安装
    def BtcoInstall(self, get):
        if not self.GetStar(get.github): return public.returnMsg(False, '请先给该项目 Star')
        if not public.GetConfigValue('btco'): 
        
            initobj = open('/www/server/panel/BTPanel/templates/default/layout.html','r')
            for initLine in initobj:
                for btcoin in ['<!--BTCO-->']:
                    if btcoin.upper() in initLine.upper():
                        self.BtcoIns.append(btcoin)
                if len(self.BtcoIns) != 0:
                    initobj.close()
                    public.SetConfigValue('btco_ghnick',get.github)
                    public.SetConfigValue('btco',True)
                    return public.returnMsg(True, '您已安装过了.')
            # BTCO 强制跳转写入
            BtcoAdd = '<!--BTCO-->\n   <script> var a=document.location.toString().split("//");navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)&&"/"==a[1].substring(a[1].indexOf("/"))&&(window.location.href="' + public.getPanelAddr() + '/btco' + '"); </script> \n   <!--BTCO-->'
            initCoutent = open('/www/server/panel/BTPanel/templates/default/layout.html','r')
            BtcoAddIn = initCoutent.read().split("</head>")
            initCoutent.close()
            BtcoAddin = open('/www/server/panel/BTPanel/templates/default/layout.html','w')
            BtcoAddin.write(BtcoAddIn[0] + BtcoAdd + "</head>" + BtcoAddIn[1])
            BtcoAddin.close()
            public.restart_panel()
            public.SetConfigValue('btco_ghnick',get.github)
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
            public.SetConfigValue('btco_ghnick','')
            public.SetConfigValue('btco',False)
            return public.returnMsg(True,'移除成功！')
        public.SetConfigValue('btco_ghnick','')
        public.SetConfigValue('btco',False)
        return public.returnMsg(True,'移除成功')
        

    #BTCO 安装检测
    def BtcoInstallCheck(self, get):
        if public.GetConfigValue('btco'):
            if not self.GetStar(public.GetConfigValue('btco_ghnick')):
                public.SetConfigValue('btco',False)
                return public.returnMsg(True,'UnStar')
            return public.returnMsg(True,public.GetConfigValue('btco_ghnick'))
        return public.returnMsg(False,'未安装')

    # Github Star 授权服务 PS：还不去点点Star吗...´_>`
    def GetStarAuth(self, get):
        if not 'github' in get: return public.returnMsg(False, 'GitHub 用户名不能为空')
        if self.GetStar(get.github): return public.returnMsg(True, '授权成功！请等待安装...')
        return public.returnMsg(False, '未检测到Star记录')
    
    # 获取GitHub Star
    def GetStar(self, Github):
        headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"}
        GitOfBtco = requests.get("https://github.com/" + Github + "?direction=desc&sort=created&tab=stars",headers = headers)
        GitOfBtco = re.findall(re.compile(r'<div class="d-inline-block mb-1"*?>(.*?)</div>',re.S),GitOfBtco.text)
        for StarList in GitOfBtco:
 			if re.findall(re.compile(r'</span>(.*?)<',re.S),StarList)[0].replace(' ', '').strip().upper() == 'BTCO'.upper(): return True
        return False

    # 发出丢人的声音
    def BTCO(self, get):
        return public.returnMsg(True, 'Rua!')

    #Coding more...