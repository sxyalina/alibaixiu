//向服务器发送请求，获取文章分类数据
$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        //console.log(result)
        var html = template('categoryTpl', { data: result });
        //console.log(html);
        $('#category').html(html)
    }
})

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
})

$('#addForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post', //get或post
        url: '/posts', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集

        success: function(result) { //成功的回调函数
            location.href = 'posts.html'
        }
    })
    return false
})