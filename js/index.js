window.addEventListener('load', function() {
    // 1.獲取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];

    // 獲得focus 的寬度
    var w = focus.offsetWidth;
    var ol = focus.children[1];

    // 2.利用定時器自動輪播圖圖片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var tlx = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + tlx + 'px)';
    }, 2000);

    // 等著我們過度完成之後 再去判斷 監聽過渡完成的事件 transitionend
    ul.addEventListener('transitionend', function() {
            //無縫滾動
            if (index >= 3) {
                index = 0;
                //去掉過渡效果 這樣讓我們的ul 快速地跳到目標位置
                ul.style.transition = 'none';
                //利用最新的索引號乘以寬度 去滾動圖片
                var tlx = -index * w;
                ul.style.transform = 'translateX(' + tlx + ' px)';
            } else if (index < 0) {
                index = 2;
                ul.style.transition = 'none';
                ul.style.transform = 'translateX(' + tlx + ' px)';
            }
            // 3.小圈圈跟隨變化
            // 把ol裡面li帶有current類名的選出來去掉類名remove
            ol.querySelector('.current').classList.remove('current');

            // 讓當前索引號的小li加上current add
            ol.children[index].classList.add('current')
        })
        // 4.手指滑動輪播圖

    // 觸摸元素 touchstart: 獲取手指初始座標
    var startX = 0;
    var moveX = 0; //後面我們會使用這個移動距離 所以要定義一個全局變數
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        //手指觸摸時就停止定時器
        clearInterval(timer);
    })

    // 移動手指 touchmove:計算手指的滑動距離 並且移動盒子
    ul.addEventListener('touchmove', function(e) {
        //計算移動距離
        moveX = e.targetTouches[0].pageX - startX;
        //移動盒子: 盒子原來的位置 + 手指移動的距離
        var tlx = -index * w + moveX;
        //手指拖動的時候不需要動畫效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + tlx + 'px)';
        flag = true; //如果用戶手指移動過 我們再去判斷 否則不做判斷效果
        e.preventDefault(); //阻止滾動屏幕的行為
    })

    // 手指離開 根據移動距離去判斷是回談還是播放上下張
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            // (1)如果移動距離大於50像素我們就播放上下張
            if (Math.abs(moveX) > 50) {
                // 如果右滑就是撥放上一張 moveX 是正值
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果左滑就是撥放下一張 moveX 是負值
                    index++;
                }
                var tlx = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + tlx + 'px)';
            } else {
                // (2)如果移動距離小於50像素我們就回彈
                var tlx = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + tlx + 'px)';
            }
        }
        // 手指離開重新開啟定時器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var tlx = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + tlx + 'px)';
        }, 2000);

    })
})