function increace(values) {
  var increasing_values, i, current_point;
  increasing_values = [];
  for (i = 0; i < values.length; i++) {
    if (i == 0) {
      increasing_values.push([values[i][0], 0]);
    }
    else {
      current_point = increasing_values[i-1][1] + ( 1 + increasing_values[i-1][1]/100) * values[i][1];
      increasing_values.push([values[i][0], current_point.toFixed(2) * 1]);
    }
  }
  return increasing_values;
}

function make_pamm_graph(container, data, name){
  Highcharts.setOptions({
    lang: {
      weekdays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      shortMonths: ["Янв","Фев","Мрт","Апр","Май","Июн","Июл","Авг","Сен","Окт","Нбр","Дек"]
    }
  });
  chart = new Highcharts.Chart({
      colors: ['#ff9c00', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
      chart: {
        renderTo: container,
        type: 'area',
        backgroundColor:'rgba(255, 255, 255, 0.1)'
      },
      title: {
        text: ' '
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        title: {
          enabled: false
        },
        labels: {
          style: {
            color: '#fff'
          }
        }
      },
      credits: {
          enabled: false
      },
      plotOptions: {
        series: {
            connectNulls: true,
            marker: {
                radius: 0
            }
        }
      },
      series: [{
            name: name,
            data: data
        }],
      legend: {
        enabled: false
      },
      exporting: { enabled: false }
  });
}