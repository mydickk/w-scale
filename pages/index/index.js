// pages/index/index.js
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