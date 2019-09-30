import fs from 'fs'
import watch from 'node-watch'
import proxyFactory from './proxy-factory'

// 获取代理工厂的对象
const {
    proxy,
    setTarget
} = proxyFactory();


// 设置config给proxy
const configPath = "config/config.json"

const configChangedHandler = []

function getConfig() {
    let contents = fs.readFileSync(configPath)
    return JSON.parse(contents)
}

function addConfigChangedHandler(handler) {
    configChangedHandler.push(handler)
}

setTarget(getConfig())

// 监听config文件
watch(configPath, { recursive: true }, () => {
    let config = getConfig()
    setTarget(config)
    configChangedHandler.forEach(handler => {
        handler(config)
    })
})

export { proxy as config, addConfigChangedHandler }