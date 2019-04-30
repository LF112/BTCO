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

function RunApp(){
    $('#BTCO-MenuClick').hover(function (){
        $('.BTCO-Menu').slideToggle(350);; 
    },function(){
        $('.BTCO-Menu').slideToggle(350);;
    });  

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

    $.post("/plugin?action=a&name=btco&s=BT_index", {}, function(net){

        if(net.check.code == -2 || net.check.code == -1){
            $('#BTCO-BTPanel_Check').text('Free');
            $('#BTCO-BTPanel_Check').css('background-color','#8c8c8c');
        }

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
        $('#BTCO-BTPanel_V').text(net.version);
        $("title").html(net.BTTitle);

    });

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
        BTCO_POP('将尝试校验并修复面板程序，继续吗？',function(ID){
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

    //----- BTCO Pjax
    
    $("#BTCO-href_Config").click(function() {
        var This = 'config';
        $("main").empty();
        $.ajax({
            url: "./static/other/" + This + ".html",
            timeout: 60,
            success: function(html) {
                $("main").html(html)
                //----- BTCO PanelSSL
                $("#BTCO-PanelSSL").on("click", function() {
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
            },
            error: function(ex) {
                $("main").html('<div>抱歉，页面请求失败了！</div>')
            }
        })
    });
    
    //----- BTCO Pjax

    $(".BTCO-LF_switch").on("click", function() {
        $(this).hasClass("BTCO-LF_switch-click") ? $(this).removeClass("BTCO-LF_switch-click") : $(this).addClass("BTCO-LF_switch-click")
    });
    
    //----- BTCO POP
    function BTCO_POP(Content,callback){
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
        if(typeof callback === 'function'){
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
        if(typeof callback === 'function'){
            callback([BoxID, CheckID, CloseID])
        }else{
            if(typeof callback === 'undefined') callback = 1500;
            $('#' + BoxID).slideToggle();
            setTimeout(function(){
                $('#' + BoxID).slideToggle();
                setTimeout(function(){
                    $('#' + BoxID).remove()
                },500);                
            },callback)
        }
    }
    //----- BTCO POP
    
    GetNetWork();

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

            setTimeout(function(){ GetNetWork() },2000)
        });
    }

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