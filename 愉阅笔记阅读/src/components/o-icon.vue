<template>
  	<i  class="o-icon fa"
	    :class="'fa-'+name"
	    :style="{
		   fontSize: size + 'px',
		   color: color
	    }"
		@click="handleIcon"></i>
</template>

<script type="text/javascript">
export default {
	

  	props: {
  		name:{
  			type: String,
  			required: true
		},
		size: {
			type: Number
		},
		color: {
			type: String
		},
		link: {
			type: String
		}
  	},
	methods: {
		handleIcon(){
            if(this.link) this.$router.push(this.link)
        }
	}
}
</script>

<style lang="less">
@import url("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css");
</style>
