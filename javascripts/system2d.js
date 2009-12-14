/*!
 *  System2D version 1.0.0_a1
 *  (c) 2009 Stephen Bannasch
 *
 *  System2D is freely distrubutable under and the LGPL license.
 *----------------------------------------------------------------------------------*/



var S2D = {
  Version: '1.0.0_a1',

  Extensions: {}
};

S2D = (function(){
  var queues = [], globalQueue,
    heartbeat, activeEffects = 0;

  function beatOnDemand(dir){
    heartbeat[(activeEffects += dir) > 0 ? 'start' : 'stop']();
  }

  function renderQueues(){
    queues.invoke('render', heartbeat.getTimestamp());
  }

  function initialize(initialHeartbeat){
    if(globalQueue) return;
    queues.push(globalQueue = new S2.FX.Queue());
    S2.FX.DefaultOptions.queue = globalQueue;
    heartbeat = initialHeartbeat || new S2.FX.Heartbeat();

    document
      .observe('effect:heartbeat', renderQueues)
      .observe('effect:queued',    beatOnDemand.curry(1))
      .observe('effect:dequeued',  beatOnDemand.curry(-1));
  }

  return {
    initialize: initialize,
    getQueues: function(){ return queues; },
    addQueue: function(queue){ queues.push(queue); },
    getHeartbeat: function(){ return heartbeat; },
    setHeartbeat: function(newHeartbeat){
      heartbeat = newHeartbeat;
    }
  }
})();
Object.extend(S2D, {
  DefaultOptions: {
    cells: 100
  },

  parseOptions: function(options) {
    if (Object.isNumber(options))
      options = { cells: options };

    return options;
  }
});


S2D.View2D = Class.create({
  initialize: function(element) {

    var parts = $R(0,99).map(function(x) {
      return '<div class="patch" id="'+element.id+'_'+x+'" style="left:'+((x % 10)*40)+'px;bottom:'+(Math.floor(x/10)*40)+'px;color:#f72;"></div>';
    }).join('');
      // var x = x
      // return $R(0,9).map(function(y) {
      //   return '<div class="patch" style="left:'+(x*40)+'px;bottom:'+(Y40)+'px;color:#f72;"></div>';
      //   }).join('');
      // }).join('');
    //   return $R(0,10).map(function(y) {
    //     return '<div class="patch";style="left:'+(x*40)+'px;bottom:'+(y*40)+'"></div>';
    //   }
    // });
    element.innerHTML = parts;
  }
  
  setOptions: function(options) {
    options = S2.parseOptions(options);

    if (!this.options) {
      this.options = Object.extend(Object.extend({},S2.FX.DefaultOptions), options);
      if(options.tween) this.options.transition = options.tween;
    }

    if (this.options.beforeUpdate || this.options.afterUpdate) {
      this.update = this.updateWithoutWrappers.wrap( function(proceed,position){
        if (this.options.beforeUpdate) this.options.beforeUpdate(this, position);
        proceed(position);
        if (this.options.afterUpdate) this.options.afterUpdate(this, position);
      }.bind(this));
    }
    if(this.options.transition === false)
      this.options.transition = S2.FX.Transitions.linear;
    this.options.transition = Object.propertize(this.options.transition, S2.FX.Transitions);
  },
  

});


// S2D.Model2D = Class.create({
//   initialize: function(options) {
//     var backgroundDiffusivity = 0.01;
//     var backgroundTemperature = 20.0;
//     
//     var nx = 100, ny = 100;
//     var lx = 10, ly = 10;
//     var deltaX = lx / nx;
//     var deltaY = ly / ny;
// 
//     // temperature array
//     var t = new Array(nx)
//     for (i=0; i <nx; i++) { t[i] = new Array(nx) }
//     
//     // internal heat generation array
//     var q = new Array(nx)
//     for (i=0; i <100; i++) { q[i] = new Array(nx) }
//     
//     // velocity arrays
//     var u = new Array(nx)
//     for (i=0; i <100; i++) { u[i] = new Array(nx) }
//     var v = new Array(nx)
//     for (i=0; i <100; i++) { v[i] = new Array(nx) }
//     
//     // diffusivity array
//     var diffusivity = new Array(nx)
//     for (i=0; i <100; i++) { diffusivity[i] = new Array(nx) }
//     
//   },
// 
//   refreshQandDiffusivityArrays: function(){
//     for (int i = 0; i < nx; i++) {
//       x = i * deltaX;
//       for (int j = 0; j < ny; j++) {
//         y = j * deltaY;
//         q[i][j] = 0;
//         // for (HeatSource s : heatSources) {
//         //   if (s.getShape().contains(x, y)) {
//         //     q[i][j] += s.getPower();
//         //   }
//         // }
//         diffusivity[i][j] = backgroundDiffusivity;
//         // for (Part p : parts) {
//         //   if (p.getShape().contains(x, y)) {
//         //     diffusivity[i][j] += p.getDiffusivity();
//         //   }
//         // }
//       }
//     }
//   }
// });

// 
// 

// S2D.Patch = Class.create({
//   initialize: function(left, bottom) {
// 
//     var part = new S2D.Part;
//     
//   })
// };
// 
// S2D.Part = Class.create({
//   initialize: function() {
// 
//     // 
//     // the thermal conductivity: Fourier's Law, the flow of heat energy
//     // 
//     // q = - k dT/dx
//     var conductivity = 0.1f;
//     
//     //
//     // the heat capacity: the thermal energy stored in an object is
//     // 
//     // E = c T
//     var capacity = 1f;
// 
//     // density
//     var density = 1f;
// 
//     // 
//     // The higher the diffusivity, the faster heat transfers. If the thermal
//     // conductivity is high, the rate of heat transfer is high. If the heat
//     // capacity is high, the material holds a lot of thermal energy and the rate
//     // of heat transfer is low. If the density is high, the material is
//     // substantial and it also holds a lot of thermal energy, which reduces the
//     // rate of heat transfer as does the heat capacity.
//     // 
//     diffusivity: function() {
//       conductivity / (capacity * density);
//     }
//   },
// };
