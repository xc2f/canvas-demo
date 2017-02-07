//绘制弯月
var canvas_moon = target('moon');
var context_moon = canvas_moon.getContext('2d');
const MARGIN_LEFT_MOON = canvas_moon.width / 2;

//设置弯月大小placeholder属性
var ph_moon_r = document.getElementById('moon-r');
ph_moon_r.setAttribute('placeholder', ph_moon_r.getAttribute('placeholder') + '，默认' + parseInt(canvas_moon.height / 3), 10);


drawMoon(context_moon, MARGIN_LEFT_MOON, canvas_moon.height/2, canvas_moon.height/3);

// 传入的参数为绘图上下文，横轴偏移，纵轴偏移，半径大小，阴晴圆缺（可选），旋转角度（可选）
function drawMoon(ctx, x, y, r, size, rot) {
    size = size || 3;
    rot = rot || 10;

    ctx.clearRect(0, 0, canvas_moon.width, canvas_moon.height);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot * Math.PI / 180);
    ctx.scale(r, r);
    pathMoon(ctx, size);

    ctx.fillStyle = 'RGB(254,170,0)';
    ctx.strokeStyle = 'transparent';

    ctx.fill();
    //ctx.stroke();
    ctx.restore();
}

function pathMoon(ctx, size) {
    ctx.beginPath();
    ctx.arc(0, 0, 1, 3 / 2 * Math.PI, 1 / 2 * Math.PI);
    //顺时针绘制到1/2π，移动到（0， -1）点继续绘制另一条曲线
    //时刻谨记，y轴上负下正
    ctx.moveTo(0, 1);
    //就此图而言，d是arcTo控制点的横坐标

    //size在0 - 0.5 - 1之间变化，输出d值在+∞ - 0 - (-∞)变化，输入是输出的一个余切函数，即正切的倒数，不取0、1点
    //size范围（0.01，9.99），否则物极必反
    if (size < 0.01) {
        size = 0.01;
    }
    if (size > 9.99) {
        size = 9.99;
    }
    //除以10以适应后面的计算
    size /= 10;
    var d = 1 / Math.tan(size * Math.PI);

    //运用两个直角三角形正切函数计算
    //arcTo半径参数不能为负
    console.log(1 * dis(0, d, -1, 0) / Math.sqrt(Math.pow(d, 2)))
    ctx.arcTo(d, 0, 0, -1, 1 * dis(0, d, -1, 0) / Math.sqrt(Math.pow(d, 2)));

    ctx.closePath();
}

function dis(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

//获取canvas_star默认高度
const C_HEIGHT_MOON = canvas_moon.height;

document.getElementById('moon-control').addEventListener('click', function () {
    var data = document.forms['moon'];
    var r = data.elements['moon-r'].value || canvas_moon.height / 3;
    var rot = data.elements['moon-rot'].value || 10;
    var size = data.elements['moon-s'].value || 3;

    //防止出现输入一个大的实例后，第二次依然很大
    if (canvas_moon.height < r * 2) {
        canvas_moon.height = r * 2;
    } else {
        canvas_moon.height = C_HEIGHT_MOON;
    }
    drawMoon(context_moon, MARGIN_LEFT_MOON, canvas_moon.height / 2, r, size, rot);
}, false);

//reset
document.getElementById('moon-reset').addEventListener('click', function () {
    canvas_moon.height = C_HEIGHT_MOON;
    drawMoon(context_moon, MARGIN_LEFT_MOON, canvas_moon.height / 2, canvas_moon.height / 3);;
}, false);