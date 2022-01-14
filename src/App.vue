<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
	.lizi{
		position: absolute;
		width:100%;
		height:100%;
		z-index:-1;
		}
::-webkit-scrollbar
{
    width:10px;
    height:10px;
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(61, 61, 61, 0.2);
    border-radius:10px;
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(59, 59, 59, 0.2);
    background-color:#7c7c7c;
}
	[v-cloak] {
		display: none !important;
	}
</style>
<script>
	document.title = "DLNU门诊挂号系统";
</script>