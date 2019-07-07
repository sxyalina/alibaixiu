//从地址栏中获取id
var id = getUrlParams('id');

//向服务器发送请求，获取文章详细信息
$.ajax({
    type: 'get', //get或post
    url: '/posts/' + id, //请求的地址
    success: function(result) { //成功的回调函数
        //console.log(result)
        var html = template('postTpl', result);
        $('#article').html(html)

    }
})

//当点赞按钮发生点击事件时
$('#article').on('click', '#like', function() {
    $.ajax({
        type: 'post', //get或post
        url: '/posts/fabulous/' + id, //请求的地址
        success: function() { //成功的回调函数
            alert('点赞成功')
        }
    })
})

//评论是否经过人工审核
var review;
//获取网站配置信息
$.ajax({
        type: 'get', //get或post
        url: '/settings', //请求的地址
        success: function(result) { //成功的回调函数
            //console.log(result);
            review = result.review;

            //判断管理员是否开启评论功能
            if (result.comment == true) {
                var tpl =
                    `
                    <form>
                        <textarea></textarea>
                        <input type="submit" value="提交评论">
                    </form>
                `;
                $('.comment').html(tpl)
            }
        }
    })
    //评论表单提交
$('.comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();
    var state; //代表评论状态
    if (review == true) {
        state = 0 //要经过人工审核
    } else {
        state = 1 //不需要经过人工审核
    }
    //向服务器端发送请求，执行添加评论操作
    $.ajax({
        type: 'post', //get或post
        url: '/comments', //请求的地址
        data: {
            content,
            post: id,
            state
        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function() { //成功的回调函数
            location.reload()
        },
        error: function() {
            alert('评论失败')
        }
    })
    return false
})