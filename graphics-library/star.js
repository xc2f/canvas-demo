//绘制正五角形
var canvas = target('star');
var context = canvas.getContext('2d');
const MARGIN_LEFT = (canvas.width - Math.cos(18 * Math.PI / 180) * 2) / 2;
//第一次
drawStar(context, canvas.height / 2, MARGIN_LEFT, canvas.height / 2);

//参数分别为：绘图上下文，图形尺寸（长角对应圆心的距离-大圆半径），横轴偏移，纵轴偏移，旋转（顺时针，可选），填充色（可选）。
function drawStar(ctx, r, x, y, rot, f_color) {
    //设置默认值
    var rot = typeof rot !== 'undefined' ? rot : 0;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    //位移变换
    ctx.translate(x, y);
    //旋转
    ctx.rotate(rot * Math.PI / 180);
    //缩放，比例还是？
    ctx.scale(r, r);
    //状态设置
    //ctx.lineWidth = typeof lw !== 'undefined' ? lw : 0;
    //如果线条颜色不为透明，会根据缩放比例显示颜色
    ctx.strokeStyle = typeof s_color !== 'undefined' ? s_color : 'transparent';
    ctx.fillStyle = typeof f_color !== 'undefined' ? f_color : '#FEAA00';
    //绘图
    starPath(ctx);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

function starPath(ctx) {
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
        //每个对应的角相差72°
        //sin和cos需要角度转弧度计算
        //使用三角函数临边比斜边、对边比斜边这样的关系
        //角度转弧度
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180), -Math.sin((18 + i * 72) * Math.PI / 180));
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 0.5, -Math.sin((54 + i * 72) * Math.PI / 180) * 0.5);
    }
    ctx.closePath();
}

//获取canvas默认高度
const C_HEIHT = canvas.height;

document.getElementById('star-control').addEventListener('click', function () {

    var data = document.forms['star'];
    var r = data.elements['star-r'].value;
    var rot = data.elements['star-rot'].value;
    var f_color = data.elements['star-f-color'].value;
    //防止出现输入一个大的实例后，第二次依然很大
    //canvas.height=176，r由120变成100为什么会进入false
    if (canvas.height < r * 2) {
        canvas.height = r * 2;
    } else {
        canvas.height = C_HEIHT;
    }
    console.log(C_HEIHT, canvas.height);
    var margin_l = (canvas.width - Math.cos(18 * Math.PI / 180) * 2) / 2;
    drawStar(context, r, margin_l, canvas.height / 2, rot, f_color);
}, false);

//reset
document.getElementById('star-reset').addEventListener('click', function () {
    canvas.height = C_HEIHT;
    drawStar(context, C_HEIHT / 2, MARGIN_LEFT, C_HEIHT / 2);
}, false);