```
new Star({
	el:'#main',
	number:5,//一共有几颗星
	starNumber:3.5,//默认选择几颗星
	isHalf:true,//是否需要显示半星
	starSize:26,//星的大小,填写的值为font-size
	color:'orange',//星的颜色
	success:function(number){//选择完毕回调
		console.log('选择评分为：',number)
	}
})
```