$(function() {
    $('#link_reg').on('click',function(){
        $('.login_box').hide();
        $('.reg_box').show();
    });
    $('#link_login').on('click',function(){
        $('.reg_box').hide();
        $('.login_box').show();
    });
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd:function(value){
        let repwd = $('.reg_box [name = password]').val()
        if(value !== repwd) {
            alert('两次输入的密码不一致！');
        }
        },
    })
    // 为注册行为添加监听事件
    $('#form_reg').on('submit',function(e){
        // 1.阻止表单默认提交行为
        e.preventDefault();
        let data = {username:$('#form_reg [name = username]').val(),password:$('#form_reg [name = password]').val()}
        // 2.发起Ajax请求
        $.post('/api/reguser',data,function(res){
            if(res.status !==0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
        })
        $('#link_login').click();
    })
    //为登录事件添加监听事件
    $('#form_login').on('submit',function(e){
        //1.阻止表单的默认提交行为
        e.preventDefault()

        //2.发起Ajax请求
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('登陆失败！')
                };
                layer.msg('登录成功！');
                localStorage.setItem('token',res.token);
                location.href = 'index.html'
            }
        })
    })
})