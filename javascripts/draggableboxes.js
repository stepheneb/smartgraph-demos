
var el;
window.onload = function () {
    var isDrag = false;
    var dragger = function (e) {
        this.dx = e.clientX;
        this.dy = e.clientY;
        isDrag = this;
        this.animate({"fill-opacity": .2}, 500);
        e.preventDefault && e.preventDefault();
    };
    var r1 = Raphael("holder1", 300, 300);
    var box1 = r1.rect(130, 130, 40, 40, 1);
    var r2 = Raphael("holder2", 300, 300);
    var box2 = r2.rect(130, 130, 40, 40, 1);

    var color = Raphael.getColor();
    box1.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2});
    box1.node.style.cursor = "move";
    box1.mousedown(dragger);

    var color = Raphael.getColor();
    box2.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2});
    box2.node.style.cursor = "move";
    box2.mousedown(dragger);
    
    document.onmousemove = function (e) {
        e = e || window.event;
        if (isDrag) {
            var tx = e.clientX - isDrag.dx;
            var ty = e.clientY - isDrag.dy;
            isDrag.translate(tx, ty);
            // for (var i = connections.length; i--;) {
            //     r.connection(connections[i]);
            // }
            r1.safari();
            r2.safari();
            if (isDrag == box1) {
                box2.translate(tx, ty);
            }
            if (isDrag == box2) {
                box1.translate(tx, ty);
            }
            isDrag.dx = e.clientX;
            isDrag.dy = e.clientY;
        }
    };
    document.onmouseup = function () {
        isDrag && isDrag.animate({"fill-opacity": 0}, 500);
        isDrag = false;
    };
};
