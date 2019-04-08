# 微信小程序纯css实现刻度尺

最近需要实现一个高度定制的刻度尺，但是网上现成的方案却是极少，最终找到了HaoTian的[wx-scale](https://github.com/mehaotian/wx-scale)。但是没有实现竖向的效果而且刻度范围大时，在安卓机上无法渲染完全（找了很久没有找到原因，猜测是canvas无法在一瞬间同时刻画多个刻度，知道问题的欢迎留言告知）。于是纯css自己实现一个。

### 1.效果图
![w-scale](https://img2018.cnblogs.com/blog/1102129/201904/1102129-20190408163916312-632601654.png)

### 2.使用
在需要引用的json页面添加
```
// index
{
  "navigationBarTitleText": "w-scale",
  "usingComponents": {
    "scale": "/component/w-scale/w-scale"
  }
}
```
然后页面调用
```
<view class='container'>
  <view class='scale-title'>你的体重</view>
  <view class='scale-value'>{{weight}}kg</view> 
  <scale min="30" 
    max="200" 
    int="{{false}}" 
    step="1" 
    fiexNum="60" 
    single="10" 
    h="60" 
    active="{{weight}}" 
    styles="{{styles}}" 
    id="weight"
    bindvalue="bindvalue"></scale>
  
  <view class='scale-title'>你的身高</view>
  <view class='scale-container'>
    <view class='scale-value'>{{height}}cm</view> 
    <view class='scale-view'>
      <scale min="80" 
        max="230" 
        int="{{false}}" 
        step="1" 
        fiexNum="60" 
        single="10" 
        h="40" 
        active="{{height}}" 
        styles="{{styles}}" 
        direction="vertical"
        id="height"
        bindvalue="bindvalue"></scale>
    </view>
  </view>
</view>
```
js
```
Page({

  data: {
    weight: 70,
    height: 180,
    styles: {
      line: '#dbdbdb',
      bginner: '#fbfbfb',
      bgoutside: '#ffffff',
      font: '#404040',
      fontColor: '#404040',
      fontSize: 16
    }
  },

  bindvalue(e) { //滑动回调
    const value = e.detail.value;
    const key = e.currentTarget.id;
    const data = {};
    data[key] = value;
    this.setData(data);
  }
})
```
### 3.参数说明

|参数名|默认值|说明|
|:-:|:-----:| :----: |
|`min`| 0|最小值|
|`max`| 100|最大值|
| `int`| true| 是否开启整数模式|
|`direction `|'vertical'|'vertical' 纵向，'horizontal' 横向|
|`single `|10|单个格子的实际长度（单位px）一般不建议修改|
|`h`| 80|自定义高度，当direction='vertical'时未宽度|
|`active `|（min+max）/2|自定义选中位置 ,有效值min-max|
|`styles `|{...}|自定义卡尺样式|

style选项

|参数名|默认值|说明|
|:-:|:-----:| :----: |
|`line`|#dbdbdb|刻度颜色|
|`bginner`|#fbfbfb|前景色颜色|
| `bgoutside`|#dbdbdb| 背景色颜色|
|`lineSelect `|#6643e7|选中线颜色|
|`fontColor`| #404040|刻度数字颜色|
|`fontSize `|16|字体大小|

[查看完整代码](git@github.com:mydickk/w-scale.git)

如果我的代码对你帮助，请给分start吧。^-^

有不对或者什么问题，都可以留言
