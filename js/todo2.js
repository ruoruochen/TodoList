$(function () {
    load();
    // # 添加Todo回车后在正在进行添加任务
    //     todo的Onkeydown事件
    //         判断是否为空/全为空格
    //             否：
    //                 获取本地存储数据    
    //                 将任务存入本地存储
    //                 保存数据
    //                 渲染页面(包括显示即数字统计)
    $('#todo').keydown(function (e) {
        if (e.code == "Enter") {
            if ($(this).val() == "" || $.trim($(this).val()) == "") {
                alert("请输入任务内容，内容不能为空！");
            } else {
                let local = getData();
                console.log(local);
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                $(this).val("");
                load();
            }
        }
    })

    // # 打钩 改变状态
    // input 的click事件

    // 获取数据
    // 改变某条记录的checked状态
    // 保存数据
    // 渲染页面
    $('ul,ol').on('click', 'input', function () {
        let data = getData();
        let mychecked = $(this).is(':checked');
        let index = $(this).parent().attr("id");
        // console.log(index);
        data[index].done = mychecked;
        saveData(data);
        load();
    })


    // # 删除任务

    //     img 的click 事件
    //     获取数据
    //     删除该条记录
    //     保存数据
    //     渲染页面
    $("ul,ol").on('click', 'img', function () {
        let mydata = getData();
        let index = $(this).parent().attr("id");
        // console.log(index);
        mydata.splice(index, 1);
        saveData(mydata);
        load();
    })

    // 3个函数
    function getData() {
        let data = localStorage.getItem('mylocal');
        if (data != null) {
            // 将JSON文件转为对象（数组）
            return JSON.parse(data);
        }
        else {
            return [];
        }

    }

    function saveData(data) {
        localStorage.setItem("mylocal", JSON.stringify(data));
    }

    function load() {
        // #### 渲染页面
        // 获取数据 设置todo个数 done个数
        // 清空ul ol
        // 遍历JSON.parse数组
        // done true
        // 插入ul中 done++
        // done false
        // 插入ol 中 todo++

        // 更改页面中的todo done个数
        let data = getData();
        let todocount = 0;
        let donecount = 0;
        $('ul,ol').empty();
        $.each(data, function (index, ele) {
            if (ele.done == false) {
                todocount++;
                $("ol").prepend('<li id="' + index + '"><input type="checkbox" class="checkbox"><span>' + ele.title + '</span><img src="image/delete.png"></li>');
            } else {
                donecount++;
                $("ul").prepend("<li id='" + index + "'><input type='checkbox' class='checkbox' checked='checked'><span>" + ele.title + "</span><img src='image/delete.png'</li>");
            }
        })
        $("#todoCount").html(todocount);
        $("#doneCount").html(donecount);
    }

})



// # 打钩 改变状态
//     input 的click事件

//         获取数据
//         改变某条记录的checked状态
//         保存数据
//         渲染页面

// # 删除任务

//     img 的click 事件
//         获取数据
//         删除该条记录
//         保存数据
//         渲染页面