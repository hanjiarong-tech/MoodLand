
<template>
    <div class="top-bar">
      <div class="center">
        <TopItem title="情绪挑战" nav-path="/explore/fight" color="var(--theme-color)"></TopItem>
        <TopItem title="社交游戏" nav-path="/explore/game" color="var(--theme-color)"></TopItem>
        <TopItem title="社交礼物" nav-path="/explore/gift" color="var(--theme-color)"></TopItem>
      </div>
    </div>
</template>


<script>

import TopItem from './TopItem.vue';
export default {
  name: 'Topbar',
  components: {
    TopItem,
  },
  data() {
    return {
      topIndex: 1,
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
  .top-bar {
    // background: #000000;
    z-index: 999;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #686868;
    display: flex;
    box-sizing: border-box;
    position: fixed;
    .center {
      flex: 1;
      display: flex;
      justify-content: center;
      .item {
        flex: 1;
        text-align: center;
        span {
          padding: 2px 0px;
          text-align: center;
          position: relative;
        }
        .active {
          color: #ffffff;
          &:after {
            content: "";
            height: 1px;
            width: 30px;
            left: 3px;
            bottom: -2px;
            position: absolute;
            background: #ffffff;
          }
        }
      }
    }
  }
</style>
