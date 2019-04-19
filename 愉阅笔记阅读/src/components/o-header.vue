<template>
	<div class="wrap-header"
		:class="{shadow: shadow}">
		<div class="wrap-header_inner">
			<div class="wrap-left">
				<span class="wrap-button" v-if="$slots.left || showReturn">
					<span v-if="showReturn" 
								 @click="handleReturnBtn">
						<o-icon name="arrow-left"></o-icon>
					</span>
					<slot name="left"></slot>
				</span>
				<span class="wrap-title" 
					v-if=" $slots.default || title ">
					<slot v-if="!title"></slot>
					{{title}}
				</span>
			</div>
			
			<div class="wrap-middle"
				 v-if=" $slots.middle ">
				<span class="wrap-title">
					<slot v-if="!title" name="middle"></slot>
				</span>
			</div>
			<div class="wrap-right" v-if="$slots.right">
				<span class="wrap-button">
					<slot name="right"></slot>
				</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	props: {
		title: String,
		showReturn: {
			type: Boolean,
			default: false
		},
		shadow: {
			type: Boolean,
			default: true
		}
	},

    methods: {
		handleReturnBtn() {
			this.$router.go(-1);
		}
	}
}
</script>

<style lang='less' scoped>
	.wrap-header{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		border-bottom: 1px solid @dividerColor;
		background: #f7f7fa;
	}
	.wrap-header.shadow{
		box-shadow: @shadow;
		border-bottom: none;
		background: #fff;
	}
	.wrap-header_inner{
		width: 100%;
		padding: 12px 12px;
		display: flex;
		justify-content: space-between;
		align-self: flex-start;
		font-weight: 200;
		& .wrap-left, & .wrap-right{
			display: inline-flex;
			color: #999999;
		}
	    .wrap-button{
			padding: 0 4px;
			cursor: pointer;
			.o-icon{
				font-size: 20px;
			}
			a{
				color: @primaryTextColor;
				font-size: 18px;
				
				text-decoration: none;
				line-height: 1.4em;
				&:visited{
					color: @primaryTextColor;
					
				}
			}
		}

		.wrap-title{
			font-size: 18px;
			padding: 0 6px;
			display: -webkit-box;    
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
			line-height: 1.4em;
		}
	}
	
</style>
