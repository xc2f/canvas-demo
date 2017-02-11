var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;

//画网格
drawGrid(context, canvas.width / 2, canvas.height / 2, canvas.width, canvas.height, 10);
//轮廓
drawEdge(context, canvas.width / 2, canvas.height / 2, 370, 670, 27);

//未完待续
drawWWDX(context, canvas.width - 70, canvas.height - 100);
function drawWWDX(ctx, x, y) {
    ctx.font = '17px 微软雅黑';
    ctx.textAlign = 'right';
    ctx.fillText('未完待续', x, y);
    ctx.fillText('Unfinished', x, y + 30);
    ctx.fillText('2017.2.12', x, y + 30 + 30);
}


function drawEdge(ctx, x, y, width, height, r, l_r, t_b, btn_w, btn_h) {
    r = r || 10;
    l_r = l_r || 7;
    t_b = t_b || 55;

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

    // 底部按钮
    ctx.beginPath();

    btn_w = btn_w || 50;
    btn_h = btn_h || 25;

    //右边圆弧
    //height / 2 - t_b / 2 + btn_h / 2，手机一半的高度减去手机底部留白一半的高度，即到达底部留白中点，加上按钮一半的高度，即到达按钮底部
    ctx.arc(btn_w / 2, height / 2 - t_b / 2, btn_h / 2, Math.PI * 3 / 2, Math.PI * 1 / 2);
    ctx.lineTo(-btn_w / 2, height / 2 - t_b / 2 + btn_h / 2);
    ctx.arc(-btn_w / 2, height / 2 - t_b / 2, btn_h / 2, Math.PI * 1 / 2, Math.PI * 3 / 2);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.stroke();


    //还原上面lineWidth = 2
    ctx.lineWidth = 1;

    //左侧两按钮
    sideBtn(ctx, -width, height, height / 3);
    sideBtn(ctx, -width, height, height / 4);

    //右侧按钮
    sideBtn(ctx, width, height, height / 5);


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

//显示锁屏
canvas.addEventListener('click', function (evt) {
    var mousePos = getMousePos(evt);
    if (context.isPointInPath(mousePos.x, mousePos.y)) {
        //重绘
    }
}, false);