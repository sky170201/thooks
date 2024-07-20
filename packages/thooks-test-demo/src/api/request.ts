import axios from "axios";

// 通过create方法创建实例
const request = axios.create({
    baseURL: '127.0.0.1', // 请求url的默认前缀,
    timeout: 30000,
    responseType: 'json'
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // config 中有我们请求的信息
        // 获取请求的url地址
        const url = config.url
        // 从缓存中读取token值
        const token = localStorage.getItem('token')
        // 当我们缓存中有token则把token添加到请求头中，携带到后端
        if (token) {
            config.headers.token = token
        }
        return config
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

request.interceptors.response.use(
    (res) => {
        // 响应统一处理
        const status = res.data.code || 200
        const message = res.data.message || '未知错误'
        if (status === 401) {
            // 路由跳转
            alert('权限不足')
            return Promise.reject(new Error(message))
        }
        if (status !== 200) {
            alert('错误码' + status + '    ' + message)
            return Promise.reject(new Error(message))
        }
        return res.data
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

const myRequest = (function () {
    // 存储历史请求url
    let hasRequest: (string | never)[] = []
    // 缓存返回结果
    const memery = new Map()
    return function (config) {
        const url: string = config.url
        // 如果对象中存在url则返回对应的value
        if (memery.has(url)) {
            return Promise.resolve(memery.get(url))
        }
        // 如果发起重复请求则忽略
        if (hasRequest.includes(url)) {
            return Promise.reject({ msg: '请求已提交' })
        }
        // 把请求的url放在请求历史记录里
        hasRequest.push(url)
        return request(config).then((res) => {
            // 请求完成后筛选已完成的请求
            hasRequest = hasRequest.filter((item) => item !== url)
            // 保存返回结果
            memery.set(url, res)
            return res
        })
    }
})()


export default request
