<template>
	<div class="topNav">
		<van-nav-bar :title="title"
		left-arrow
		v-if="isShow"
		@click-left="goBack" />
		<van-nav-bar :title="title"
		v-if="!isShow"
		@click-left="goBack" />
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		props: ['title','isShow'],
		methods: {
			goBack() {
				window.history.back()
			}
		}
	}
</script>

<style>
</style>