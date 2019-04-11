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
import public, json

class btco_main:
    __BtcoPath = '/www/server/panel/plugin/btco' #BTCO 主体路径
    __SitePath = '/www/server/panel/BTPanel/templates/default' #宝塔面板模板路径
    __BtcoNick = 'btco.html' #BTCO 网页文件名

    # 实例化BTCO
    def __init__(self):
        if os.path.exists(self.__SitePath)
            if not os.path.isfile(self.__SitePath + self.__BtcoNick)
                public.ExecShell('cp -rf  %s' % self.__BtcoPath + '/Main/' + self.__BtcoNick +' '+ self.__SitePath)

    def BTCO(self, get):
        return public.returnMsg(True, 'Rua!')

    #Coding more...