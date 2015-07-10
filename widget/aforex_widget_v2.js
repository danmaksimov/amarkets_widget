(function () {
  function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) { //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback();
        }
      };
    } else { 
      script.onload = function () {
          callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
 
  loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
    loadScript("https://code.highcharts.com/highcharts.js", function(){
      loadScript("widget/build_graph.js", function(){return true})
    });

    (function () {
      var Widget = window.Widget = function (container, options) {
        var url = "https://aforex.s3.amazonaws.com/widgets/strategy_" + options.color.toLowerCase() + "_" + options.size + ".html"
        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = function() {
          if(client.readyState === 4){
            container.append(client.response)
            var pathname = "https://s1.amarkets.org/strategies/" + options.strategy_id;
            var response = $.getJSON(pathname + ".json", function(data) {
              make_pamm_graph(container.find('#pamm-widget-strategy-profits_graph_container')[0], increace(data['graph_profits']), 'Доходность, %');
              container.find("#pamm-widget-name").text(data['name']);
              container.find("#pamm-widget-max_drawdown").text(data['equity_drawdown'] + ' %');
              container.find("#pamm-widget-general_profit").text(data['yield_all_time'] + ' %');
              container.find("#pamm-widget-yield_one_month").text(data['avg_yield_one_month'] + ' %');
              container.find("#pamm-widget-balance").text(data['capital'] + ' $');
            });
          }
        }
        client.send();
      };
    }).call(this);

    (function () {
      $('[data-role="strategy_widget"]').each(function (index, item) {
        var id = 'strategy_' + item.getAttribute('strategy-id')
        options = {
          strategy_id: item.getAttribute('strategy-id'),
          size: item.getAttribute('size'),
          color: item.getAttribute('color'),
          partner_code: item.getAttribute('partner-code')
        }
        var widget = new Widget($(item), options);
      });
    }).call(this);

  });
})();