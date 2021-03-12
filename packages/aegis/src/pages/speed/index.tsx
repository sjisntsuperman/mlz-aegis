import styles from './index.less';
import * as echarts from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption
} from 'echarts/components';
import {
  CanvasRenderer
} from 'echarts/renderers';
import {useEffect, useRef} from "react";
import {useRequest} from "@@/plugin-request/request";
import {login} from "@/services";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  BarSeriesOption | LineSeriesOption | TitleComponentOption | GridComponentOption
  >;

export default function IndexPage() {
  const ref = useRef(null)
  useEffect(()=>{
    // 注册必须的组件
    echarts.use(
      [TitleComponent, GridComponent, BarChart, CanvasRenderer]
    );

    var myChart = echarts.init(ref.current);

    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, []);

  const res = useRequest((()=>login()));

  console.log(res);

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div ref={ref} style={{ width: 400, height: 400 }}/>
    </div>
  );
}
