//获取到浏览器地址栏中的关键字
var key = getUrlParams('key');
//根据搜索关键字调取搜索结果
$.ajax({
    type: 'get', //get或post
    url: '/posts/search/' + key, //请求的地址
    success: function(result) { //成功的回调函数
        //console.log(result)
        var html = template('searchTpl', { data: result });
        //$('.new h3').append(html)
        $('#listBox').html(html)
    }

})