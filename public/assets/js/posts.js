$.ajax({
    type: 'get', //get或post
    url: '/posts', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function(result) { //成功的回调函数
        //console.log(result)
        var html = template('postsTpl', { data: result });
        //console.log(html);
        $('#postsBox').html(html)

    }
});
//处理日期事件格式
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}