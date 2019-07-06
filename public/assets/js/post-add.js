//向服务器发送请求，获取文章分类数据
$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址
    success: function(result) { //成功的回调函数
        //console.log(result)
        var html = template('categoryTpl', { data: result });
        //console.log(html);
        $('#category').html(html)
    }
});

//上传文章封面---当管理员选择文件的时候触发事件
$('#feature').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post', //get或post
        url: '/upload', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        processData: false,
        contentType: false,
        success: function(result) { //成功的回调函数
            //console.log(result)
            $('#thumbnail').val(result[0].cover);
        }
    })
});
//添加文章
$('#addForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post', //get或post
        url: '/posts', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function() { //成功的回调函数
            //文章添加成功跳转到文章列表页面
            location.href = 'posts.html'
        }
    })
    return false
});
//获取浏览器中的id参数
var id = getUrlParams('id');
//当前管理员是在做修改文章操作
if (id != -1) {
    //根据id获取文章的详细信息
    $.ajax({
        type: 'get', //get或post
        url: '/posts/' + id, //请求的地址
        success: function(result) { //成功的回调函数
            $.ajax({
                type: 'get', //get或post
                url: '/categories', //请求的地址
                success: function(categories) { //成功的回调函数
                    result.categories = categories;
                    console.log(result);
                    var html = template('modifyTpl', result);
                    //console.log(html);
                    $('#parentBox').html(html)
                }
            })
        }
    })
}
//从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    // console.log(location.search.substr(1).split('&'));// ["id=5d2000ad416d4b0f841a93f6", "age=30"] 
    var paramsAry = location.search.substr(1).split('&');
    //对数组进行循环
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}

//修改表单提交
$('#parentBox').on('submit', '#modifyForm', function() {
    //获取表单中输入的内容
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put', //get或post
        url: '/posts/' + id, //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function() { //成功的回调函数
            location.href = 'posts.html'
        }
    })
    return false
})