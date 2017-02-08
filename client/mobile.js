var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;


drawEdge(context, canvas.width / 2, canvas.height / 2, 200, 300);


function drawEdge(ctx, x, y, width, height) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(width, height);
    ctx.beginPath();
    ctx.moveTo(-1, -1);
    ctx.lineTo(1, -1);
    ctx.restore();
    ctx.stroke();
}