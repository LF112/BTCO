// Javascript BTCO - BT-Panel Responsive solution.
// Released under GPL-3.0 License Opensourced. (https://github.com/LF112/BTCO/blob/master/LICENSE)
// Author @LF112 (https://github.com/LF112)
// Copyright reservation is required.

window.onload = function(){
    console.clear();
    console.log('\n %c 🎉BTCO %c https://github.com/LF112/BTCO %c BY%c LF112  \n\n', 'color: #ffffff; background: rgb(0, 145, 228); padding:5px 0;', 'background:rgba(197, 197, 197, 0.89); padding:5px 0;', 'color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;', 'color: rgb(0, 145, 228); background: rgba(49, 49, 49, 0.85); padding:5px 0;');
    
    try{ $(); RunApp() }catch (e) {if (e) {
            const ImportJS = document.createElement('script');
            ImportJS.setAttribute('src', '/static/js/jquery-1.10.2.min.js');
            document.getElementsByTagName('head')[0].appendChild(ImportJS);
            ImportJS.onload = function() { RunApp() }
        }
    }

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return (false)
}

function RunApp(){
    $('#BTCO-MenuClick').hover(function (){
        $('.BTCO-Menu').slideToggle(350);; 
    },function(){
        $('.BTCO-Menu').slideToggle(350);;
    });  

    let BtcoSiteCheck = 'index';
    if(/config/.test(getQueryVariable('to'))){
        BtcoSiteCheck = 'config';
        $("main").empty();
        __BTCO_Config();
    }else{
        //Index
        __BTCO_Index();
    }

    $.post("/plugin?action=a&name=btco&s=BT_index", {}, function(net){

        if(net.check.code == -2 || net.check.code == -1){
            $('#BTCO-BTPanel_Check').text('Free');
            $('#BTCO-BTPanel_Check').css('background-color','#8c8c8c');
        }

        if(BtcoSiteCheck === 'index'){
            var Overviewadder = '',
                Addlist = [['网站',net.siteCount],['FTP',net.ftpCount],['数据库',net.databaseCount]];
            for (var i = 0; i < Addlist.length; i++) {
                Overviewadder += "\n";
                Overviewadder += "<li>\n";
                Overviewadder += "	<div class=\"BTCO-PI_Ov-Box_P1\">"+ Addlist[i][1] +"<\/div>\n";
                Overviewadder += "	<div class=\"BTCO-PI_Ov-Box_P2\">"+ Addlist[i][0] +"<\/div>\n";
                Overviewadder += "<\/li>\n";
                if(i + 1 !== Addlist.length) Overviewadder += "<li><div class=\"BTCO-PI_Ov-Box_P3\"><\/div><\/li>\n";
                Overviewadder += "\n";
            }

            $('#BTCO-P3').append(Overviewadder)

            if(/Centos/i.test(net.system)){
                $('#BTCO-SysIcon').append('<svg class="icon" aria-hidden="true"><use xlink:href="#btcocentos"></use></svg>')
            }else if(/Deepin/i.test(net.system)){
                $('#BTCO-SysIcon').append('<svg class="icon" aria-hidden="true"><use xlink:href="#btcodeepin"></use></svg>')
            }else if(/Ubuntu/i.test(net.system)){
                $('#BTCO-SysIcon').append('<svg class="icon" aria-hidden="true"><use xlink:href="#btcoubuntu"></use></svg>')
            }else $('#BTCO-SysIcon').append('<svg class="icon" aria-hidden="true"><use xlink:href="#btcofedora"></use></svg>')

            $('#BTCO-SysInfo').text(net.system);
            $('#BTCO-P3_1').text(net.ip);
        }

        $('#BTCO-BTPanel_V').text(net.version);
        $("title").html(net.BTTitle);

    });

    //-----BTCO POP
    function BTCO_POP(Content,callback,Show = false){
        var BTCOPOP = "",
        BoxID = Math.random().toString(36).substr(2),
        CheckID = Math.random().toString(36).substr(2),
        CloseID = Math.random().toString(36).substr(2);

        BTCOPOP += "<div id = '" + BoxID + "' class=\"BTCO-LF_POP\" style=\"display: none;\">\n";
        BTCOPOP += "	<div class=\"BTCO-LF_POP-Main\">\n";
        BTCOPOP += "		<div class=\"BTCO-LF_POP-M_Box\">\n";
        BTCOPOP += "			<div class=\"BTCO-LF_POP-M_Icon\">\n";
        BTCOPOP += "				<svg class=\"icon\" style=\"width: 20px;height: 20px;\" aria-hidden=\"true\"><use xlink:href=\"#btcotishi\"><\/use><\/svg>\n";
        BTCOPOP += "			<\/div>\n";
        BTCOPOP += "			<div class=\"BTCO-LF_POP-M_Content\">\n"+ Content +"<\/div>\n";
        if(typeof callback === 'function' && !Show){
            BTCOPOP += "			<div id = '" + CheckID + "' class=\"BTCO-LF_POP-M_Check\">\n";
            BTCOPOP += "				<svg class=\"icon\" style=\"width: 20px;height: 20px;\" aria-hidden=\"true\"><use xlink:href=\"#btcocheck\"><\/use><\/svg>\n";
            BTCOPOP += "			<\/div>\n";
            BTCOPOP += "			<div id = '" + CloseID + "' class=\"BTCO-LF_POP-M_Close\">\n";
            BTCOPOP += "				<svg class=\"icon\" style=\"width: 20px;height: 20px;\" aria-hidden=\"true\"><use xlink:href=\"#btcoclose\"><\/use><\/svg>\n";
            BTCOPOP += "			<\/div>\n";
        }
        BTCOPOP += "		<\/div>\n";
        BTCOPOP += "	<\/div>\n";
        BTCOPOP += "<\/div>\n";
        $('main').prepend(BTCOPOP);
        if(typeof callback === 'function' && !Show){
            $('html,body').animate({ scrollTop: 0 }, 500);
            callback([BoxID, CheckID, CloseID])
        }else if(typeof callback === 'function' && Show){
            $('#' + BoxID).slideToggle();
            $('html,body').animate({ scrollTop: 0 }, 500);
            callback([BoxID])
        }else{
            if(typeof callback === 'undefined') callback = 1500;
            $('#' + BoxID).slideToggle();
            $('html,body').animate({ scrollTop: 0 }, 500);
            setTimeout(function(){
                $('#' + BoxID).slideToggle();
                setTimeout(function(){
                    $('#' + BoxID).remove()
                },500);                
            },callback)
        }
    }
    //-----BTCO POP

    //-----BTCO Input POP
    function BTCO_InputPOP(Contents,callback){
        var BTCOInputPOP = "",
        BoxID = Math.random().toString(36).substr(2),
        CheckID = Math.random().toString(36).substr(2),
        CloseID = Math.random().toString(36).substr(2);
        BTCOInputPOP += "<div id=\"" + BoxID + "\" class=\"BTCO-OtherConfig\" style=\"margin-top:0;margin-bottom:10px;display: none;\">\n";
        BTCOInputPOP += "	<div class=\"BTCO-OC_BTCOInputPOP-M\">\n";
        BTCOInputPOP += "		<ul class=\"BTCO-OC_BIP-InputList\">\n";
        for (var i = 0; i < Contents.length; i++) {
            BTCOInputPOP += "			<li>\n";
            BTCOInputPOP += "			<div class=\"BTCO-OC_BIP-IL_Box\">\n";
            BTCOInputPOP += "				<div style=\"padding: 5px 5px 5px 0;\">\n";
            BTCOInputPOP += "					<div class=\"BTCO-OC_BIP-IL_Title\">" + Contents[i][0] + "<\/div>\n";
            BTCOInputPOP += "					<textarea id=\"" + Contents[i][1] + "\" rows=\"8\" cols=\"45\" aria-required=\"true\" placeholder=\"在此输入...\" style=\"float: right;width: 75%;\"><\/textarea>\n";
            BTCOInputPOP += "					<div style=\"width: 75%;margin-left: 25%;height: 1px;float: left;background: #c5c5c5;\">\n";
            BTCOInputPOP += "					<\/div>\n";
            BTCOInputPOP += "				<\/div>\n";
            BTCOInputPOP += "			<\/div>\n";
            BTCOInputPOP += "			<\/li>\n";
        }
        BTCOInputPOP += "		<\/ul>\n";
        BTCOInputPOP += "		<div style=\"width:100%;height: 28px;display: inline-block;\">\n";
        BTCOInputPOP += "			<div id = '" + CheckID + "' class=\"BTCO-OC_BIP-Button\" style=\"right: 80px\">确定<\/div>\n";
        BTCOInputPOP += "			<div id = '" + CloseID + "' class=\"BTCO-OC_BIP-Button\">取消<\/div>\n";
        BTCOInputPOP += "		<\/div>\n";
        BTCOInputPOP += "	<\/div>\n";
        BTCOInputPOP += "<\/div>\n";
        $('main').prepend(BTCOInputPOP);
        $('html,body').animate({ scrollTop: 0 }, 500);
        callback([BoxID, CheckID, CloseID])
    }
    //-----BTCO Input POP


    //-----BTCO Pjax

    //-----BTCO-> Index(Pjax)

    function __BTCO_Index_P(){
        $.get("/",function(){}); //更新页面
        var This = 'index';
        $("main").slideToggle();
        setTimeout(function(){ 
            $("main").empty(); 
            $("main").css('display','block');
            $('.BTCO-LF_Pjax').fadeIn(500);
            BTCO_POP('正在打开首页，请稍后',function(ID){
                setTimeout(function(){
                    $.get("./static/other/" + This + ".html", function(html) {
                        $('#' + ID[0]).slideToggle();
                        setTimeout(function(){
                            $('#' + ID[0]).remove()
                        },500);
                        $('.BTCO-LF_Pjax').fadeOut(500);
                        setTimeout(function(){
                            $("main").css('display','none');
                            $("main").html(html)
                            $("main").slideToggle();

                            __BTCO_Index();

                            $.post("/plugin?action=a&name=btco&s=BT_index", {}, function(net){

                                if(net.check.code == -2 || net.check.code == -1){
                                    $('#BTCO-BTPanel_Check').text('Free');
                                    $('#BTCO-BTPanel_Check').css('background-color','#8c8c8c');
                                }
                        
                                if(BtcoSiteCheck === 'index'){
                                    var Overviewadder = '',
                                        Addlist = [['网站',net.siteCount],['FTP',net.ftpCount],['数据库',net.databaseCount]];
                                    for (var i = 0; i < Addlist.length; i++) {
                                        Overviewadder += "\n";
                                        Overviewadder += "<li>\n";
                                        Overviewadder += "	<div class=\"BTCO-PI_Ov-Box_P1\">"+ Addlist[i][1] +"<\/div>\n";
                                        Overviewadder += "	<div class=\"BTCO-PI_Ov-Box_P2\">"+ Addlist[i][0] +"<\/div>\n";
                                        Overviewadder += "<\/li>\n";
                                        if(i + 1 !== Addlist.length) Overviewadder += "<li><div class=\"BTCO-PI_Ov-Box_P3\"><\/div><\/li>\n";
                                        Overviewadder += "\n";
                                    }
                        
                                    $('#BTCO-P3').append(Overviewadder)
                        
                                    if(/Centos/i.test(net.system)){
                                        $('#BTCO-SysIcon').append('<svg class="icon" aria-hidden="true"><use xlink:href="#btcocentos"></use></svg>')
                                    }else if(/Deepin/i.test(net.system)){
                                        $('#BTCO-SysIcon').append('<svg class="icon" aria-hidden="true"><use xlink:href="#btcodeepin"></use></svg>')
                                    }else if(/Ubuntu/i.test(net.system)){
                                        $('#BTCO-SysIcon').append('<svg class="icon" aria-hidden="true"><use xlink:href="#btcoubuntu"></use></svg>')
                                    }else $('#BTCO-SysIcon').append('<svg class="icon" aria-hidden="true"><use xlink:href="#btcofedora"></use></svg>')
                        
                                    $('#BTCO-SysInfo').text(net.system);
                                    $('#BTCO-P3_1').text(net.ip);
                                }
                        
                                $('#BTCO-BTPanel_V').text(net.version);
                                $("title").html(net.BTTitle);
                        
                            });

                        },500);
                    });
                },500);
            },true);
        },500);
    }

    //-----BTCO-> Index(Pjax)
    
    //-----BTCO-> Config
    function __BTCO_Config(){
        $.get("/config",function(){}); //更新页面
        var This = 'config';
        $("main").slideToggle();
        setTimeout(function(){ 
            $("main").empty(); 
            $("main").css('display','block');
            $('.BTCO-LF_Pjax').fadeIn(500);
            BTCO_POP('正在打开设置页，请稍后',function(ID){
                setTimeout(function(){
                    $.get("./static/other/" + This + ".html", function(html) {
                        $('#' + ID[0]).slideToggle();
                        setTimeout(function(){
                            $('#' + ID[0]).remove()
                        },500);
                        $('.BTCO-LF_Pjax').fadeOut(500);
                        setTimeout(function(){
                            $("main").css('display','none');
                            $("main").html(html)
                            $("main").slideToggle();
                            //----- BTCO PanelSSL
                            $("#BTCO-PanelSSL").on("click", function() {
                                if(!$('#BTCO-PanelSSL_Box').is(":hidden")){
                                    BTCO_POP('面板SSL设置未关闭，请先保存或关闭');
                                    return;
                                }
                                $.post("/config?action=GetPanelSSL", {}, function(net){
                                    if(net.rep){
                                        $('#BTCO-PanelSSL_Box').slideToggle();
                                        $('#BTCO-PanelSSL_KEY').val(net.privateKey);
                                        $('#BTCO-PanelSSL_PEM').val(net.certPem);
                                        
                                        BTCO_POP('点击此处关闭或保存',function(ID){
                                            $('#' + ID[0]).slideToggle();
                                            $('#' + ID[1]).click(function(){
                                                BTCO_POP('正在保存');
                                                setTimeout(function(){
                                                    $('#' + ID[0]).slideToggle();
                                                    setTimeout(function(){
                                                        $('#' + ID[0]).remove()
                                                    },500);
                                                },500);
                                                $.post("/config?action=SavePanelSSL", { privateKey: $('#BTCO-PanelSSL_KEY').val(),certPem:$('#BTCO-PanelSSL_PEM').val() }, function(net){
                                                    if(net.status){
                                                        BTCO_POP(net.msg)
                                                        $('#BTCO-PanelSSL_Box').slideToggle();
                                                        $('#BTCO-PanelSSL_KEY').val('');
                                                        $('#BTCO-PanelSSL_PEM').val('');
                                                        $('#' + ID[0]).slideToggle();
                                                        setTimeout(function(){
                                                            $('#' + ID[0]).remove()
                                                        },500);
                                                    }else BTCO_POP(net.msg)
                                                })
                                            });
                                            $('#' + ID[2]).click(function(){
                                                $('#BTCO-PanelSSL_Box').slideToggle();
                                                $('#BTCO-PanelSSL_KEY').val('');
                                                $('#BTCO-PanelSSL_PEM').val('');
                                                $('#' + ID[0]).slideToggle();
                                                setTimeout(function(){
                                                    $('#' + ID[0]).remove()
                                                },500);
                                            });
                                        })
                
                                    }else BTCO_POP('获取失败！')
                                })
                            });
                            //----- BTCO PanelSSL

                            //----- BTCO PanelAPI
                            $("#BTCO-PanelAPI").on("click", function() {
                                if(!$('#BTCO-PanelAPI_Box').is(":hidden")){
                                    BTCO_POP('API接口设置未关闭，请先保存或关闭');
                                    return;
                                }
                                $.post("/config?action=get_token", {}, function(net){
                                    $('#BTCO-PanelAPI_Box').slideToggle();
                                    $('#BTCO-PanelAPI_KEY').val(net.token);
                                    $('#BTCO-PanelAPI_limit_addr').val(net.limit_addr);
                        
                                    BTCO_POP('点击此处关闭或保存',function(ID){
                                        $('#' + ID[0]).slideToggle();
                                        $('#' + ID[1]).click(function(){
                                            BTCO_POP('正在保存');
                                            setTimeout(function(){
                                                $('#' + ID[0]).slideToggle();
                                                setTimeout(function(){
                                                    $('#' + ID[0]).remove()
                                                },500);
                                            },500);
                                            $.post("/config?action=set_token", { t_type: 3, limit_addr:$('#BTCO-PanelAPI_limit_addr').val() }, function(net){
                                                if(net.status){
                                                    BTCO_POP(net.msg)
                                                    $('#BTCO-PanelAPI_Box').slideToggle();
                                                    $('#BTCO-PanelAPI_KEY').val('');
                                                    $('#BTCO-PanelAPI_limit_addr').val('');
                                                    $('#' + ID[0]).slideToggle();
                                                    setTimeout(function(){
                                                        $('#' + ID[0]).remove()
                                                    },500);
                                                }else BTCO_POP(net.msg)
                                            })
                                        });
                                        $('#' + ID[2]).click(function(){
                                            $('#BTCO-PanelAPI_Box').slideToggle();
                                            $('#BTCO-PanelAPI_KEY').val('');
                                            $('#BTCO-PanelAPI_limit_addr').val('');
                                            $('#' + ID[0]).slideToggle();
                                            setTimeout(function(){
                                                $('#' + ID[0]).remove()
                                            },500);
                                        });
                                    })
                        
                                });
                            });    
                            if(window.location.protocol.indexOf('https') != -1){
                                $('#BTCO-PanelSSL_switch').addClass("BTCO-LF_switch-click")
                            }else $('#BTCO-PanelSSL_switch').removeClass("BTCO-LF_switch-click")
                            $.post("/config?action=get_config", {}, function(net){
                                if(net.api === 'checked'){
                                    $('#BTCO-PanelAPI_switch').addClass("BTCO-LF_switch-click")
                                }else $('#BTCO-PanelAPI_switch').removeClass("BTCO-LF_switch-click")
                                if(net.ipv6 === 'checked'){
                                    $('#BTCO-PanelIPV6_switch').addClass("BTCO-LF_switch-click")
                                }else $('#BTCO-PanelIPV6_switch').removeClass("BTCO-LF_switch-click")                          

                                //-----

                                $.post("/plugin?action=a&name=btco&s=BT_Config", {}, function(net){
                                    $('#BTCO-PanelConfig_webname').val(net.BTTitle);
                                    $('#BTCO-PanelConfig_PanelUser').val(net.BTUser);
                                });
                                $.post("/ssl?action=GetUserInfo", {}, function(net){
                                    $('#BTCO-PanelConfig_BTSiteUser').val(net.data.username);
                                });
                                $('#BTCO-PanelConfig_port').val(net.panel.port);
                                $('#BTCO-PanelConfig_BTtimeout').val(net.session_timeout);
                                $('#BTCO-PanelConfig_BTtimeout-Conntent').text('若用户在' + net.session_timeout + '秒内没有任何操作，将自动退出面板');
                                $('#BTCO-PanelConfig_workers').val(net.workers);
                                $('#BTCO-PanelConfig_domain').val(net.panel.domain);
                                $('#BTCO-PanelConfig_limitip').val(net.panel.limitip);
                                $('#BTCO-PanelConfig_sites_path').val(net.sites_path);
                                $('#BTCO-PanelConfig_backup_path').val(net.backup_path);
                                $('#BTCO-PanelConfig_address').val(net.panel.address);
                                $('#BTCO-PanelConfig_systemdate').val(net.systemdate);
                                $('#BTCO-PanelConfig_PanelPassWord').val('********');
                                $('#BTCO-PanelConfig_WeChatAppUser').val(net.wx);
                                $('#BTCO-PanelConfig_admin_path').val(net.panel.admin_path);
                                
                                $.post("/ssl?action=GetUserInfo", {}, function(net){
                                    if(net.status){
                                        $('#BTCO-PanelConfig-InButton').prepend("<div id=\"BTCO-PanelConfig-Button_BTSiteUser\" style=\"position: absolute;cursor: pointer;width: 55px;height: 25px;margin-top: 2px;right: 78px;border-radius: 2px;letter-spacing: 0.05em;text-align: center;font-size: 12px;line-height: 2.2;background: rgba(51, 51, 51, 0.82)!important;\">切换<\/div>\n");
                                        $('#BTCO-PanelConfig-InButton').prepend("<div id=\"BTCO-PanelConfig-Button_UnBTSiteUser\" style=\"position: absolute;cursor: pointer;width: 55px;height: 25px;margin-top: 2px;right: 15px;border-radius: 2px;letter-spacing: 0.05em;text-align: center;font-size: 12px;line-height: 2.2;background: rgba(51, 51, 51, 0.82)!important;\">解绑<\/div>\n");
                                        BindBTSiteUser()
                                        $('#BTCO-PanelConfig-Button_UnBTSiteUser').click(function(){
                                            BTCO_POP('确定要解绑宝塔账号吗？',function(ID){
                                                $('#' + ID[0]).slideToggle();
                                                $('#' + ID[1]).click(function(){
                                                    BTCO_POP('正在解绑....',2000);
                                                    $.post("/ssl?action=DelToken", { }, function(net){
                                                        if(net.status){
                                                            BTCO_POP(net.msg);
                                                            $('#' + ID[0]).slideToggle();
                                                            setTimeout(function(){
                                                                $('#' + ID[0]).remove()
                                                                setTimeout(function(){window.location.reload(true)},500)
                                                            },500);
                                                        }else BTCO_POP(net.msg);
                                                    });
                                                });
                                                $('#' + ID[2]).click(function(){
                                                    $('#' + ID[0]).slideToggle();
                                                    setTimeout(function(){
                                                        $('#' + ID[0]).remove()
                                                    },500);
                                                });
                                            })
                                        })
                                    }else{
                                        $('#BTCO-PanelConfig-InButton').prepend("<div id=\"BTCO-PanelConfig-Button_BTSiteUser\" style=\"position: absolute;cursor: pointer;width: 55px;height: 25px;margin-top: 2px;right: 15px;border-radius: 2px;letter-spacing: 0.05em;text-align: center;font-size: 12px;line-height: 2.2;background: rgba(51, 51, 51, 0.82)!important;\">绑定<\/div>\n");
                                        BindBTSiteUser()
                                    }
                                })
                                
                                //-----
                            });
                            $('#BTCO-PanelSSL_switch').click(function(){
                                BTCO_POP('正在设置面板SSL...',1000)
                                $.post("/config?action=SetPanelSSL", { }, function(net){
                                    if(net.status){
                                        BTCO_POP(net.msg)
                                        if(/开启/.test(net.msg)){
                                            var targetProtocol="https:";
                                        }else var targetProtocol="http:";
                                        $.post("/system?action=ReWeb", { }, function(net){
                                            if(net.status){
                                                window.location.protocol!=targetProtocol&&(window.location.href=targetProtocol+window.location.href.substring(window.location.protocol.length));
                                            }else BTCO_POP(net.msg);
                                        });
                                    }else BTCO_POP(net.msg)
                                })
                            });   
                            $('#BTCO-PanelAPI_switch').click(function(){
                                BTCO_POP('正在设置面板API...',1000)
                                $.post("/config?action=set_token", { t_type: 2 }, function(net){
                                    if(net.status){
                                        BTCO_POP(net.msg)
                                    }else BTCO_POP(net.msg)
                                })
                            });         
                            $('#BTCO-PanelClose_switch').click(function(){
                                BTCO_POP('正在关闭面板...',1000)
                                $.post("/config?action=ClosePanel", { }, function(net){
                                    if(net.status){
                                        BTCO_POP(net.msg)
                                        setTimeout(function(){window.location.reload(true);},1500)
                                    }else BTCO_POP(net.msg)
                                })
                            });       
                            $('#BTCO-PanelIPV6_switch').click(function(){
                                BTCO_POP('正在设置面板IPV6...',1000)
                                $.post("/config?action=set_ipv6_status", { }, function(net){
                                    if(net.status){
                                        BTCO_POP(net.msg)
                                    }else BTCO_POP(net.msg)
                                })
                            });         
                            $('#BTCO-PanelAPI_ReKEY').click(function(){
                                BTCO_POP('正在重置API接口KEY...',1000)
                                $.post("/config?action=set_token", { t_type:1 }, function(net){
                                    if(net.status){
                                        $('#BTCO-PanelAPI_KEY').val(net.msg);
                                        BTCO_POP('接口密钥已生成，请保管好您的新密钥，此密钥只显示一次!')
                                    }else BTCO_POP(net.msg)
                                })
                            });
                            $('#BTCO-PanelClose_SaveConfig').click(function(){
                                BTCO_POP('正在保存面板配置...',1000)
                                $.post("/config?action=setPanel", {
                                    webname: $('#BTCO-PanelConfig_webname').val(),
                                    port: $('#BTCO-PanelConfig_port').val(),
                                    workers: $('#BTCO-PanelConfig_workers').val(),
                                    session_timeout: $('#BTCO-PanelConfig_BTtimeout').val(),
                                    domain: $('#BTCO-PanelConfig_domain').val(),
                                    limitip: $('#BTCO-PanelConfig_limitip').val(),
                                    sites_path: $('#BTCO-PanelConfig_sites_path').val(),
                                    backup_path: $('#BTCO-PanelConfig_backup_path').val(),
                                    address: $('#BTCO-PanelConfig_address').val(),
                                    systemdate: $('#BTCO-PanelConfig_systemdate').val(),
                                }, function(net){
                                    if(net.status){
                                        BTCO_POP(net.msg)
                                    }else BTCO_POP(net.msg)
                                })
                            });
                            $('#BTCO-PanelConfig-Button_systemdate').click(function(){
                                BTCO_POP('正在同步服务器时间...',1000)
                                $.post("/config?action=syncDate", { }, function(net){
                                    if(net.status){
                                        BTCO_POP(net.msg);
                                        setTimeout(function(){window.location.reload(true);},1500)
                                    }else BTCO_POP(net.msg)
                                })
                            });
                            $('#BTCO-PanelConfig-Button_admin_path').click(function(){
                                if($("#BTCO-PC_B-path_set").length > 0){
                                    BTCO_POP('修改安全入口未关闭，请先保存或关闭');
                                    return;
                                }
                                $.post("/config?action=get_config", {}, function(net){
                                    BTCO_InputPOP([['入口地址','BTCO-PC_B-path_set']],function(ID){
                                        $('#BTCO-PC_B-path_set').val(net.panel.admin_path);
                                        BTCO_POP('修改安全入口',function(IDs){
                                            $('#' + ID[0]).slideToggle();
                                            $('#' + ID[1]).click(function(){
                                                BTCO_POP('正在修改安全入口...',1000);
                                                $.post("/config?action=set_admin_path", { admin_path:$('#BTCO-PC_B-path_set').val() }, function(net){
                                                    if(net.status){
                                                        BTCO_POP(net.msg);
                                                        $('#BTCO-PC_B-path_set').val('');
                                                        setTimeout(function(){
                                                            $('#' + ID[0]).slideToggle();
                                                            $('#' + IDs[0]).slideToggle();
                                                            setTimeout(function(){
                                                                $('#' + ID[0]).remove()
                                                                $('#' + IDs[0]).remove();
                                                                setTimeout(function(){window.location.reload(true);},500)
                                                            },500);
                                                        },1000)
                                                    }else BTCO_POP(net.msg)
                                                })
                                            });
                                            $('#' + ID[2]).click(function(){
                                                $('#' + ID[0]).slideToggle();
                                                $('#' + IDs[0]).slideToggle();
                                                setTimeout(function(){
                                                    $('#' + ID[0]).remove()
                                                    $('#' + IDs[0]).remove();
                                                },500);
                                            });
                                        },true);
                                    });
                                });
                            });
                            $('#BTCO-PanelConfig-Button_PanelUser').click(function(){
                                if($("#BTCO-PC_B-PanelUser_set").length > 0){
                                    BTCO_POP('修改面板用户未关闭，请先保存或关闭');
                                    return;
                                }
                                BTCO_InputPOP([['用户名','BTCO-PC_B-PanelUser_set'],['重复用户名','BTCO-PC_B-PanelUser_Reset']],function(ID){
                                    BTCO_POP('修改面板用户',function(IDs){
                                        $('#' + ID[0]).slideToggle();
                                        $('#' + ID[1]).click(function(){
                                            BTCO_POP('正在修改面板用户...',1000);
                                            $.post("/config?action=setUsername", { 
                                                username1: $('#BTCO-PC_B-PanelUser_set').val(),
                                                username2: $('#BTCO-PC_B-PanelUser_Reset').val()
                                            }, function(net){
                                                if(net.status){
                                                    BTCO_POP(net.msg);
                                                    $('#BTCO-PC_B-PanelUser_set').val('');
                                                    $('#BTCO-PC_B-PanelUser_Reset').val('');
                                                    setTimeout(function(){
                                                        $('#' + ID[0]).slideToggle();
                                                        $('#' + IDs[0]).slideToggle();
                                                        setTimeout(function(){
                                                            $('#' + ID[0]).remove()
                                                            $('#' + IDs[0]).remove();
                                                        },500);
                                                    },1000)
                                                }else BTCO_POP(net.msg)
                                            })
                                        });
                                        $('#' + ID[2]).click(function(){
                                            $('#' + ID[0]).slideToggle();
                                            $('#' + IDs[0]).slideToggle();
                                            setTimeout(function(){
                                                $('#' + ID[0]).remove()
                                                $('#' + IDs[0]).remove();
                                            },500);
                                        });
                                    },true);
                                });
                            });
                            $('#BTCO-PanelConfig-Button_PanelPassWord').click(function(){
                                if($("#BTCO-PC_B-PanelPassWord_set").length > 0){
                                    BTCO_POP('修改面板密码未关闭，请先保存或关闭');
                                    return;
                                }
                                BTCO_InputPOP([['密码','BTCO-PC_B-PanelPassWord_set'],['重复密码','BTCO-PC_B-PanelPassWord_Reset']],function(ID){
                                    BTCO_POP('修改面板密码',function(IDs){
                                        $('#' + ID[0]).slideToggle();
                                        $('#' + ID[1]).click(function(){
                                            BTCO_POP('正在修改面板密码...',1000);
                                            $.post("/config?action=setPassword", { 
                                                password1: $('#BTCO-PC_B-PanelPassWord_set').val(),
                                                password2: $('#BTCO-PC_B-PanelPassWord_Reset').val()
                                            }, function(net){
                                                if(net.status){
                                                    BTCO_POP(net.msg);
                                                    $('#BTCO-PC_B-PanelPassWord_set').val('');
                                                    $('#BTCO-PC_B-PanelPassWord_Reset').val('');
                                                    setTimeout(function(){
                                                        $('#' + ID[0]).slideToggle();
                                                        $('#' + IDs[0]).slideToggle();
                                                        setTimeout(function(){
                                                            $('#' + ID[0]).remove()
                                                            $('#' + IDs[0]).remove();
                                                        },500);
                                                    },1000)
                                                }else BTCO_POP(net.msg)
                                            })
                                        });
                                        $('#' + ID[2]).click(function(){
                                            $('#' + ID[0]).slideToggle();
                                            $('#' + IDs[0]).slideToggle();
                                            setTimeout(function(){
                                                $('#' + ID[0]).remove()
                                                $('#' + IDs[0]).remove();
                                            },500);
                                        });
                                    },true);
                                });
                            });
                            function BindBTSiteUser(){
                                $('#BTCO-PanelConfig-Button_BTSiteUser').click(function(){
                                    if($("#BTCO-PC_B-BTStieUser_set").length > 0){
                                        BTCO_POP('绑定宝塔账号未关闭，请先保存或关闭');
                                        return;
                                    }
                                    BTCO_InputPOP([['宝塔用户名','BTCO-PC_B-BTStieUser_set'],['宝塔密码','BTCO-PC_B-BTStiePassWord_set']],function(ID){
                                        BTCO_POP('绑定宝塔账号',function(IDs){
                                            $('#' + ID[0]).slideToggle();
                                            $('#' + ID[1]).click(function(){
                                                BTCO_POP('正在绑定宝塔账号...',2000);
                                                $.post("/ssl?action=GetToken", { 
                                                    username: $('#BTCO-PC_B-BTStieUser_set').val(),
                                                    password: $('#BTCO-PC_B-BTStiePassWord_set').val()
                                                }, function(net){
                                                    if(net.status){
                                                        BTCO_POP(net.msg);
                                                        $('#BTCO-PC_B-BTStieUser_set').val('');
                                                        $('#BTCO-PC_B-BTStiePassWord_set').val('');
                                                        setTimeout(function(){
                                                            $('#' + ID[0]).slideToggle();
                                                            $('#' + IDs[0]).slideToggle();
                                                            setTimeout(function(){
                                                                $('#' + ID[0]).remove()
                                                                $('#' + IDs[0]).remove();
                                                                setTimeout(function(){window.location.reload(true);},500)
                                                            },500);
                                                        },1000)
                                                    }else BTCO_POP(net.msg)
                                                })
                                            });
                                            $('#' + ID[2]).click(function(){
                                                $('#' + ID[0]).slideToggle();
                                                $('#' + IDs[0]).slideToggle();
                                                setTimeout(function(){
                                                    $('#' + ID[0]).remove()
                                                    $('#' + IDs[0]).remove();
                                                },500);
                                            });
                                        },true);
                                    });
                                });
                            }
                            //----- BTCO PanelAPI

                            //----- 菜单事件

                            $("#BTCO-href_Index").on('click',function() { 
                                __BTCO_Index_P();
                                BtcoSiteCheck = 'index';
                                $("#BTCO-href_Config").unbind();
                                $("#BTCO-href_Index").unbind();
                             }); //Index
                            $("#BTCO-href_Config").on('click',function() { BTCO_POP('您已经在面板设置页了！') }); //Config

                            //----- 菜单事件

                            $(".BTCO-LF_switch").on("click", function() {
                                $(this).hasClass("BTCO-LF_switch-click") ? $(this).removeClass("BTCO-LF_switch-click") : $(this).addClass("BTCO-LF_switch-click")
                            });

                        },500);
                    });
                },500);
            },true);
        },500);
    }
    //-----BTCO-> Config
    
    //-----BTCO Pjax
    
    function __BTCO_Index(){
        //-----BTCO-> Index
        GetNetWork();

        //-----BTCO-> Index(导入磁盘)
        $.post("/system?action=GetDiskInfo", {}, function(net) {

            var adder = '';
            for (var i = 0; i < net.length; i++) {
                adder += "\n";
                adder += "<li>\n";
                adder += "<div class=\"BTCO-APP_Main\">\n";
                adder += "	<div class=\"BTCO-APP_StatusColor\">\n";
                adder += "	<\/div>\n";
                adder += "	<div class=\"BTCO-APP_Content\">\n";
                adder += "		<div class=\"Status\">"+ net[i].size[1] +" / "+ net[i].size[0] +"<\/div>\n";
                adder += "		<div class=\"Content\">"+ net[i].path +"<\/div>\n";
                adder += "	<\/div>\n";
                adder += "	<div class=\"BTCO-APP_ProgressBox\">"+ net[i].size[3] +"<\/div>\n";
                adder += "	<div class=\"BTCO-APP_Progress\">\n";
                adder += "		<div class=\"BTCO-APP_Progress-P1\">\n";
                adder += "			<div style=\"width: "+ net[i].size[3] +"\" class=\"BTCO-APP_Progress-P2\">\n";
                adder += "			<\/div>\n";
                adder += "		<\/div>\n";
                adder += "	<\/div>\n";
                adder += "<\/div>\n";
                adder += "<\/li>\n";
                adder += "\n";
            }

            $('.BTCO-systemInfoList').append(adder)

        });
        //-----BTCO-> Index(导入磁盘)

        //-----BTCO-> Index(服务器网络状态心跳包)
        function GetNetWork(){
            $.post("/system?action=GetNetWork", {}, function(net) {
                var btco_p1 = net.cpu[1],
                    btco_p2 = (net.mem.memRealUsed * 100 / net.mem.memTotal).toFixed(1), //内存使用率 / P2
                    items = [{ title: '运行堵塞', val: 100, color: '#dd2f00' }, { title: '运行缓慢', val: 90, color: '#ff9900' }, { title: '运行正常', val: 70, color: '#20a53a' }, { title: '运行流畅', val: 30, color: '#20a53a' }],
                    item = {};

                for (var i = 0; i < items.length; i++) {
                    if (Math.round((net.load.one / net.load.max) * 100) <= items[i].val) {
                        item = items[i];
                        continue;
                    }
                    break;
                }

                var series = chart.series[0],
                    shift = series.data.length > 5;

                chart.series[0].addPoint([(new Date()).valueOf(),net.up], true, shift);
                chart.series[1].addPoint([(new Date()).valueOf(),net.down], true, shift);

                if (item.title) $('#BTCO-P0').text(item.title);
                if (item.color) $('#BTCO-P0_0').css('background', item.color);
                $('#BTCO-P0_1').text(Math.round((net.load.one / net.load.max) * 100) + '%');
                $('#BTCO-P0_2').css('width', Math.round((net.load.one / net.load.max) * 100) + '%');

                $('#BTCO-P1').text(btco_p1 + ' 核心');
                $('#BTCO-P1_1').text(net.cpu[0] + '%');
                $('#BTCO-P1_2').css('width', net.cpu[0] + '%');
                
                $('#BTCO-P2').text(net.mem.memRealUsed + '/' + net.mem.memTotal + '(MB)');
                $('#BTCO-P2_1').text(btco_p2 + '%');
                $('#BTCO-P2_2').css('width', btco_p2 + '%');
                
                $('#BTCO-P5_0').text(net.up);
                $('#BTCO-P5_1').text(net.down);
                $('#BTCO-P5_2').text(Tosize(net.downTotal));
                $('#BTCO-P5_3').text(Tosize(net.upTotal));

                if(BtcoSiteCheck === 'index') setTimeout(function(){ GetNetWork() },2000)
            });
        }
        //-----BTCO-> Index(服务器网络状态心跳包)

        //-----BTCO-> Index(按钮事件区)

        //----- 菜单事件

        
        $("#BTCO-href_Index").on('click',function() { BTCO_POP('您已经在面板首页了！') }); //Index
        $("#BTCO-href_Config").on('click',function() { 
            __BTCO_Config();
            BtcoSiteCheck = 'config'
            $("#BTCO-href_Config").unbind();
            $("#BTCO-href_Index").unbind();
         }); //Config

        //----- 菜单事件

        $('#BTCO-P4_0').click(function() {
            $(this).text('稍等');
            $.post("/ajax?action=UpdatePanel", {}, function(net){
                $('#BTCO-P4_0').text('更新');

                if(net.msg.is_beta == 1){
                    BTCO_POP('当前为测试版，如需更新请点击按钮',function(ID){
                        $('#' + ID[0]).slideToggle();
                        $('#' + ID[1]).click(function(){
                            BTCO_POP('请稍等，正在升级',10000);
                            $.post("/ajax?action=UpdatePanel", { toUpdate: 'yes' }, function(net){
                                if(net.status){
                                    $.post("/system?action=ReWeb", { }, function(net){
                                        if(net.status){
                                            window.location.reload(true)
                                        }else BTCO_POP(net.msg,2000);
                                    });
                                }else BTCO_POP('当前为最新版！',2000);
                            });
                            $('#' + ID[0]).slideToggle();
                            setTimeout(function(){
                                $('#' + ID[0]).remove()
                            },500);
                        });
                        $('#' + ID[2]).click(function(){
                            $('#' + ID[0]).slideToggle();
                            setTimeout(function(){
                                $('#' + ID[0]).remove()
                            },500);
                        });
                    });
                    BTCO_POP('您可在此切换至最新版',function(ID){
                        $('#' + ID[0]).slideToggle();
                        $('#' + ID[1]).click(function(){
                            BTCO_POP('请稍等，正在升级',10000);
                            $.post("/ajax?action=to_not_beta", { }, function(net){
                                if(net.status){
                                    $.post("/ajax?action=UpdatePanel", { check: true }, function(net){
                                        if(net.status){
                                            $.post("/ajax?action=UpdatePanel", { toUpdate: 'yes' }, function(net){
                                                if(net.status){
                                                    BTCO_POP(net.msg,2000);
                                                    $.post("/system?action=ReWeb", { }, function(net){
                                                        if(net.status){
                                                            window.location.reload(true)
                                                        }else BTCO_POP(net.msg,2000);
                                                    });
                                                }else BTCO_POP(net.msg,2000);
                                            });
                                        }else BTCO_POP(net.msg,2000);
                                    });
                                }else BTCO_POP(net.msg,2000);
                            });
                            $('#' + ID[0]).slideToggle();
                            setTimeout(function(){
                                $('#' + ID[0]).remove()
                            },500);
                        });
                        $('#' + ID[2]).click(function(){
                            $('#' + ID[0]).slideToggle();
                            setTimeout(function(){
                                $('#' + ID[0]).remove()
                            },500);
                        });
                    });
                }else {
                    BTCO_POP('当前为最新版，如需更新请点击按钮',function(ID){
                        $('#' + ID[0]).slideToggle();
                        $('#' + ID[1]).click(function(){
                            BTCO_POP('请稍等，正在升级',10000);
                            $.post("/ajax?action=UpdatePanel", { toUpdate: 'yes' }, function(net){
                                if(net.status){
                                    $.post("/system?action=ReWeb", { }, function(net){
                                        if(net.status){
                                            window.location.reload(true)
                                        }else BTCO_POP(net.msg,2000);
                                    });
                                }else BTCO_POP('当前为最新版！',2000);
                            });
                            $('#' + ID[0]).slideToggle();
                            setTimeout(function(){
                                $('#' + ID[0]).remove()
                            },500);
                        });
                        $('#' + ID[2]).click(function(){
                            $('#' + ID[0]).slideToggle();
                            setTimeout(function(){
                                $('#' + ID[0]).remove()
                            },500);
                        });
                    });
                    BTCO_POP('您可在此切换至测试版',function(ID){
                        $('#' + ID[0]).slideToggle();
                        $('#' + ID[1]).click(function(){
                            BTCO_POP('请稍等，正在升级',10000);
                            $.post("/ajax?action=apple_beta", { }, function(net){
                                if(net.status){
                                    $.post("/ajax?action=UpdatePanel", { check: true }, function(net){
                                        if(net.status){
                                            $.post("/ajax?action=UpdatePanel", { toUpdate: 'yes' }, function(net){
                                                if(net.status){
                                                BTCO_POP(net.msg,2000);
                                                $.post("/system?action=ReWeb", { }, function(net){
                                                    if(net.status){
                                                        window.location.reload(true)
                                                    }else BTCO_POP(net.msg,2000);
                                                });
                                            }else BTCO_POP(net.msg,2000);
                                            });
                                        }else BTCO_POP(net.msg,2000);
                                    });
                                }else BTCO_POP(net.msg,2000);
                            });
                            $('#' + ID[0]).slideToggle();
                            setTimeout(function(){
                                $('#' + ID[0]).remove()
                            },500);
                        });
                        $('#' + ID[2]).click(function(){
                            $('#' + ID[0]).slideToggle();
                            setTimeout(function(){
                                $('#' + ID[0]).remove()
                            },500);
                        });
                    });
                }

            });
        });

        $('#BTCO-P4_1').click(function() {
            BTCO_POP('将尝试校验并修复面板程序',function(ID){
                $('#' + ID[0]).slideToggle();
                $('#' + ID[1]).click(function(){
                    BTCO_POP('正在尝试效验模块',5000);
                    setTimeout(function(){
                        $('#' + ID[0]).slideToggle();
                        setTimeout(function(){
                            $('#' + ID[0]).remove()
                        },500);
                    },500);
                    $.post("/system?action=RepPanel", { }, function(net){
                        BTCO_POP('修复成功');
                        window.location.reload()
                    });
                });
                $('#' + ID[2]).click(function(){
                    $('#' + ID[0]).slideToggle();
                    setTimeout(function(){
                        $('#' + ID[0]).remove()
                    },500);
                });
            })
        });

        $('#BTCO-P4_2').click(function() {
            BTCO_POP('重启BT面板服务',function(ID){
                $('#' + ID[0]).slideToggle();
                $('#' + ID[1]).click(function(){
                    BTCO_POP('正在重启',5000);
                    setTimeout(function(){
                        $('#' + ID[0]).slideToggle();
                        setTimeout(function(){
                            $('#' + ID[0]).remove()
                        },500);
                    },500);
                    $.post("/system?action=ReWeb", {}, function(net){
                        if(net.status){
                            BTCO_POP('重启成功');
                            window.location.reload();
                        }else BTCO_POP('正在重启',1500);
                    })
                });
                $('#' + ID[2]).click(function(){
                    $('#' + ID[0]).slideToggle();
                    setTimeout(function(){
                        $('#' + ID[0]).remove()
                    },500);
                });
            })
        });

        $('#BTCO-P4_3').click(function() {
            BTCO_POP('若您的服务器是一个容器，请取消！',function(ID){
                $('#' + ID[0]).slideToggle();
                $('#' + ID[1]).click(function(){
                    BTCO_POP('正在重启',5000);
                    setTimeout(function(){
                        $('#' + ID[0]).slideToggle();
                        setTimeout(function(){
                            $('#' + ID[0]).remove()
                        },500);
                    },500);
                    $.post("/system?action=RestartServer", {}, function(net){
                        if(net.status){
                            BTCO_POP('重启成功')
                            window.location.reload();
                        }else BTCO_POP('重启失败了')
                    })
                });
                $('#' + ID[2]).click(function(){
                    $('#' + ID[0]).slideToggle();
                    setTimeout(function(){
                        $('#' + ID[0]).remove()
                    },500);
                });
            })
        });
        //-----BTCO-> Index(按钮事件区)

        //-----BTCO-> Index(首页图表组件)
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        let chart = Highcharts.chart('BTCO-P5', {
            chart: {
                type: 'spline',
                marginRight: 10,
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgba(255, 255, 255,0)'],
                        [1, 'rgba(240, 240, 255,0)']
                    ]
                }
            },
            credits: {
                text: '由 BTCO 强力驱动',
                href: 'https://lf.tn'
            },
            title: {
                text: null,
                style: {
                    color: "#ffffff",
                    font_weight: "lighter!important",
                }
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: [{
                title: {
                    text: null
                }
            }, {
                title: {
                    text: null
                }
            }],
            tooltip: {
                backgroundColor: 'rgba(115, 115, 115, 0.54)',
                shadow: false,
                borderColor: 'rgba(240, 240, 255,0)',
                borderRadius: 10,
                crosshairs: true,
                style: {
                    color: "#ffffff",
                },
                formatter: function () {
                    return Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2) + 'KB'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                color: '#fff'
            }, {
                name: '',
                data: [],
                color: 'rgba(0, 145, 228, 0.69)'
            }]
        });
        //-----BTCO-> Index(首页图表组件)

        //-----BTCO-> Index
    }
}

// BT
function Tosize(bytes ,is_unit,fixed, end_unit) //字节转换，到指定单位结束 is_unit：是否显示单位  fixed：小数点位置 end_unit：结束单位
    {
        if (bytes == undefined) return 0;

		if(is_unit==undefined) is_unit = true;
		if(fixed==undefined) fixed = 2;
        if (end_unit == undefined) end_unit = '';
       
		if(typeof bytes == 'string') bytes = parseInt(bytes);
		var unit = [' B',' KB',' MB',' GB','TB'];
		var c = 1024;
		for(var i=0;i<unit.length;i++){
			var cUnit = unit[i];				
			if(end_unit)
			{
				if(cUnit.trim() == end_unit.trim())
				{
					var val = i == 0 ? bytes : fixed==0? bytes:bytes.toFixed(fixed)
					if(is_unit){
						return  val + cUnit;
					}
					else{
						val = parseFloat(val);		
						return val;					
					}
				}
			}
			else{
				if(bytes < c){
					var val = i == 0 ? bytes : fixed==0? bytes:bytes.toFixed(fixed)
					if(is_unit){
						return  val + cUnit;
					}
					else{
						val = parseFloat(val);		
						return val;
					}
				}
			}
	
			bytes /= c;
		}
	}