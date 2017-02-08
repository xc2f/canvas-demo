var canvas_clock = target('clock');
var context_clock = canvas_clock.getContext('2d');

//设置表盘大小placeholder属性
var ph_clock_r = document.getElementById('clock-size');
ph_clock_r.setAttribute('placeholder', ph_clock_r.getAttribute('placeholder') + '，默认' + parseInt(canvas_clock.height / 2), 10);

var clock = {
    r: canvas_clock.height / 2,
    fc: '#007ACC',
    sc: '#fff',
    s_sc: '#fff',
    m_sc: '#fff',
    h_sc: '#fff'
}
var cp_clock = {};
for (var i in clock) {
    if (clock.hasOwnProperty(i)) {
        cp_clock[i] = clock[i];
    }
}
var clearvar = {};


drawClock(context_clock, canvas_clock.width / 2, canvas_clock.height / 2)

//绘图上下文、横轴偏移、纵轴偏移、半径、填充色、刻度色、时针色、分针色、秒针色、是否有边框、时间设置
function drawClock(ctx, x, y, r, fc, sc, h_sc, m_sc, s_sc, has_b, time) {
    r = r || clock.r;
    fc = fc || clock.fc;
    sc = sc || clock.sc;
    s_sc = s_sc || clock.s_sc;
    m_sc = m_sc || clock.m_sc;
    h_sc = h_sc || clock.h_sc;
    has_b = typeof has_b !== 'undefined' ? has_b : false;

    //每次调用drawClock函数都会新建一个default_clock
    clearvar.default_clock = setInterval(function () {
        ctx.clearRect(0, 0, canvas_clock.width, canvas_clock.height);
        //写刻度值，strokeText()会及时写出数字，因此不能放在缩放状态里面
        clockNumber(ctx, x, y, r, fc, sc, has_b);
        // 刻度针
        clockTick(ctx, x, y, r, h_sc, m_sc, s_sc, time);
    }, 50);

}

function clockNumber(ctx, x, y, r, fc, sc, has_b) {
    ctx.save();
    ctx.translate(x, y);


    //绘制圆盘
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    if (has_b) {
        ctx.strokeStyle = sc;
        ctx.stroke();
    }
    ctx.fillStyle = fc;
    ctx.fill();

    //绘制数字
    r *= 0.9;
    deg = 30;
    ctx.strokeStyle = sc;
    for (var i = 1; i < 13; i++) {
        ctx.strokeText(i, r * Math.sin(deg * Math.PI / 180), -r * Math.cos(deg * Math.PI / 180));
        deg += 30;
    }
    ctx.restore();
}

function clockTick(ctx, x, y, r, h_sc, m_sc, s_sc, time) {
    ctx.save();
    ctx.translate(x, y);

    //如果设定了时间，使用自定义时间
    if (time) {
        var s = 0;
        var h_m = time.split(':');
        var h = parseInt(h_m[0]);
        var m = parseInt(h_m[1]);

        var current = {
            getSeconds: function () {
                return 0;
            },
            getMinutes: function () {
                return m;
            },
            getHours: function () {
                return h;
            }
        };
    } else {
        var current = new Date();
    }

    //秒
    ctx.beginPath();
    r *= 0.7;
    var seconds = current.getSeconds();
    ctx.moveTo(0, 0);
    ctx.lineTo(r * Math.sin(seconds * 6 * Math.PI / 180), -r * Math.cos(seconds * 6 * Math.PI / 180))
    ctx.strokeStyle = s_sc;
    ctx.stroke();

    //分
    ctx.beginPath();
    //r在上面0.7的程度上再乘0.7
    r *= 0.7;
    var minutes = current.getMinutes();
    ctx.moveTo(0, 0);
    ctx.lineTo(r * Math.sin(minutes * 6 * Math.PI / 180), -r * Math.cos(minutes * 6 * Math.PI / 180))
    ctx.strokeStyle = m_sc;
    ctx.lineWidth = 2;
    ctx.stroke();

    //时
    var hours = current.getHours();
    if (hours >= 12) {
        hours -= 12;
    }
    ctx.beginPath();
    r *= 0.7;
    ctx.moveTo(0, 0);
    //hours + (minutes / 6 * 0.1)
    //模拟时钟随着分钟的节奏递增
    //每6分钟使时钟刻度加0.1
    ctx.lineTo(r * Math.sin((hours + (minutes / 6 * 0.1)) * 30 * Math.PI / 180), -r * Math.cos((hours + (minutes / 6 * 0.1)) * 30 * Math.PI / 180));
    ctx.strokeStyle = h_sc;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

}


document.getElementById('clock-control').addEventListener('click', function () {
    var data = document.forms['clock'];
    clock.r = data.elements['clock-size'].value || clock.r;
    clock.fc = data.elements['clock-fc'].value || clock.fc;
    clock.sc = data.elements['clock-sc'].value || clock.sc;
    clock.h_sc = data.elements['clock-h-sc'].value || clock.h_sc;
    clock.m_sc = data.elements['clock-m-sc'].value || clock.m_sc;
    clock.s_sc = data.elements['clock-s-sc'].value || clock.s_sc;
    var has_b = data.elements['clock-has-b'].checked;
    var time = data.elements['clock-time'].value;

    console.log(time);
    //清除上一次建立的default_clock
    clearInterval(clearvar.default_clock);
    drawClock(context_clock, canvas_clock.width / 2, canvas_clock.height / 2, clock.r, clock.fc, clock.sc, clock.h_sc, clock.m_sc, clock.s_sc, has_b, time);
}, false);

//reset
document.getElementById('clock-reset').addEventListener('click', function () {
    for (var i in cp_clock) {
        if (cp_clock.hasOwnProperty(i)) {
            clock[i] = cp_clock[i];
        }
    }
    clearInterval(clearvar.default_clock);
    drawClock(context_clock, canvas_clock.width / 2, canvas_clock.height / 2)
}, false);