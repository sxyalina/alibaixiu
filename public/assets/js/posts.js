//获取文章列表
// $.ajax({
//     type: 'get', //get或post
//     url: '/posts', //请求的地址
//     data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
//     success: function(result) { //成功的回调函数
//         //console.log(result)
//         var html = template('postsTpl', result);
//         //console.log(html);
//         $('#postsBox').html(html)
//         var page = template('pageTpl', result);
//         $('#page').html(page)
//     }
// });
//处理日期事件格式
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//如果我们没有传入page，默认会显示第一页
var page = 1 //如果没有切换，默认显示第一页
render();

function changePage(currentPage) {
    page = currentPage;
    render();
}


function render() {
    $.ajax({
        type: 'get', //get或post
        url: '/posts', //请求的地址
        data: {
            page: page
        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function(result) { //成功的回调函数
            // console.log(result)
            var html = template('postsTpl', result);
            //console.log(html);
            $('#postsBox').html(html)
            var page = template('pageTpl', result);
            $('#page').html(page)
        }
    })

}

//向服务器端发送请求，索要分类数据
$.ajax({
        type: 'get', //get或post
        url: '/categories', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            //console.log(result)
            var html = template('categoryTpl', { data: result });
            $('#categoryBox').html(html)
        }
    })
    //当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function() {
        //获取到管理员选择的过滤条件
        var formData = $(this).serialize();
        //向服务器发送请求，根据条件索要文章列表数据
        $.ajax({
            type: 'get', //get或post
            url: '/posts', //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            success: function(result) { //成功的回调函数
                //console.log(result)
                var html = template('postsTpl', result);
                //console.log(html);
                $('#postsBox').html(html)
                var page = template('pageTpl', result);
                $('#page').html(page)
            }
        });
        //阻止表单默认提交行为
        return false
    })
    //删除文章
$('#postsBox').on('click', '.delete', function() {
    if (confirm('确认删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete', //get或post
            url: '/posts/' + id, //请求的地址
            success: function(result) { //成功的回调函数
                location.reload()
            }
        })
    }
})