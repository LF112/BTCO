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
        $('.BTCO-Menu').fadeIn(500); 
    },function(){
        $('.BTCO-Menu').fadeOut(500);
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

    var RunCheck = [],RunCheck1 = [],RunCheck2 = [],RunCheck3 = [];
    $('#BTCO-P4_0').click(function() {
        $(this).text('稍等');
        $.post("/ajax?action=UpdatePanel", {}, function(net){
            $('#BTCO-P4_0').text('更新');

            if(net.msg.is_beta == 1){ 
                $('#BTCO-LF_POP-04').text('您当前为测试版，点击按钮切换或更新');
                $('#BTCO-LF_POP-03').text('更新面板 V' + net.msg.beta.version);
             }else { 
                $('#BTCO-LF_POP-04').text('您当前为最新版，点击按钮切换或更新');
                $('#BTCO-LF_POP-03').text('更新面板 V' + net.msg.version);
             }
            
            $('#BTCO-LF_POP-05').text('正式版');
            $('#BTCO-LF_POP-06').text('测试版');

            $("#BTCO-LF_POP-01").css({display: "block"});
            $("#BTCO-LF_POP-02").fadeIn(500);
            $("#BTCO-LF_POP-05").on('click', function () {
                alert('正在升级');//临时弹窗，待更新弹出组件
                $.post("/ajax?action=UpdatePanel", { toUpdate: 'yes' }, function(net){
                    window.location.reload()
                });
    
            });
            $("#BTCO-LF_POP-06").on('click', function () {
                alert('正在升级');//临时弹窗，待更新弹出组件
                $.post("/ajax?action=UpdatePanel", { check: true }, function(net){
                    window.location.reload()
                });
    
            });
        });
    });

    $('#BTCO-P4_1').click(function() {
        $('#BTCO-LF_POP-03').text('修复面板');
        $('#BTCO-LF_POP-04').text('将尝试校验并修复面板程序，继续吗？');
            
        $('#BTCO-LF_POP-05').text('立即修复');

        $("#BTCO-LF_POP-01").css({display: "block"});
        $("#BTCO-LF_POP-02").fadeIn(500);
        $("#BTCO-LF_POP-05").on('click', function () {
            alert('正在尝试效验模块');//临时弹窗，待更新弹出组件
            $.post("/system?action=RepPanel", { }, function(net){
                window.location.reload()
            });
    
        });
    });

    $('#BTCO-P4_2').click(function() {
        $('#BTCO-LF_POP-03').text('重启面板');
        $('#BTCO-LF_POP-04').text('重启BT面板服务');
            
        $('#BTCO-LF_POP-05').text('重启');

        $("#BTCO-LF_POP-01").css({display: "block"});
        $("#BTCO-LF_POP-02").fadeIn(500);
        $("#BTCO-LF_POP-05").on('click', function () {
            alert('正在重启');//临时弹窗，待更新弹出组件
            $.post("/system?action=ReWeb", {}, function(net){
                if(net.status){
                    window.location.reload();
                }else alert('重启失败了。')//临时弹窗，待更新弹出组件
            })
    
        });
    });

    $('#BTCO-P4_3').click(function() {
        $('#BTCO-LF_POP-03').text('重启服务器');
        $('#BTCO-LF_POP-04').text('若您的服务器是一个容器，请取消！');
            
        $('#BTCO-LF_POP-05').text('重启');

        $("#BTCO-LF_POP-01").css({display: "block"});
        $("#BTCO-LF_POP-02").fadeIn(500);
        $("#BTCO-LF_POP-05").on('click', function () {
            alert('正在重启');//临时弹窗，待更新弹出组件
            $.post("/system?action=RestartServer", {}, function(net){
                if(net.status){
                    window.location.reload();
                }else alert('重启失败了。')//临时弹窗，待更新弹出组件
            })
    
        });
    });
    
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
            href: 'https://btco.lf.tn'
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
            color: '#363636'
        }, {
            name: '',
            data: [],
            color: 'rgba(0, 145, 228, 0.69)'
        }]
    });
}

$('.BTCO-LF_Ghost').on('click', function () {
    $("#BTCO-LF_POP-02").fadeOut(500);
    $('#BTCO-LF_POP-03').text('提示');
    $('#BTCO-LF_POP-04').text('您确定要继续吗');
    $('#BTCO-LF_POP-05').text('确定');
    $('#BTCO-LF_POP-06').text('取消');
    setTimeout(function () {
        $("#BTCO-LF_POP-01").css({display: "none"});
    }, 500);
});

$("#BTCO-LF_POP-06").on('click', function () {
    $("#BTCO-LF_POP-02").fadeOut(500);
    $('#BTCO-LF_POP-03').text('提示');
    $('#BTCO-LF_POP-04').text('您确定要继续吗');
    $('#BTCO-LF_POP-05').text('确定');
    $('#BTCO-LF_POP-06').text('取消');
    setTimeout(function () {
        $("#BTCO-LF_POP-01").css({display: "none"});
    }, 500);
});

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