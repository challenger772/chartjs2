function float2dollar(value){
    return "U$ "+(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderChart(data, labels) {
   var ctx = document.getElementById("myChart").getContext('2d');
   var myChart = new Chart(ctx, {
       type: 'line',
       data: {
           labels: labels,
           datasets: [{
               label: 'This week',
               data: data,
               borderColor: 'rgba(75, 192, 192, 1)',
               backgroundColor: 'rgba(75, 192, 192, 0.2)',
           }]
       },
       options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return float2dollar(value);
                    }
                }
            }]
        }
    },
   });
}

function getChartData() {
    $("#lodingMessage").html('<img src=./ajax-loader.gif alt="" srcset="">');
    $.ajax({
        url: "http://localhost:3000/chartdata",
        success: function (result) {
            $("#loadingMessage").html("");
            var data = [];
            data.push(result.thisWeek);
            data.push(result.lastweek);
            var labels = result.labels;
            renderChart(data, labels)
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    })
}

$("#renderBtn").click(
    function () {
      
        getChartData();
    }
);
