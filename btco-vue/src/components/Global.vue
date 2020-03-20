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
        },
        Tosize: (bytes, is_unit = true, fixed = 2, end_unit = '') => {
            if (bytes == undefined) return 0
            if (is_unit == undefined) is_unit = true
            if (fixed == undefined) fixed = 2
            if (end_unit == undefined) end_unit = ''
            if (typeof bytes == 'string') bytes = parseInt(bytes)

            let unit = [' B', ' KB', ' MB', ' GB', 'TB'],
                c = 1024

            for (var i = 0; i < unit.length; i++) {
                let cUnit = unit[i]
                if (end_unit) {
                    if (cUnit.trim() == end_unit.trim()) {
                        let val = i == 0 ? bytes : fixed == 0 ? bytes : bytes.toFixed(fixed)
                        if (is_unit) return val + cUnit
                        else return val = parseFloat(val)
                    }
                } else {
                    if (bytes < c) {
                        let val = i == 0 ? bytes : fixed == 0 ? bytes : bytes.toFixed(fixed)
                        if (is_unit) return val + cUnit;
                        else return val = parseFloat(val)
                    }
                }
                bytes /= c
            }
        }
    }
}
</script>