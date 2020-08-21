module.exports = (axios, CryptoJS) => {
    axios.interceptors.response.use(res => {
        if (process.env.NODE_ENV !== 'production')
            console.log(res)

        //-> 解析 BT-CRT
        const DATA = res.data == '' ? '' : res.data
        const requestToken = res.config.headers['x-http-token']
        if (DATA.substring(0, 6) == 'BT-CRT' && requestToken !== undefined) {
            const BT_PWD = requestToken.substring(0, 8) + requestToken.substring(40, 48)
            const Crypto_KEY = CryptoJS.enc.Utf8.parse(BT_PWD)
            const Decrypt_DATA = CryptoJS.AES.decrypt(DATA.substring(6), Crypto_KEY, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.ZeroPadding
            })

            res.data = Decrypt_DATA.toString(CryptoJS.enc.Utf8)
            try {
                const toJson = JSON.parse(res.data)
                if (typeof toJson == 'object') {
                    res.data = toJson
                }
            } catch (e) { }
        }

        return res
    }, (error) => { return Promise.reject(error) })
}