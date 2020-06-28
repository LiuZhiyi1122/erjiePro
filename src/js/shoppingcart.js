$('.headerMenu').hover(function () {
    $('.headerList').slideDown()
}, function () {
    $('.headerList').slideUp()
});
//headerNavList
$('.headerNavList').hover(function () {
    // console.log($(this).children('ul'))
    $(this).children('ul').slideDown();
    // console.log($(this));
}, function () {
    $(this).children('ul').slideUp();
});
$('.phone').hover(function () {
    $('.phone').find('.weixin').slideDown();
}, function () {
    $('.phone').find('.weixin').slideUp();
})
const cookieObj = getCookieObj(document.cookie);
// console.log(cookieObj);
if (cookieObj.token) {
    console.log($('.log'));
    $('.log').html(cookieObj.username).css({
        pointerEvents: 'none',
        cursor: 'pointer'
    });
    $('.exit').css('display', 'inline-block')

}
$('.exit').click(function () {
    setCookies('username', cookieObj.username, -1);
    setCookies('uid', cookieObj.id, -1);
    setCookies('token', cookieObj.token, -1);
    window.alert('退出成功！')
    $('.exit').css('display', 'none');
    $('.log').html('登录').css({
        pointerEvents: 'auto',
        cursor: 'pointer'
    });
    window.location.href='./index.html';
})
// 查询购物车商品生成页面
$.ajax({
    type: "get",
    url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
    data: {
        id: cookieObj.uid
    },
    dataType: "json",
    success: function (res) {
        // console.log(res);
        let str = '';
        res.data.forEach(function (item, key) {
            console.log(item);
            str += `
                <li>
                    <div class="choose"><input type="checkbox" name="pitch-on" class="ck"></div>
                    <div class="goods-img">
                        <div class="small-img">
                            <img src="${item.pimg}" alt="">
    
                        </div>
                        <div class="goods-dec">
                            <h4>${item.pname}</h4>
                            <p>颜色：<span>彩色</span></p>
                            <p>尺码：<span>均码</span></p>
                        </div>
    
                    </div>
                    <ul class="goods-num" index="${item.pid}">
                        <li class="price">${item.pprice}</li>
                        <li>
                            <button name="cut-btn">-</button>
                            <input type="text" value="${item.pnum}" class="totalNum">
                            <button name="cut-add">+</button>
                        </li>
                        <li class="totalPrice">${item.pnum*item.pprice}</li>
                        <li>
                            <button class="goods-del">删除</button>
                        </li>
                    </ul>
                </li>`

        })
        $('.car-goods').html(str);
        // 全选框
        $("#selectAll").click(function () {
            $(".ck").prop("checked", $(this).prop("checked"));
            finalPrice();
        })
        $(".ck").click(function () {
            if ($(".ck:checked").length == $(".ck").length) {
                $("#selectAll").prop("checked", true);
            } else {
                $("#selectAll").prop("checked", false);
            }
            finalPrice();
        });

        // 获取删除按钮
        var adel = document.querySelectorAll(".goods-del");
        var aCk = document.querySelectorAll(".ck");
        // console.log(adel);
        for (let i = 0; i < adel.length; i++) {
            adel[i].onclick = function () {
                let id = $(this).parent().parent().attr("index");
                $.ajax({
                    type: "get",
                    url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
                    data: {
                        uid: cookieObj.uid,
                        pid: id
                    },
                    dataType: "dataType",
                });
                $(this).parent().parent().parent().remove();
                aCk[i].checked = false;
                finalPrice();
            }
        }
        // 更新数据，就是在购物车里操作商品的 增改数量，删
        var aMinus = document.querySelectorAll('[name="cut-btn"]');
        var aTxt = document.querySelectorAll(".totalNum");
        var aPlus = document.querySelectorAll('[name="cut-add"]');
        var atotalPrice = document.querySelectorAll('.totalPrice');
        for (let i = 0; i < aMinus.length; i++) {
            // 数量减
            aMinus[i].onclick = function () {
                // 获取id，做添加数据使用
                let id = this.parentNode.parentNode.getAttribute("index");
                if (aTxt[i].value <= 1) {
                    aTxt[i].value = 1;
                    return;
                }
                // aTxt[i].value--;
                // oDiv.className='1111';
                aTxt[i].value = aTxt[i].value-1;
                saveData(id,Number(aTxt[i].value));
                getPrice(i);
                finalPrice();
            }
            // 数量加
            aPlus[i].onclick = function () {
                // 获取id，做添加数据使用
                let id = this.parentNode.parentNode.getAttribute("index");
                aTxt[i].value++;
                saveData(id,Number(aTxt[i].value));
                getPrice(i);
                finalPrice();
            }
            // 手动改数量
            aTxt[i].onchange = function () {
                // 获取id，做添加数据使用
                let id = this.parentNode.parentNode.getAttribute("index");
                if (aTxt[i].value <= 1) {
                    aTxt[i].value = 1;
                }
                saveData(id,Number(aTxt[i].value));
                getPrice(i);
                finalPrice();
            }

        }
        // 修改数量的同时，需要改变单个商品的总价，每个操作都要改，所以封装一下
        function getPrice(i) {
            $(".totalPrice").eq(i).html($(".price").eq(i).html() * aTxt[i].value);
        }
        //数量改变的时候 存入接口的封装
        function saveData(goodsid, goodsnum) {
            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                uid: cookieObj.uid,
                pid: goodsid,
                pnum: goodsnum
            });
        }
        //数量改变的时候 存入接口的封装
        function finalPrice(){
            // 定义一个累加的容器
            var sum = 0;
            for(let i =0;i<aCk.length;i++){
            if(aCk[i].checked){
                // 如果选中了，就把选中的单个小计累加
                sum += Number(atotalPrice[i].innerHTML);
            }
        }
        $("#finalPrice").html(sum);
        }
    }
});
