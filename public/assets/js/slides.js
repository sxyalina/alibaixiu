//当管理员选择文件的时候
$('#file').on('change', function() {
        var file = this.files[0]; //dom对象
        var formData = new FormData();
        formData.append('image', file);
        $.ajax({
            type: 'post', //get或post
            url: '/upload', //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            processData: false,
            contentType: false,
            success: function(result) { //成功的回调函数
                //console.log(result[0].image)
                $('#image').val(result[0].image)
            }
        })
    })
    //当轮播图表单发生提交行为时
$('#slidesForm').on('submit', function() {
    //获取表单数据
    var formData = $(this).serialize();
    //向服务器发送请求，添加表单数据
    $.ajax({
            type: 'post', //get或post
            url: '/slides', //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function() { //成功的回调函数
                location.reload();
            }
        })
        //阻止表单默认提交行为
    return false;
})

//获取轮播图列表
$.ajax({
        type: 'get', //get或post
        url: '/slides', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            var html = template('slidesTpl', { data: result });
            $('#slidesBox').html(html)
        }
    })
    //删除
$('#slidesBox').on('click', '.delete', function() {
    if (confirm('确认删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete', //get或post
            url: '/slides/' + id, //请求的地址
            success: function() { //成功的回调函数
                location.reload()
            }
        })
    }
})