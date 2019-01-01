<template>
  <i 
    :class="'icon-' + iconType" 
    class="iconfont"/>
</template>
<script>
export default {
  props: {
    type:{
      type:String,
      default:""
    }
  },
  computed: {
    iconType() {
      return this.type || ''
    }
  }
}
</script>
<style lang="less" scoped>
	.icon-sortdescending-red-copy{
		color:red;
	}
	.icon-sortascending-green-copy{
		color: green;
	}
</style>

