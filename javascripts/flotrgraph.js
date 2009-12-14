/**
* Wait till dom's finished loading.
*/
document.observe('dom:loaded', function(){
    var selected_point = [0,0];
    plotIt(selected_point);

    // Observe the 'flotr:click' event.
    $('container1').observe('flotr:click', function(evt){
        // Get the click coordinates passed as event memo.
        var g = $('container1').graph;
        var pos = evt.memo[0];
        g.hit(pos);
        selected_point = [pos.x, pos.y];
        plotIt(selected_point);
    });
});

function plotIt(sp){
    //redefine function f according to the current text field value
    eval("function f(x){ return "+document.getElementById("exp").value+";}");
    //change the Y attribute of the graph to the new function 
    var d1 = [];
    var sp2 = [0,0]
    var d2 = [sp];
    for(var i = -5; i < 5; i += 0.1)
        d1.push([i, f(i)]);

    /**
    * Draw the graph.
    */
    var f = Flotr.draw($('container1'), 
    [   {data:d1},
        {data:d2, points: {show: true}}
    ],
    {
        xaxis:{
            min: -5,   // => part of the series is not displayed.
            max:  5  // => part of the series is not displayed.
        },
        yaxis:{
            min: -10,
            max:  10
        },
        grid:{
            backgroundColor: '#fff'
        },
        legend: {
            position: 'nw'
        },
        points: {
            show: false,		// => setting to true will show points, false will hide
            radius: 3,		// => point radius (pixels)
            lineWidth: 2,		// => line width in pixels
            fill: true,		// => true to fill the points with a color, false for (transparent) no fill
            fillColor: '#ffffff'	// => fill color
        },
        lines: {
            show: true,		// => setting to true will show lines, false will hide
            lineWidth: 2, 		// => line width in pixels
            fill: false,		// => true to fill the area from the line to the x axis, false for (transparent) no fill
            fillColor: null		// => fill color
        },
        title: 'Simple graph',
        // subtitle: 'y = -2.5 + 2x^2',
        crosshair:{
            mode: 'xy'
        },
        mouse:{
            track: true,
            lineColor: 'purple',
            relative: true,
            position: 'ne',
            sensibility: 1, // => The smaller this value, the more precise you've to point
            trackDecimals: 2,
            trackFormatter: function(obj){ return 'x = ' + obj.x +', y = ' + obj.y; }
        }
    });    

}

function checkAnswer(){
    var g = $('container1').graph;
    var dp = g.data[1].data[0];
    if (dp[1] < 0) {
        alert('Correct: you selected x=' + dp[0] + ', y=' + dp[1] );
    } else {
        alert('Not right yet: you selected x=' + dp[0] + ', y=' + dp[1] );        
    };
}





