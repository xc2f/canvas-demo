var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;

var SCREEN_W = 370;
var SCREEN_H = 670;


//画网格
drawGrid(context, canvas.width / 2, canvas.height / 2, canvas.width, canvas.height, 10);

//轮廓
drawEdge(context, canvas.width / 2, canvas.height / 2, SCREEN_W, SCREEN_H, 27);

//未完待续
drawWWDX(context, canvas.width - 70, canvas.height - 100);
function drawWWDX(ctx, x, y) {
    ctx.font = '17px 微软雅黑';
    ctx.textAlign = 'right';
    ctx.fillText('未完待续', x, y);
    ctx.fillText('Unfinished', x, y + 30);
    ctx.fillText('2017.2.13', x, y + 30 + 30);
}


function drawEdge(ctx, x, y, width, height, r, l_r, t_b, btn_w, btn_h) {
    r = r || 10;
    l_r = l_r || 7;
    t_b = t_b || 55;
    btn_w = btn_w || 50;
    btn_h = btn_h || 25;

    ctx.save();
    ctx.translate(x, y);

    //外壳
    ctx.beginPath();
    //上右圆弧,正的减，负的加，离原点更近；lineTo与圆心x坐标加r
    ctx.arc(width / 2 - r, -height / 2 + r, r, Math.PI * 3 / 2, Math.PI * 2);
    ctx.lineTo(width / 2, height / 2 - r);
    //下右圆弧，y坐标一致;圆心与上一圆心横坐标一致，纵坐标与上一lineTo一致
    ctx.arc(width / 2 - r, height / 2 - r, r, 0, Math.PI / 2);
    ctx.lineTo(-width / 2 + r, height / 2);
    //左下圆弧；圆心横坐标与上一lineTo横坐标一致，纵坐标与上一圆心纵坐标一致
    //lineTo横坐标为圆心横坐标-r,纵坐标与上右圆弧圆心纵坐标一致
    ctx.arc(-width / 2 + r, height / 2 - r, r, Math.PI * 1 / 2, Math.PI);
    ctx.lineTo(-width / 2, -height / 2 + r);
    // 左上圆弧；圆心横坐标与左下圆弧横坐标一致，纵坐标与上一lineTo纵坐标一致
    ctx.arc(-width / 2 + r, -height / 2 + r, r, Math.PI, Math.PI * 3 / 2);
    ctx.closePath();
    ctx.stroke();

    //显示屏边界
    ctx.beginPath();
    ctx.fillRect(-width / 2 + l_r, -height / 2 + t_b, width - l_r * 2, height - t_b * 2);


    //logo
    ctx.font = 'bold 17px Arial';
    ctx.textAlign = 'center';
    //ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#c0c0c0';
    ctx.fillText('DACHOW', 0, -height / 2 + t_b - t_b * 1 / 5);

    //左侧两按钮
    sideBtn(ctx, -width, height, height / 3);
    sideBtn(ctx, -width, height, height / 4);

    //右侧按钮
    sideBtn(ctx, width, height, height / 5);
    try {
        //id为空会报错
        ctx.addHitRegion({ "id": "lockScreen" });
    } catch (e) {
        alert("请在chrome://flags中启用【实验性画布功能】或在firefox中输入about:config使canvas.hitregions.enabled值为true以开启更多功能~~~///(^v^)\\\~~~");
    }


    //听筒，长度为底部按钮长度btn_w*1.5, 高度为1/3*btn_h，半径为btn_h * 1 / 3 / 2
    ctx.beginPath();
    btn_w *= 1.5;
    //右半圆弧
    ctx.arc(btn_w / 2, -height / 2 + t_b / 4, btn_h * 1 / 3 / 2, Math.PI * 3 / 2, Math.PI * 1 / 2);
    ctx.lineTo(-btn_w / 2, -height / 2 + t_b / 4 + btn_h * 1 / 3 / 2)
    ctx.arc(-btn_w / 2, -height / 2 + t_b / 4, btn_h * 1 / 3 / 2, Math.PI * 1 / 2, Math.PI * 3 / 2);
    ctx.closePath();
    ctx.stroke();

    //听筒内部扬声器小点，距左侧为5，递增为7，半径为1
    for (var i = 5; i < btn_w; i += 7) {
        //防止出现上一步递增后的值距btn_w小于5的情况，即本次绘制的点过分靠右（间距小于5）
        if (i + 5 <= btn_w) {
            ctx.beginPath();
            ctx.arc(-btn_w / 2 + i, -height / 2 + t_b / 4, 1, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    //还原btn_w的值
    btn_w /= 1.5;

    //感光圈，距左侧一半宽度的1/4处；高度与扬声器一致；半径为5
    //两个光圈相聚为1个r，即第二个相对于第一个偏移3个r
    ctx.beginPath();
    ctx.arc(-width / 2 + width * 1 / 4, -height / 2 + t_b / 4, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-width / 2 + width * 1 / 4 + 3 * 5, -height / 2 + t_b / 4, 5, 0, Math.PI * 2);
    ctx.fill();

    //前摄像头，距左侧一半宽度的3/4处，半径为7
    ctx.beginPath();
    ctx.arc(-width / 2 + width * 3 / 4, -height / 2 + t_b / 4, 7, 0, Math.PI * 2);
    ctx.fill();

    // 底部按钮
    ctx.beginPath();

    //右边圆弧
    //height / 2 - t_b / 2 + btn_h / 2，手机一半的高度减去手机底部留白一半的高度，即到达底部留白中点，加上按钮一半的高度，即到达按钮底部
    ctx.arc(btn_w / 2, height / 2 - t_b / 2, btn_h / 2, Math.PI * 3 / 2, Math.PI * 1 / 2);
    ctx.lineTo(-btn_w / 2, height / 2 - t_b / 2 + btn_h / 2);
    ctx.arc(-btn_w / 2, height / 2 - t_b / 2, btn_h / 2, Math.PI * 1 / 2, Math.PI * 3 / 2);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#777';
    ctx.stroke();
    try {
        //id为空会报错
        ctx.addHitRegion({ "id": "toggleBtn" });
    } catch (e) {
        alert("请在chrome://flags中启用【实验性画布功能】或在firefox中输入about:config使canvas.hitregions.enabled值为true以开启更多功能~~~///(^v^)\\\~~~");
    }


    ctx.restore();

}


//侧部按钮，高为1/15的机身长度，突出部分为1/70机身宽度
function sideBtn(ctx, width, height, btn_l) {
    ctx.beginPath();
    //从按钮上侧紧挨机身的部分绘制
    ctx.moveTo(width / 2, -btn_l);
    ctx.lineTo(width / 2 + width / 70, -btn_l);
    ctx.lineTo(width / 2 + width / 70, -btn_l + height / 15);
    ctx.lineTo(width / 2, -btn_l + height / 15);
    ctx.closePath();
    ctx.stroke();
}


function drawGrid(ctx, x, y, width, height, size) {
    ctx.save();
    ctx.translate(x, y);
    //ctx.scale(width, height);
    //竖网格
    ctx.beginPath();
    for (var i = width / 2; i >= -width / 2; i -= size) {
        ctx.moveTo(i, -height / 2);
        ctx.lineTo(i, height / 2);
    }
    //横网格
    for (var j = height / 2; j >= -height / 2; j -= size) {
        ctx.moveTo(-width / 2, j);
        ctx.lineTo(width / 2, j);
    }
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.stroke();
    //圆心
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.strokeStyle = '#777';
    ctx.stroke();
    ctx.restore();
}



//获取鼠标指针坐标
function getMousePos(evt, canvas) {
    var rect = document.getElementById('canvas').getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


// 功能说明，接收参数为绘图上下文，横轴偏移、纵轴偏移（箭头中部重合的圆圈为中心点），方向（先上下、后左右），文本，文本颜色，箭头颜色
function funNote(ctx, x, y, dire, text, t_c, s_c) {
    dire = dire || 'top-right';
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.fillStyle = t_c;
    ctx.strokeStyle = s_c;
    ctx.lineWidth = 2;
    if (dire === 'top-right' || dire === 'bottom-left') {
        //fillText不可放在rotate下方
        if (dire === 'top-right') {
            ctx.fillText(text, 30, -30);
        } else if (dire === 'bottom-left') {
            ctx.fillText(text, -30, 45);
            ctx.rotate(Math.PI);
        }
        ctx.moveTo(30, -25);
        ctx.quadraticCurveTo(20, 10, -10, 0);
        ctx.quadraticCurveTo(-30, -10, -10, -15);
        ctx.quadraticCurveTo(0, -10, -10, 0);
        ctx.quadraticCurveTo(-20, 10, -50, 20);
        ctx.lineTo(-45, 10);
        ctx.lineTo(-50, 20);
        ctx.lineTo(-42, 26);
    } else if (dire === 'top-left' || dire === 'bottom-right') {
        if (dire === 'top-left') {
            ctx.fillText(text, -30, -30);
        } else if (dire === 'bottom-right') {
            ctx.fillText(text, 30, 45);
            ctx.rotate(Math.PI);
        }
        ctx.moveTo(-30, -25);
        ctx.quadraticCurveTo(-20, 10, 10, 0);
        ctx.quadraticCurveTo(30, -10, 10, -15);
        ctx.quadraticCurveTo(0, -10, 10, 0);
        ctx.quadraticCurveTo(20, 10, 50, 20);
        ctx.lineTo(45, 10);
        ctx.lineTo(50, 20);
        ctx.lineTo(42, 26);
    }
    ctx.stroke();
    ctx.restore();
}

//交互
(function (ctx, x, y, width, height) {
    var l_r = 7;
    var t_b = 55;
    var btn_w = 50;
    var btn_h = 25;
    var timer = null;
    //控制亮屏后的时间刷新
    var screen_show = false;
    //是否是第一次提示
    var first_show_light_screen = true;
    var first_show_lock_screen = true;

    var lock_img = new Image();
    lock_img.src = 'image/lock.jpg';

    var week = ['日', '一', '二', '三', '四', '五', '六'];

    function showTime() {
        ctx.save();
        ctx.translate(x, y);

        ctx.drawImage(lock_img, -width / 2 + l_r, -height / 2 + t_b, width - l_r * 2, height - t_b * 2);

        ctx.fillStyle = '#fff';
        ctx.font = '55px Tahoma';
        //使字体紧挨屏幕边缘
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        var now = new Date();
        //('0' + now.getMinutes()).slice(-2)，将1、2、...9转换为01、02。。09
        ctx.fillText(now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2), -width / 2 + l_r + 1 / 2 * t_b, -height / 2 + t_b + 1 / 2 * t_b);
        var time_w = ctx.measureText(now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2)).width;

        ctx.font = '17px Tahoma';
        //下面的字体距顶部距离加上了上面时钟和分钟的字体大小，所以字体在基线上面
        ctx.textBaseline = 'bottom';
        //10为随便给的间距，55为时钟分钟的字体大小(‘0’ + num).slice(-2)
        ctx.fillText(now.getMonth() + 1 + '月' + now.getDate() + '日' + ', 星期' + week[now.getDay()], -width / 2 + l_r + 1 / 2 * t_b + time_w + 10, -height / 2 + t_b + 1 / 2 * t_b + 55);
        ctx.restore();
    }

    //解开屏幕说明
    if (first_show_light_screen) {
        funNote(ctx, x + btn_w, y + height / 2 - t_b, 'top-right', '亮屏', '#fff', '#FEAF44');
        first_show_light_screen = false;
    }

    canvas.addEventListener('click', function (event) {
        //显示锁屏
        if (event.region === 'toggleBtn') {
            //熄屏说明
            if (first_show_lock_screen) {
                //height/5为绘制右侧按钮时传给sideBtn的参数，因为坐标原点不同，所以用canvas.height/2去减
                //67、37为箭头的高宽，可以不管
                funNote(ctx, x + width / 2 + 67, canvas.height / 2 - height / 5 + 37, 'bottom-right', '熄屏');
                first_show_lock_screen = false;
            }

            //先执行一次，后面再setinterval
            //不执行明显感觉有停滞
            showTime();
            screen_show = true;
        }
            //熄屏
        else if (event.region === 'lockScreen') {
            screen_show = false;
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid(context, canvas.width / 2, canvas.height / 2, canvas.width, canvas.height, 10);
            drawEdge(context, canvas.width / 2, canvas.height / 2, SCREEN_W, SCREEN_H, 27);
            drawWWDX(context, canvas.width - 70, canvas.height - 100);
        }
    }, false);

    //有问题，当screen_show为false时的定时依然存在，功能已实现
    timer = setInterval(function () {
        if (screen_show) {
            showTime();
        }
    }, 1000);


}(context, canvas.width / 2, canvas.height / 2, SCREEN_W, SCREEN_H))