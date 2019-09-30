# rest-server-boilerplate

restful api server boilerplate.

本项目将从 helloworld 开始，逐步演化到可供开发者作为模板使用。

## 目录

<!--ts-->

- [基本特性](#基本特性)
- [如何使用](#如何使用)
  - [启动](#启动)
    - [启动开发环境](#启动开发环境)
    - [启动生产环境](#启动生产环境)
  - [日志](#日志)
    - [基本使用](#基本使用)
    - [开发环境](#开发环境)
    - [生产环境](#生产环境)
- [版本历史](#版本历史)
  <!-- Added by: marshal, at: 2019年 9月28日 星期六 20时01分31秒 CST -->
  <!--te-->

## 基本特性

- 使用 babel 支持 es6 语法
- 使用 nodemon 做开发环境的 reload
- 使用 winston 记录日志，并可在运行时打开和关闭 debug 日志
- docker 的支持，生成 docker 镜像，并作为容器部署
- 进程退出的处理机制

## 如何使用

### 启动

安装依赖包：

```
npm i
```

#### 启动开发环境

启动：

```
npm run dev
```

#### 启动生产环境

编译：

```
npm run build
```

启动：

```
npm start
```

### 日志

日志使用 winston。

#### 基本使用

引用和记录日志：

```js
import { logger } from "./logger";

logger.error("..");
logger.warn("..");
logger.info("..");
logger.debug("..");
```

动态设置 debug 日志：

```js
import { logger, setDebug } from "./logger";

setDebug(true);
```

#### 开发环境

开发环境，日志使用标准输出打印在屏幕。

默认日志级别为 info，可通过配置文件./log/config.json 设置为 debug

#### 生产环境

日志均写入./log 目录下的对应日志文件。

- ./app.log，一般的 info 级别的日志，供运维日常使用
- ./error.log，仅输出 warn 级别以上日志，供运维日常使用
- ./debug.log，默认不输出，需要 ./log/config.json 设置，供运维和开发诊断问题使用

### docker 的使用

需要创建 docker hub 帐号，然后登录，`docker login`

- 这个步骤不是必须的，需要 push 镜像到 docker 时需要
- 以下示例假定使用了 docker hub

构建镜像：

```
docker build -t YOUR_DOCKER_USER_NAME/rest-server .
```

构建成功后，可将构建的本地镜像 push 到 docker hub：

```
docker push YOUR_DOCKER_USER_NAME/rest-server
```

然后，可以将 docker hub 上的镜像 pull 下来：

```
docker pull YOUR_DOCKER_USER_NAME/rest-server
```

运行镜像：

```
docker run -p 3000:3000 -it --init -u "node"  YOUR_DOCKER_USER_NAME/rest-server
```

docker 的使用参考了[Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)

## 版本历史

- 0.0.7 增加进程退出的处理机制
- 0.0.6 增加 docker 部署方式，参考[Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
- 0.0.5 增加编译代码命令，生成生产用代码，并实现运行时切换日志 debug 模式功能
- 0.0.4 实现日志功能，区分开发环境和生产环境
- 0.0.3 支持 es6 语法，开发环境支持自动重新加载代码
- 0.0.2 增加 koa-router 以及一个 CRUD 的示例
- 0.0.1 helloworld
