//当添加分类表单发生提交行为的时候---添加分类目录
$('#addCategory').on('submit', function() {
    var formData = $(this).serialize();
    //向服务器端发送请求
    $.ajax({
        type: 'post', //get或post
        url: '/categories', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        //dataType:'json',
        success: function(result) { //成功的回调函数
            location.reload();
        }
    })
    return false;
});

//发送ajax请求，向服务器端获取所有分类列表数据
$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址
    //data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success: function(result) { //成功的回调函数
        //console.log(result)
        var html = template('categoryListTpl', { data: result });
        $('#categoryBox').html(html);
    }
});

//编辑分类----点击编辑获取要编辑的信息并展示在修改界面
$('#categoryBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    //console.log(id);
    //根据id获取分类信息
    $.ajax({
        type: 'get', //get或post
        url: '/categories/' + id, //请求的地址
        //data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        //dataType:'json',
        success: function(result) { //成功的回调函数
            //console.log(result)
            var html = template('modifyCategoryTpl', result);
            $('#formBox').html(html);
        }
    })
})

//为修改用户表单添加表单修改提交事件
$('#formBox').on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put', //get或post
        url: '/categories/' + id, //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        //dataType: 'json',
        success: function(result) { //成功的回调函数
            //console.log(result)
            location.reload()
        }
    })
    return false
});

//删除
$('#categoryBox').on('click', '.delete', function() {

    if (confirm('您确定要删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete', //get或post
            url: '/categories/' + id, //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                location.reload()
            }
        })
    }
});