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

        $('#BTCO-BTPanel_V').text(net.version);
        $("title").html(net.BTTitle);

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