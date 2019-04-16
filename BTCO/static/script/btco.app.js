$(document).ready(function(){
    console.clear();
    console.log('\n %c 🎉BTCO %c https://github.com/LF112/BTCO %c BY%c LF112  \n\n', 'color: #ffffff; background: rgb(0, 145, 228); padding:5px 0;', 'background:rgba(197, 197, 197, 0.89); padding:5px 0;', 'color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;', 'color: rgb(0, 145, 228); background: rgba(49, 49, 49, 0.85); padding:5px 0;');
    
    $('#BTCO-MenuClick').hover(function (){
        $('.BTCO-Menu').fadeIn(500); 
    },function(){
        $('.BTCO-Menu').fadeOut(500);
    });  

})