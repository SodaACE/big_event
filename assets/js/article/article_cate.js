$(function(){
    let layer = layui.layer;
    let form =layui.form;
    initArtCateList();
    function initArtCateList() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                let str = template('tpl-table',res)
                $('tbody').html(str)
            }
        })
    }
    let index = null;
    $('#addArtCate').on('click',function(){
        index = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html()
          });   
    })
    $('body').on('submit','#add-form',function(e){
        e.preventDefault();
        $.ajax({
            url:'/my/article/addcates',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0) {
                    return layer.msg('新增分类失败！');
                }
                initArtCateList()
                layer.msg('新增分类成功！');
                layer.close(index);
            }
        })
    })

    let edit = null;
    $('tbody').on('click','#btnEdit',function(){
        edit = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-edit').html()
          });
          var id = $(this).attr('data-id')
          $.ajax({
            url:'/my/article/cates/'+ id,
            method:'GET',
            data:$(this).serialize(),
            success:function(res){
                form.val('edit-form',res.data)
            }
        })   
    })
    $('body').on('submit', '#edit-form', function(e) {
        e.preventDefault()
        $.ajax({
          method: 'POST',
          url: '/my/article/updatecate',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新分类数据失败！')
            }
            layer.msg('更新分类数据成功！')
            layer.close(edit)
            initArtCateList()
          }
        })
      })
      $('tbody').on('click','#btnDelete',function(){
          let id = $(this).attr('data-id')
          layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除图书失败！')
                    }
                    layer.msg('删除图书成功')
                    initArtCateList();
                    layer.close(index);
                }
            })

          });
      })
})