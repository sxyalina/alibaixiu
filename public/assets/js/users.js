$('#userForm').on('submit', function() {
    //获取用户在表单输入的内容并将内容格式化
    var formData = $(this).serialize();
    $.ajax({
        type: 'post', //get或post
        url: '/users', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        //dataType:'json',
        success: function(result) { //成功的回调函数
            //刷新页面
            location.reload();
        },
        error: function() {
            alert('用户添加失败')
        }
    })
    return false; //阻止表单默认提交行为
});
//当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function() {
        var formData = new FormData();
        formData.append('avatar', this.files[0]);
        $.ajax({
            type: 'post', //get或post
            url: '/upload', //请求的地址
            processData: false,
            contentType: false,
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            success: function(result) { //成功的回调函数
                // console.log(result)

                $('#preview').attr('src', result[0].avatar)
                $('#hiddenImg').val(result[0].avatar)
            }
        })
    })
    //$('#avatar').on('change', function() {   })

//向服务器端发送请求，索要用户列表数据
$.ajax({
        type: 'get', //get或post
        url: '/users', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function(result) { //成功的回调函数
            //console.log(result)
            var html = template('userTpl', { data: result });
            $('#userBox').html(html);
        }
    })
    //获取用户Id
$('#userBox').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        //console.log(id);
        $.ajax({
            type: 'get', //get或post
            url: '/users/' + id, //请求的地址
            //data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            //dataType: 'json',
            success: function(result) { //成功的回调函数
                //console.log(result)
                var html = template('modifyTpl', result);
                $('#modifyBox').html(html);
            }
        })
    })
    //为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');
        //console.log(id);
        $.ajax({
            type: 'put', //get或post
            url: '/users/' + id, //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            //dataType:'json',
            success: function(result) { //成功的回调函数
                location.reload();
                //console.log(result);

            }
        })
        return false;
    })
    //点击删除按钮  删除用户
$('#userBox').on('click', '.delete', function() {
        if (confirm('您真的要删除用户吗')) {
            var id = $(this).attr('data-id');
            //console.log(id);
            $.ajax({
                type: 'delete', //get或post
                url: '/users/' + id, //请求的地址
                data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
                dataType: 'json',
                success: function(result) { //成功的回调函数
                    location.reload();
                }
            })

        }
    })
    //批量删除
var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany');

selectAll.on('change', function() {
        var status = $(this).prop('checked');
        if (status) {
            deleteMany.show();
        } else {
            deleteMany.hide();
        }


        //获取所有用户并将用户状态和全选状态一致
        $('#userBox').find('input').prop('checked', status);
    })
    //当用户前面的复选框发生状态改变时
$('#userBox').on('change', '.userStatus', function() {
        var inputs = $('#userBox').find('input');
        if (inputs.length == inputs.filter(':checked').length) {
            //alert('所有用户都是选中的')
            selectAll.prop('checked', true)
        } else {
            //alert('不是所有用户都是选中的')
            selectAll.prop('checked', false)
        }
        if (inputs.filter(':checked').length > 0) {
            deleteMany.show();
        } else {
            deleteMany.hide();
        }
    })
    //为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    //获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    //循环复选框，从复选框元素的身上获取data-id属性的值
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    //console.log(ids);
    if (confirm('您确定要进行批量删除吗')) {
        $.ajax({
            type: 'delete', //get或post
            url: '/users/' + ids.join('-'), //请求的地址
            //data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            //dataType:'json',
            success: function(result) { //成功的回调函数
                location.reload();
            }
        })
    }
});