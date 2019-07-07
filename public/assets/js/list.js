//获取地址栏中的categoryId参数
var id = getUrlParams('id');

$.ajax({
    type: 'get', //get或post
    url: '/posts/category/' + id, //请求的地址
    success: function(result) { //成功的回调函数
        console.log(result)
        var html = template('listTpl', { data: result });
        $('.new').append(html);
        $('.new h3').html(result[0].category.title)

    }
})