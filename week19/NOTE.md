# 每周总结可以写在这里

### 工具链

一个完整的工具链需要完整的覆盖
开发 调试 测试 发布 问题跟踪 整个流程 在发布阶段我们需要一个发布系统将我们的代码部署到的线上环境

### 发布系统

- publish-tool
- publish-server
- static-server

#### publish-tool

一个发布工具用于在 npm publish script 中调用 将文件提交到 publish-server

#### publish-server

将文件上传到 static-server 服务器上，publish-server 一般会对应着多台 static-server 还可以接入权限系统 对发布内容的权限进行控制

#### static-server

静态服务器 前面配置反向代理服务器来这些静态资源