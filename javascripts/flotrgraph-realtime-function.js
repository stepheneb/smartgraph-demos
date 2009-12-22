/**
* Default options.
*/
var options =  {
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
        show: false,       // => setting to true will show points, false will hide
        radius: 3,     // => point radius (pixels)
        lineWidth: 2,      // => line width in pixels
        fill: true,        // => true to fill the points with a color, false for (transparent) no fill
        fillColor: '#ffffff'   // => fill color
    },
    lines: {
        show: true,        // => setting to true will show lines, false will hide
        lineWidth: 2,      // => line width in pixels
        fill: false,       // => true to fill the area from the line to the x axis, false for (transparent) no fill
        fillColor: null        // => fill color
    }
};

/**
* Start with a single coordinate in the origin.
*/
var d1 = [[0,0]];
var index = 0;

var stopped = true;

/**
* Wait till dom's finished loading.
*/

document.observe('dom:loaded', function(){          
    /**
    * Draw an empty graph and configure the axis.
    */
    var p = Flotr.draw($('container1'), [d1], options);
        
});

function startPlotting(){
    stopped = false;
    //change the Y attribute of the graph to the new function 
    d1 = [];
    setInterval(updatePlot(), 100);
};

function updatePlot(){
    index = index + 1;
    //redefine function f according to the current text field value
    // eval("function f(x){ return "+document.getElementById("exp").value+";}");
    // d1.push([i, f(i)]);
    // var p = Flotr.draw($('container1'), [d1], options);
}

function plotIt(){
    //redefine function f according to the current text field value
    eval("function f(x){ return "+document.getElementById("exp").value+";}");
    //change the Y attribute of the graph to the new function 
    var d1 = [];
    for(var i = -5; i < 5; i += 0.1)
        d1.push([i, f(i)]);

    /**
    * Draw the graph.
    */
    var p = Flotr.draw($('container1'), [d1], options);

}

function clearIt(){
    var d1 = [];
    var p = Flotr.draw($('container1'), [d1], options);

}


