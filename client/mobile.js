var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;

//画网格
drawGrid(context, canvas.width / 2, canvas.height / 2, canvas.width, canvas.height, 10);
//轮廓
drawEdge(context, canvas.width / 2, canvas.height / 2, 400, 670, 10);

//未完待续
drawWWDX(context, canvas.width - 70, canvas.height - 100);
function drawWWDX(ctx, x, y) {
    ctx.font = '17px 微软雅黑';
    ctx.textAlign = 'right';
    ctx.fillText('未完待续', x, y);
    ctx.fillText('Unfinished', x, y + 30);
    ctx.fillText('2017.2.10', x, y + 30 + 30);
}


function drawEdge(ctx, x, y, width, height, r, l_r, t_b, btn_w, btn_h) {
    r = r || 10;
    l_r = l_r || 12;
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
    ctx.font = 'bold 27px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#777';
    ctx.fillText('Dachow', 0, -height / 2 + t_b);

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
    ctx.stroke();


    ctx.restore();

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