<template>
    <article class="loadAverage">
        <div class="header">
            <i class="el-icon-house"></i>
            <div class="title">平均负载</div>
        </div>
        <div>
            <div>
                <ve-line
                    :data="chartData"
                    height="100%"
                ></ve-line>
            </div>
        </div>
    </article>
</template>

<script>
  export default {
    data: function () {
      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.loadAverage {
    width: 100%;
    margin-top: 10px;
    border-radius: 2px;
    background-color: rgba(81, 81, 81, 0.48);
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
    .header {
        width: 100%;
        padding: 4px;
        display: flex;
        align-items: center;
        background: #303030;
        border-radius: 2px 2px 0 0;
        > i {
            color: #fff;
            font-size: 12px;
            margin: 0 5px;
        }
        > svg {
            width: 12px;
            height: 12px;
            margin: 0 5px;
        }
        .title {
            color: #fff;
            font-size: 12px;
            margin: 3px 0;
        }
    }
    > div:not(.header):not(.footer) {
        width: 100%;
        height: 100%;
        margin-top: 4px;
        padding: 0 2px 4px;
        > div {
            height: 350px;
            padding-top: 25px;
            position: relative;
        }
    }
}
</style>