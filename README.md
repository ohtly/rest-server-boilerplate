# rest-server-boilerplate

restful api server boilerplate.

本项目逐步将从 helloworld 开始，逐步演化到可供开发者作为模板使用。

## 基本特性

- 使用 babel 支持 es6 语法
- 使用 nodemon 做开发环境的 reload
- 使用 winston 记录日志

## 如何使用

### 启动

安装依赖包：

```
npm i
```

启动开发环境：

```
npm run dev
```

启动生产环境

```
npm start
```

### 日志

日志使用 winston。

#### 开发环境

开发环境，日志使用标准输出打印在屏幕。

默认日志级别为 info，可通过配置文件./log/config.json 设置为 debug

#### 生产环境

日志均写入./log 目录下的对应日志文件。

- ./app.log，一般的 info 级别的日志，供运维日常使用
- ./error.log，仅输出 warn 级别以上日志，供运维日常使用
- ./debug.log，默认不输出，需要 ./log/config.json 设置，供运维和开发诊断问题使用

## 版本历史

- 0.0.4 实现日志功能，区分开发环境和生产环境
- 0.0.3 支持 es6 语法，开发环境支持自动重新加载代码
- 0.0.2 增加 koa-router 以及一个 CRUD 的示例
- 0.0.1 helloworld
