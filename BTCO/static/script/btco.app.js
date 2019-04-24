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
        if(RunCheck[0] == true) {
            RunCheck = [true,$(this).attr('id'),$(this).text()]
            $(this).text('正在响应');
            setTimeout(function(){ $('#' + RunCheck[1]).text(RunCheck[2]);},1000);
            return;
        }
        if(RunCheck.length !== 0 && RunCheck[1] == $(this).attr('id')){
            $(this).text(RunCheck[0]);
            RunCheck = [true,$(this).attr('id'),$(this).text()]

            

        }else if(RunCheck.length == 0){
            RunCheck = [$(this).text(),$(this).attr('id')];
            $(this).text('确定?');
        }else {
            $('#' + RunCheck[1]).text(RunCheck[0]);
            RunCheck = []
        }
    });

    $('#BTCO-P4_1').click(function() {
        if(RunCheck1[0] == true) {
            RunCheck1 = [true,$(this).attr('id'),$(this).text()]
            $(this).text('正在响应');
            setTimeout(function(){ $('#' + RunCheck1[1]).text(RunCheck1[2]);},1000);
            return;
        }
        if(RunCheck1.length !== 0 && RunCheck1[1] == $(this).attr('id')){
            $(this).text('稍等');
            RunCheck1 = [true,$(this).attr('id'),$(this).text()]

            $.post("/system?action=RepPanel", {}, function(net){
                if(typeof net){

                    $('#' + RunCheck1[1]).text('已修复');
                    setTimeout(function(){ location.reload(true); },2000);

                }else{ 
                    $('#' + RunCheck1[1]).text('失败');
                    setTimeout(function(){ $('#' + RunCheck1[1]).text(RunCheck1[2]);},1000);
                }
            })

        }else if(RunCheck1.length == 0){
            RunCheck1 = [$(this).text(),$(this).attr('id')];
            $(this).text('确定?');
        }else {
            $('#' + RunCheck1[1]).text(RunCheck1[0]);
            RunCheck1 = []
        }
    });

    $('#BTCO-P4_2').click(function() {
        if(RunCheck2[0] == true) {
            RunCheck2 = [true,$(this).attr('id'),$(this).text()]
            $(this).text('正在响应');
            setTimeout(function(){ $('#' + RunCheck2[1]).text(RunCheck2[2]);},1000);
            return;
        }
        if(RunCheck2.length !== 0 && RunCheck2[1] == $(this).attr('id')){
            $(this).text('稍等');
            RunCheck2 = [true,$(this).attr('id'),$(this).text()]

            $.post("/system?action=ReWeb", {}, function(net){
                if(net.status){

                    $('#' + RunCheck2[1]).text('已重启');
                    setTimeout(function(){ window.location.reload(); },2000);

                }else{ 
                    $('#' + RunCheck2[1]).text('失败');
                    setTimeout(function(){ $('#' + RunCheck2[1]).text(RunCheck2[2]);},1000);
                }
            })

        }else if(RunCheck2.length == 0){
            RunCheck2 = [$(this).text(),$(this).attr('id')];
            $(this).text('确定?');
        }else {
            $('#' + RunCheck2[1]).text(RunCheck2[0]);
            RunCheck2 = []
        }
    });

    $('#BTCO-P4_3').click(function() {
        if(RunCheck3[0] == true) {
            RunCheck3 = [true,$(this).attr('id'),$(this).text()]
            $(this).text('正在响应');
            setTimeout(function(){ $('#' + RunCheck3[1]).text(RunCheck3[2]);},1000);
            return;
        }
        if(RunCheck3.length !== 0 && RunCheck3[1] == $(this).attr('id')){
            $(this).text(RunCheck3[0]);
            RunCheck3 = [true,$(this).attr('id'),$(this).text()]

            

        }else if(RunCheck3.length == 0){
            RunCheck3 = [$(this).text(),$(this).attr('id')];
            $(this).text('确定?');
        }else {
            $('#' + RunCheck3[1]).text(RunCheck3[0]);
            RunCheck3 = []
        }
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
            color: '#515151'
        }, {
            name: '',
            data: [],
            color: '#ffffff'
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