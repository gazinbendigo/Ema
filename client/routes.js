/**
 * Created by adm9360_a on 17/03/2017.
 */

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
    name: "home",
    action: () => {
        BlazeLayout.render("hubLogsLayout", {content: "hubLogsView", menu: 'menu'});
    }
})