/**
  min[number] 默认值 0, // 最小值
  max[number] 默认值 100, // 最大值
  int[boolean] 默认值 true, // 是否开启整数模式 ，false为小数模式  整数模式 step最小单位是 1 ，小数模式，step的最小单位是 0.1
  single[number] 默认值 10, // 单个格子的实际长度（单位px）
  h[number] 默认值 0,// 自定义高度 初始值为80
  active[null] 默认值 center ，// 自定义选中位置  （三个值 min, max ,center , 范围内合法数值）
  styles[object]  // 自定义卡尺样式
*/

const defaultStyles = {
  line: '#dbdbdb',   // 刻度颜色
  bginner: '#fbfbfb',  // 前景色颜色
  bgoutside: '#dbdbdb',  // 背景色颜色
  lineSelect: '#6643e7',  // 选中线颜色
  fontColor: '#404040',   // 刻度数字颜色
  fontSize: 16 //字体大小
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 最小值
    min: {
      type: Number,
      value: 0
    },
    //最大值
    max: {
      type: Number,
      value: 100
    },
    // 是否开启整数模式
    int: {
      type: Boolean,
      value: false
    },
    // 每个格子的实际行度 （单位px ，相对默认值）
    single: {
      type: Number,
      value: 10
    },
    // 高度
    h: {
      type: Number,
      value: 80
    },
    scroll: { //是否禁止滚动
      type: Boolean,
      value: true
    },
    direction: { //方向
      type: String,
      value: 'horizontal'
    },
    // 当前选中 
    active: {
      type: null,
      value: '0',
    },
    styles: {
      type: Object,
      value: defaultStyles
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    rul: {},
    windowHeight: 0
  },

  ready() {
    const min = parseInt(this.data.min) || 0;
    const max = parseInt(this.data.max) || 100;
    this.setData({ min, max });
    this.init();
  },

  methods: {
    init() {
      // 设置默认值
      const min = this.data.min || 0;
      const max = this.data.max || 0;
      const grid = (max - min) / 10;
      const styles = Object.assign(defaultStyles, this.data.styles);

      let active = this.data.active;
      if (active < min || active > max) { //默认数字不合理
        active = (min + max) / 2;
      }

      // 默认选中值
      let diff = (active - min) / 10; //移动diff格
      const single = this.data.single; //每个小格子长度
      if (diff < 0 || isNaN(diff) || !diff) diff = 0;
      const centerNum = diff * single * 10;

      this.setData({ grid, styles });
      setTimeout(() => { this.setData({ centerNum }); }, 200)
      //  获取节点信息，获取节点宽度
      var query = this.createSelectorQuery().in(this)
      query.select('#scale-wrapper').boundingClientRect((res) => {
        res.top // 这个组件内 #the-id 节点的上边界坐标
      }).exec((e) => {
        this.setData({ windowWidth: e[0].width });
        this.setData({ windowHeight: e[0].height });
      })
    },

    bindscroll(e) {
      //console.log(e)
      let offset = 0;
      if (this.data.direction == "vertical") {
        offset = e.detail.scrollTop;
      } else {
        offset = e.detail.scrollLeft;
      }

      const min = this.data.min;
      const max = this.data.max;
      const single = this.data.single;
      let value = min + (offset / single);
      if (this.data.int) {
        value = Math.round(value);
        const centerNum = (value - min) * single;
        this.setData({ centerNum })
        if (value > max) value = max;
        this.triggerEvent('value', { value: value });
      } else {
        value = value.toFixed(1);
        if (value > max) value = max;
        this.triggerEvent('value', { value: value })
      }
    }
  }
})
