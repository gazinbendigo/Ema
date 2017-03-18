/**
 * Created by adm9360 on 9/03/2016.
 */

Template.chart.helpers({
    createChart: function () {
        // Gather data:
        var allTasks = Tasks.find({}).count(),
            incompleteTask = Tasks.find({checked: {$ne: true}}).count(),
            tasksData = [{
                y: incompleteTask,
                name: "Incomplete"
            }, {
                y: allTasks - incompleteTask,
                name: "Complete"
            }];
        // Use Meteor.defer() to craete chart after DOM is ready:
        Meteor.defer(function() {
            // Create standard Highcharts chart with options:
            Highcharts.chart('chart', {
                title: {text: "Tasks Completed"},
                yAxis: {
                    title: {text: '<strong>Tasks</strong>'}
                },
                series: [{
                    type: 'bar',
                    data: tasksData
                }]
            });
        });
    }
});

Template.chart.onCreated(function(){
    Meteor.subscribe('tasks');
});