//向服务器发送请求，索要随机推荐数据
$.ajax({
        type: 'get', //get或post
        url: '/posts/random', //请求的地址
        success: function(result) { //成功的回调函数
            //console.log(result)
            var randomTpl =
                `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
            </a>
        </li>
        {{/each}}
        `;
            var html = template.render(randomTpl, { data: result });
            $('#randomBox').html(html)

        }
    })
    //向服务器发送请求，索要最新评论数据
$.ajax({
        type: 'get', //get或post
        url: '/comments/lasted', //请求的地址
        success: function(result) { //成功的回调函数
            //console.log(result)
            var commentTpl =
                `
        {{each data}}
        <li>
           <a href="javascript:;">
            <div class="avatar">
                <img src="uploads/avatar_1.jpg" alt="">
            </div>
            <div class="txt">
                <p>
                    <span>alina</span>{{$value.createAt.split('T')[0]}}说:
                </p>
                <p>{{$value.content.substr(0,10)}}</p>
            </div>
            </a>
         </li>
         {{/each}}
        `;
            var html = template.render(commentTpl, { data: result });
            $('#commentBox').html(html)

        }
    })
    //导航
$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址
    success: function(result) { //成功的回调函数
        //console.log(result)
        var navTpl = `
        {{each data}}
        <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(navTpl, { data: result });
        $('#navBox').html(html)
        $('#topNavBox').html(html)
    }
})

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


//搜索
$('.search form').on('submit', function() {
    var keys = $(this).find('.keys').val();
    location.href = "/search.html?key=" + keys
    return false;
})