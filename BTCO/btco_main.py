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
    __BtcoPath = '/www/server/panel/plugin/btco' #BTCO 主体路径
    __SitePath = '/www/server/panel/BTPanel/templates/default' #宝塔面板模板路径
    __BtcoNick = 'btco.html' #BTCO 网页文件名
    __BT_init = '/www/server/panel/BTPanel/__init__.py' #宝塔面板核心文件
    BtcoIns = []

    # 实例化BTCO
    def __init__(self):
        if os.path.exists(self.__SitePath):
            if not os.path.isfile(self.__SitePath + self.__BtcoNick):
                public.ExecShell('cp -rf  %s' % self.__BtcoPath + '/Main/' + self.__BtcoNick +' '+ self.__SitePath)

    # BTCO 安装
    def BtcoInstall(self, get):
        if self.GetStar(get.github): return public.returnMsg(False, '请先到GitHub点击Star并授权')
        initobj = open(self.__BT_init,'r')
        for initLine in initobj:
            for btcoin in ['@app.route(\'/btco\'']:
                if btcoin.upper() in initLine.upper():
                    self.BtcoIns.append(btcoin)
            if len(self.BtcoIns) != 0:
                initobj.close()
                return public.returnMsg(True, 'Rua!')
        initobj.close()
        return public.returnMsg(True, 'Not Found!')

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