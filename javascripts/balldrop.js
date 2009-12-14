
var s2doc = {
  init: function(){
    $$('.transition').each(s2doc.TransitionExample);
  },
  
  TransitionExample: function(element){
    var type = element.up().down('.ebnf').innerHTML.gsub(/S2\.FX\.Transitions\./,'').split('(').first()
    var transition = S2.FX.Transitions[type]
    var active = false;
      
    var values = $R(0,300).map(function(v){ return transition(v/300)*300; })
    var min = Math.min(0, values.min())
    var max = Math.max(300, values.max());

    if (min==max) {
      min = 0; max = 300;
    }
    
    var factor = 220/(max-min) * -1
    var grid = '<span style="bottom:'+((0-min)*factor).round()+'px">0</span>'+
      '<span style="bottom:'+((min-300)*factor).round()+'px">1</span>'
    var graph = $R(0,300).map(function(v){
        return '<div style="left:'+v+'px;bottom:'+((values[v]-max)*factor).round()+'px;height:1px"></div>';
      }).join('') + '<div class="indicator" style="display:none"></div><div class="marker" style="display:none"></div><div class="label"></div>';
      
      
    var interactive = '<div class="interactive">'+
      '<div class="movement">ball</div>' +
      '<div class="hint">hover over this area to see the ball drop at different speeds</div>' +
      '</div>';
      
    element.innerHTML = grid + graph + interactive;
    
    var effectM,
      interactive = element.down('div.interactive'),
      movement = interactive.down('div.movement'),
      indicator = element.down('div.indicator'),
      marker = element.down('div.marker'),
      label = element.down('div.label');
      
    var demoTransition = function(pos){
      var value = transition(pos);
      indicator.style.cssText += ';left:'+(pos*300).round()+'px';
      marker.style.cssText += ';left:'+(pos*300).round()+'px;bottom:'+(((value*300)-max)*factor).round()+'px';
      return value;
    }
    
    interactive.observe('mouseenter', function(){
      interactive.addClassName('active');
      indicator.show();
      marker.show();
      var durations = [.5, 1, 3, 5, 10], i = -1, duration, delay = 0;
      function animate(){
        duration = durations[++i%durations.length];
        effectM = new S2.FX.Morph(movement, { 
          style: 'top:220px',
          transition: demoTransition, 
          duration: duration, 
          delay: delay,
          before: function(){ 
            label.innerHTML = duration + 's';
            movement.setStyle('top:0px') 
          },
          after: function(){ if(active) animate(); }
        });
        effectM.play();
        delay = 1;
      }
      active = true;
      animate();
    }).observe('mouseleave', function(){
      i = -1;
      label.innerHTML = '';
      indicator.hide();
      marker.hide();
      interactive.removeClassName('active');
      if(effectM) effectM.cancel();
      movement.setStyle('top:0px');
      active = false;
    });
  },
  
};

document.observe("dom:loaded", function() {
  s2doc.init();
});