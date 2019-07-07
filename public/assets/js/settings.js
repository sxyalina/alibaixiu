$('#logo').on('change', function() {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('logo', file);
        $.ajax({
            type: 'post', //get或post
            url: '/upload', //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            processData: false,
            contentType: false,
            success: function(result) { //成功的回调函数
                //console.log(result)
                $('#hiddenLogo').val(result[0].logo)
                $('#preview').attr('src', result[0].logo)
            }
        })
    })
    //表单提交
$('#settingsForm').on('submit', function() {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    $.ajax({
        type: 'post', //get或post
        url: '/settings', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function(result) { //成功的回调函数
            alert('上传成功')
        }
    })
    return false
})

//向服务器发送请求，索要网站设置数据
$.ajax({
    type: 'get', //get或post
    url: '/settings', //请求的地址
    success: function(result) { //成功的回调函数
        //console.log(result) 返回一个对象
        if (result) {
            //将logo地址存储在隐藏域中
            $('#hiddenLogo').val(result.logo)
                //将Logo显示在页面中
            $('#preview').attr('src', result.logo)
                //将网站标题显示在页面中
            $('input[name="title"]').val(result.title)
                //将是否开启评论功能显示在页面中
            $('input[name="comment"]').prop('checked', result.comment)
                //将评论是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked', result.review)
        }
    }
})