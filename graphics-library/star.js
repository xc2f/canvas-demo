//绘制正五角形
var canvas_star = target('star');
var context_star = canvas_star.getContext('2d');
const MARGIN_LEFT_STAR = (canvas_star.width - Math.cos(18 * Math.PI / 180) * 2) / 2;

//设置五角形大小placeholder属性
var ph_star_r = document.getElementById('star-r');
ph_star_r.setAttribute('placeholder', ph_star_r.getAttribute('placeholder') + '，默认' + parseInt(canvas_star.height / 2), 10);

//第一次
drawStar(context_star, MARGIN_LEFT_STAR, canvas_star.height / 2, canvas_star.height / 2);

//参数分别为：绘图上下文，横轴偏移，纵轴偏移，图形尺寸（长角对应圆心的距离-大圆半径），旋转（顺时针，可选），填充色（可选）。
function drawStar(ctx, x, y, r, rot, f_color) {
    //设置默认值
    var rot = typeof rot !== 'undefined' ? rot : 0;


    ctx.clearRect(0, 0, canvas_star.width, canvas_star.height);
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

//获取canvas_star默认高度
const C_HEIGHT_STAR = canvas_star.height;

document.getElementById('star-control').addEventListener('click', function () {

    var data = document.forms['star'];
    var r = data.elements['star-r'].value || canvas_star.height / 2;
    var rot = data.elements['star-rot'].value || 0;
    var f_color = data.elements['star-f-color'].value || '#FEAA00';
    //防止出现输入一个大的实例后，第二次依然很大
    //canvas_star.height=176，r由120变成100为什么会进入false
    if (canvas_star.height < r * 2) {
        canvas_star.height = r * 2;
    } else {
        canvas_star.height = C_HEIGHT_STAR;
    }
    console.log(C_HEIGHT_STAR, canvas_star.height);
    var margin_l = (canvas_star.width - Math.cos(18 * Math.PI / 180) * 2) / 2;
    drawStar(context_star, margin_l, canvas_star.height / 2, r, rot, f_color);
}, false);

//reset
document.getElementById('star-reset').addEventListener('click', function () {
    canvas_star.height = C_HEIGHT_STAR;
    drawStar(context_star, MARGIN_LEFT_STAR, C_HEIGHT_STAR / 2, C_HEIGHT_STAR / 2);
}, false);