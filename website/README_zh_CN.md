# 文档网站

此文档网站使用[Docusaurus 2](https://v2.docusaurus.io/)构建，这是一个现代静态网站生成器，并自动部署到[docs.folotoy.com](https://docs.folotoy.com)。

### 安装

```
$ npm i
```

### 本地开发

```
$ npm start
```

此命令启动本地开发服务器并打开浏览器窗口。大多数更改都会实时生效并且不需要重新启动服务器。

### 构建

```
$ npm run build
```

此命令将静态内容生成到`build`目录中，并可以使用任何静态内容托管服务进行提供。

### 部署

```
$ GIT_USER=<您的GitHub用户名> USE_SSH=true npm run deploy
```

如果您正在使用GitHub Pages进行托管，则此命令是一种方便的方式来构建网站并推送到`gh-pages`分支。