/**
 * Created by holly on 22/05/17.
 */

import Highcharts from 'highcharts';

Template.serviceStats.onCreated(function() {
    let params = {"env": FlowRouter.getParam("env")};
    let queryParams = {"requestId": FlowRouter.getParam("requestId")};

    RequestServices.getByRequestId(FlowRouter.getParam("env"), FlowRouter.getParam("requestId"), function(err, res){
        if(!err){
            if(res.SERVICE_ID){
                let request = {
                    hours: 24,
                    serviceId: res.SERVICE_ID,
                    requestDte: res.REQUEST_DTE
                };
                RequestServiceAverages.getFromServer(FlowRouter.getParam("env"), request, function(err, res){
                    if(err){
                        console.log(err);
                    }
                });
            }
            else {
                //Theres no data most likely because the service failed early on.
                RequestServiceAverages.remove({});
                RequestServiceAverages.isLoaded.set(true);
            }

        }
        else{
            console.log(err);
        }
    });

});

Template.serviceStats.helpers({

    isServiceRequestLoaded: function(){
        return RequestServices.isLoaded.get();
    },

    areServiceAveragesLoaded: function(){
        return RequestServiceAverages.isLoaded.get();
    },

    service_no: function() {
        Meteor.defer(function(){
            let service = RequestServices.findOne({});
            if(service.SERVICE_ID > 0){
                return service.SERVICE_ID;
            }
            else {
                return 'Not found';
            }
        });
    },

    createChart: function () {
        //while(!RequestServices.isLoading.get()) {
        // Gather data:
        let requestService = RequestServices.findOne({});
        let responseTimes = [];
        let avgResponses = [];
        let transPerMin = [];
        let reqDates = [];
        let stats = RequestServiceAverages.find({}).fetch();
        if (stats && stats.length > 0) {

            let serviceId = requestService.SERVICE_ID;
            _.each(stats, function (item) {
                responseTimes.push(item.REQUEST_DTE);
                avgResponses.push(item.SERVICE_AVG);
                transPerMin.push(item.SERVICE_CNT);
                reqDates.push(item.REQUEST_DTE);
            });

            setTimeout(function () {
                // Use Meteor.defer() to craete chart after DOM is ready:
                Meteor.defer(function () {
                    // Create standard Highcharts chart with options:
                    Highcharts.chart('chart', {
                        chart: {
                            zoomType: 'xy'
                        },
                        title: {
                            text: 'HUB Service Performance for ' + serviceId
                        },

                        xAxis: [{
                            categories: reqDates,
                            crosshair: true
                        }],
                        yAxis: [{ // Primary yAxis
                            labels: {
                                format: '{value}',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: 'Transactions per min',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            opposite: true

                        }, { // Secondary yAxis
                            gridLineWidth: 0,
                            title: {
                                text: 'Average ms',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            labels: {
                                format: '{value}',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            }

                        },],
                        tooltip: {
                            shared: true
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'left',
                            x: 80,
                            verticalAlign: 'top',
                            y: 55,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                        },
                        series: [{
                            name: 'Average',
                            type: 'line',
                            yAxis: 1,
                            data: avgResponses,
                            marker: {
                                enabled: false
                            },
                            dashStyle: 'shortdot',
                            tooltip: {
                                valueSuffix: ' ms'
                            }
                        },
                            {
                                name: 'Transactions',
                                type: 'line',
                                data: transPerMin,
                                tooltip: {
                                    valueSuffix: ' min'
                                }
                            }
                        ]
                    });
                });

            }, 620);
            //}
        }
        else {
            return "No Data Found";
        }
    }
});