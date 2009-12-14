
var heatflow = {
  init: function(){
    $$('.heatflowmodel').each(heatflow.HeatModel);
  },
  
  HeatModel: function(element){
    // var model = new S2D.Model2D();
    view = new S2D.Heat.View2D(element);
    // view.setTemperature(model.getTemperature());
  },
  
};

document.observe("dom:loaded", function() {
  heatflow.init();
});