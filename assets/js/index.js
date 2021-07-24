$(function(){
    getUserInfo();
});
let layer = layui.layer;
function getUserInfo() {
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        success:function(res) {
            if(res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！");
            }
            renderAvatar(res.data);
        },

    })
};

function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp" + name);
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let fn = name[0].toUpperCase();
        $('.text-avatar').html(fn).show()
    };
}

$('#out').on('click',function(){
    layer.confirm('确定要退出登录吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token');
        location.href = '/login.html'
        layer.close(index);
      });
})