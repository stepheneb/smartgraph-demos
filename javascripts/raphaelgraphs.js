
document.observe('dom:loaded', function(){
    var W = 640,
        H = 480,
        r = Raphael("holder", W, H),
        values = [],
        len = 7;
    for (var i = len; i--;) {
        values.push(50);
    }
    
    function translate(x, y) {
        return [
            50 + (W - 60) / (values.length - 1) * x,
            H - 10 - (H - 20) / 100 * y
        ];
    }
    function rollback(y) {
        return 100 - (y - 10) / (H - 20) * 100;
    }
    var p = [["M"].concat(translate(0, values[0]))],
        color = "hsb(" + [.6, 1, 1] + ")",
        blankets = r.set(),
        buttons = r.set(),
        w = (W - 60) / values.length,
        isDrag = -1,
        start = null,
        sub = r.path(p.join(",")).attr({stroke: "none", gradient: [90, color, color].join("-"), opacity: 0}),
        path = r.path(p.join(",")).attr({stroke: color, "stroke-width": 2}),
        unhighlight = function () {};
    for (var i = 0, ii = values.length - 1; i < ii; i++) {
        var xy = translate(i, values[i]),
            xy1 = translate(i + 1, values[i + 1]),
            f;
        p.push(["C", xy[0] + w / 2, xy[1], xy1[0] - w / 2, xy1[1], xy1[0], xy1[1]]);
        (f = function (i, xy) {
            buttons.push(r.circle(xy[0], xy[1], 5).attr({fill: color, stroke: "none"}));
            blankets.push(r.circle(xy[0], xy[1], w / 2).attr({stroke: "none", fill: "#fff", opacity: 0}).mouseover(function () {
                if (isDrag + 1) {
                    unhighlight = function () {};
                } else {
                    buttons.items[i].animate({r: 10}, 200);
                }
            }).mouseout(function () {
                if (isDrag + 1) {
                    unhighlight = function () {
                        buttons.items[i].animate({r: 5}, 200);
                    };
                } else {
                    buttons.items[i].animate({r: 5}, 200);
                }
            }).mousedown(function (e) {
                start = {m: e.clientY, p: p[i][4] || p[i][2]};
                isDrag = i;
            }));
            blankets.items[blankets.items.length - 1].node.style.cursor = "move";
        })(i, xy);
        if (i == ii - 1) {
            f(i + 1, xy1);
        }
    }
    var subaddon = "L" + (W - 10) + "," + (H - 10) + ",50," + (H - 10) + "z";
    path.attr({path: p.join(",")});
    sub.attr({path: p.join(",") + subaddon});
    var update = function (i, d) {
        (d > H - 10) && (d = H - 10);
        (d < 10) && (d = 10);
        if (i) {
            p[i][4] = d;
            p[i][6] = d;
            p[i + 1] && (p[i + 1][2] = d);
        } else {
            p[0][2] = d;
            p[1][2] = d;
        }
        path.attr({path: p.join(",")});
        sub.attr({path: p.join(",") + subaddon});
        buttons.items[i].attr({cy: d});
        blankets.items[i].attr({cy: d});
        r.safari();
        values[i] = Math.round(rollback(d));
    };
    document.onmousemove = function (e) {
        e = e || window.event;
        if (isDrag + 1) {
            update(isDrag, start.p + e.clientY - start.m);
        }
    };
    document.onmouseup = function () {
        isDrag = -1;
        unhighlight();
    };
};
