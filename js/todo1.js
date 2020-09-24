$(function () {
    //     # 添加Todo回车后在正在进行添加任务
    //     todo的Onkeydown事件
    //         向todolist添加li
    $('#todo').keydown(function (e) {
        if (e.code == 'Enter') {
            if ($(this).val() == "" || $.trim($(this).val()) == "") {
                alert("请输入任务内容，任务不能为空！");
            } else {
                // 创建对象
                // let $myli = '<input type="checkbox" class="checkbox"><span>' + $(this).val() + '</span><a href="#"><img src="image/delete.png"></a>';
                // 插入
                $("ol").prepend('<li><input type="checkbox" class="checkbox"><span>' + $(this).val() + '</span><img src="image/delete.png"></li>');
                // $(myli).appendTo($('ol'));
                $(this).val("");
                let todo = parseInt($('#todoCount').html());
                $('#todoCount').html(todo + 1);
            }
        }

    })

    // # 打钩后进入状态变化
    //     checkbox.onclick 判断状态变化
    //         check 放入已完成
    //         uncheck 放入正在进行
    //         todoCount doneCount变化
    $('ul,ol').on('click', 'input', function () {
        // Jquery判断
        // console.log($(this).is(':checked'));

        // js判断
        // console.log(this.checked);
        let done = parseInt($('#doneCount').html());
        let todo = parseInt($('#todoCount').html());
        console.log(done + " " + todo);

        if (this.checked) {
            $("ul").prepend($(this).parent());
            $('#doneCount').html(done + 1);
            $('#todoCount').html(todo - 1);
        } else {
            $("ol").prepend($(this).parent());
            $('#doneCount').html(done - 1);
            $('#todoCount').html(todo + 1);
        }


    })

    // # 删除按钮
    //     img的onclick
    //         
    $("ul,ol").on('click', 'img', function () {
        console.log($(this).siblings('input').is(':checked'));

        if ($(this).siblings('input').is(':checked') == true) {
            let done = parseInt($('#doneCount').html());
            $('#doneCount').html(done - 1);
        } else {
            let todo = parseInt($('#todoCount').html());
            $('#todoCount').html(todo - 1);
        }
        $(this).parent().remove();
    })
})