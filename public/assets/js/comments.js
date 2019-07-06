//向服务器发送请求，获取评论列表
$.ajax({
    type: 'get', //get或post
    url: '/comments', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        var html = template('commentsTpl', result);
        //console.log(html);
        $('#commentsBox').html(html);
        var pageHtml = template('pageTpl', result);
        $('#pageBox').html(pageHtml)

    }
})

//实现分页
function changePage(page) {
    $.ajax({
        type: 'get', //get或post
        url: '/comments', //请求的地址
        data: {
            page: page
        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            var html = template('commentsTpl', result);
            //console.log(html);
            $('#commentsBox').html(html);
            var pageHtml = template('pageTpl', result);
            $('#pageBox').html(pageHtml)

        }
    })

}
//审核操作
$('#commentsBox').on('click', '.status', function() {
    //获取评论状态
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    // alert(status)
    $.ajax({
        type: 'put', //get或post
        url: '/comments/' + id, //请求的地址
        data: {
            state: status == 0 ? 1 : 0
        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            location.reload()
        }
    })
})

//删除操作
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('确认删除')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete', //get或post
            url: '/comments/' + id, //请求的地址
            success: function() { //成功的回调函数
                location.reload()
            }
        })
    }
})