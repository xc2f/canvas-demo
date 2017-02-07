var canvas_menu = target('menu');
var context_menu = canvas_menu.getContext('2d');

var menu = {
    width: 50,
    height: 30,
    lw: 5,
    sc: '#fff',
    fc: '#007acc',
    border: true
};

//得到menu初始设置reset用
var cp_menu = {};
for (var i in menu) {
    if (menu.hasOwnProperty(i)) {
        cp_menu[i] = menu[i];

    }
}

drawMenu(context_menu, canvas_menu.width / 2, canvas_menu.height / 2);

// 绘图上下文，左右偏移，上下偏移，图标宽度，图标高度，线宽， 描线颜色，填充颜色，是否有边框(默认true)
function drawMenu(ctx, x, y, init, width, height, lw, sc, fc, border) {
    width = width || menu.width;
    height = height || menu.height;
    lw = lw || menu.lw;
    sc = sc || menu.sc;
    fc = fc || menu.fc;
    init = init || 0;
    //用上面的方法会导致总是true
    border = typeof border !== 'undefined' ? border : menu.border;


    //因为下面有背景填充动作，故不能放在menuPath()内
    context_menu.clearRect(0, 0, canvas_menu.width, canvas_menu.height);

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(width, height);

    menuPath(ctx, init, border);

    ctx.fillStyle = fc;
    ctx.fillRect(-1.5, -2, 3, 4);

    ctx.restore()

    ctx.strokeStyle = sc;
    ctx.lineWidth = lw;
    
    ctx.lineCap = 'round';
    ctx.stroke();

}

// 绘图上下文，动画时的渐变，是否有边框
function menuPath(ctx, init, border) {
    //context_menu.clearRect(0, 0, canvas_menu.width, canvas_menu.height);
    ctx.beginPath();
    ctx.moveTo(-1, 0);
    ctx.lineTo(1, 0);
    ctx.moveTo(-1, -1 + init);
    ctx.lineTo(1 - init, -1);
    ctx.moveTo(-1, 1 - init);
    ctx.lineTo(1 - init, 1);
    ctx.closePath();

    //绘制边框
    if (border) {
        ctx.moveTo(-1.5, -2);
        ctx.lineTo(-1.5, 2);
        ctx.lineTo(1.5, 2);
        ctx.lineTo(1.5, -2);
        ctx.closePath();
    }
}

//获取鼠标指针坐标
function getMousePos(evt) {
    var rect = canvas_menu.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var enter_menu = true;
//监听鼠标移动
canvas_menu.addEventListener("mousemove", function (evt) {
    var mousePos = getMousePos(evt);
    //如果鼠标进入到图标部分
    if (context_menu.isPointInPath(mousePos.x, mousePos.y)) {
        //为防止出入图标部分时多次调用绘制函数，用一个布尔变量控制
        if (enter_menu === true) {
            enterMenu();
            enter_menu = false;
        }
        //离开图标部分
    } else {
        if (enter_menu === false) {
            outMenu();
            enter_menu = true;
        }
    }
}, false);


function enterMenu() {
    // init为每毫秒递增的变量，用来控制menu上下两个长条逐帧移动和侦测是否达到最终条件
    var init = 1 / 50;
    setInterval(function () {
        if (init <= 1) {
            drawMenu(context_menu, canvas_menu.width / 2, canvas_menu.height / 2, init);
            init += 1 / 50;
        }
    }, 1)
}
function outMenu() {
    var init = 1;
    setInterval(function () {
        if (init >= 0) {
            drawMenu(context_menu, canvas_menu.width / 2, canvas_menu.height / 2, init);
            init -= 1 / 50;
        }
    }, 1)
}

document.getElementById('menu-control').addEventListener('click', function () {
    var data = document.forms['menu'];
    menu.width = data.elements['menu-w'].value || menu.width;
    menu.height = data.elements['menu-h'].value || menu.height;
    menu.lw = data.elements['menu-lw'].value || menu.lw;
    menu.sc = data.elements['menu-sc'].value || menu.sc;
    menu.fc = data.elements['menu-fc'].value || menu.fc;
    menu.border = data.elements['menu-b'].checked;
    drawMenu(context_menu, canvas_menu.width / 2, canvas_menu.height / 2, 0, menu.width, menu.height, menu.lw, menu.sc, menu.fc, menu.border);
}, false);

//reset
document.getElementById('menu-reset').addEventListener('click', function () {
    document.getElementById('menu-b').checked = true;
    for (var i in cp_menu) {
        if (cp_menu.hasOwnProperty(i)) {
            menu[i] = cp_menu[i];
        }
    }
    drawMenu(context_menu, canvas_menu.width / 2, canvas_menu.height / 2);
}, false);