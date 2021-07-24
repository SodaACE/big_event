$(function(){
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname: function(value){ 
            if(value.trim().length > 6 || value.trim().length === 0){
              return '昵称的长度必须在1~6字符之间';
            }
    }
})
initUserInfo()
function initUserInfo() {
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        success:function(res) {
            if(res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            form.val('formUserInfo',res.data);
        }
    })
}
$('#btnReset').on('click',function(e){
    e.preventDefault();
    initUserInfo();
})
$('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        url:'/my/userinfo',
        method:'POST',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0) {
                return layer.msg("更新用户信息失败")
            }
            layer.msg('更新用户信息成功');
            window.parent.getUserInfo();
        }
    })
})
})