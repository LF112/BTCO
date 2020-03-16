<script>

/*
    全局变量
*/
export default {
    Tool: {
        Cookie: ( query ) => {
            let a, c = new RegExp('(^| )' + query + '=([^;]*)(;|$)')
            if(a = document.cookie.match(c))
                return unescape(a[2])
            else return null
        }
    }
}
</script>