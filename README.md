# 这是一个NB的项目

## 牛逼吗？

### 我们是有灵魂的程序员

####  制作首页APP组件
1.完成Header区域，使用的是Mint-UI中的header组件
2.制作底部Tabber区域，使用的是MUI的Tabbar
3.要在中间区域防止一个router-view来展示路由

## 注意： 使用Easy Mock制作假数据，其用户名：Shan，密码：123.asd
## 接口根路径的地址： https://www.easy-mock.com/mock/5c9f427ebfe3a8723f44ffb2/example


## 加载首页轮播图数据 --- 轮播图的后台接口
1.需要点击路径
2.需要图片路径


## 九宫格区域
1.元素图片   ---写死

## 新闻列表页   ----需要后台接口

1.利用mui的list列表组件


2.新闻资讯列表需要接口 ----后台接收ID为参数


## 使用mui.js里面的几个问题
1.必须把webpack里面的严格模式给禁掉（装包）

npm install babel-plugin-transform-remove-strict-mode -D


之后在babelre文件里面配置"transform-remove-strict-mode"

2.由于mmui-tab-item类名和主键有冲突，必须重写mui-tab-item样式


3.必须把加载主键放到mounted钩子函数里面，此钩子函数是当页面组件渲染好之后在加载其里面的JS