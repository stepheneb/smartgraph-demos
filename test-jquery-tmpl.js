$(function () {
  var ret, 
      vals = {
        x1: 1,
        x2: 5
      };
    
  ret = $.tmpl("The difference between ${x1} and ${x2} is $(x1-x2}", vals)[0].data;

  $('#output').text(ret);
});