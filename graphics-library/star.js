//绘制正五角形
var canvas = target('star');
var context = canvas.getContext('2d');

drawStar(context, canvas.height / 2, canvas.height / 4, canvas.height / 2, canvas.height / 2);

//参数分别为：绘图上下文，大圆半径（长角对应圆心的距离），小圆半径（短角对应圆心距离），横轴偏移，纵轴偏移，旋转（顺时针，可选），描边宽度（可选），描边颜色（可选），填充色（可选）。
function drawStar(ctx, R, r, x, y, rot, lw, s_color, f_color) {
    //设置默认值
    rot = typeof rot !== 'undefined' ? rot : 0;
    ctx.lineWidth = typeof lw !== 'undefined' ? lw : 0;
    ctx.strokeStyle = typeof s_color !== 'undefined' ? s_color : 'transparent';
    ctx.fillStyle = typeof f_color !== 'undefined' ? f_color : '#FEAA00';

    //ctx.lineJoin = 'round';
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
        //每个对应的角相差72°
        //sin和cos需要角度转弧度计算
        //使用三角函数临边比斜边、对边比斜边这样的关系
        ctx.lineTo(Math.cos((18 + i * 72 - rot) * Math.PI / 180) * R + x, -Math.sin((18 + i * 72 - rot) * Math.PI / 180) * R + y);
        ctx.lineTo(Math.cos((54 + i * 72 - rot) * Math.PI / 180) * r + x, -Math.sin((54 + i * 72 - rot) * Math.PI / 180) * r + y);
    }
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}

