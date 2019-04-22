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

            setTimeout(function(){ GetNetWork() },2000)
        });
    }
}