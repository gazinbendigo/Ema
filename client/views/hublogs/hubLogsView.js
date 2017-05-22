/**
 * Created by adm9360 on 11/12/2015.
 */
const DEFAULT_START = 0;
const DEFAULT_ROWS_PER_PAGE = 20;
const DEFAULT_NO_RECORDS = 20;
let queryParams = {};

Template.hubLogsView.onCreated(function(){

    //?start=0&noRecords=80&requestId=null&serviceId=null&sourceName=null&severity=null&logCode=null&userId=null&latestDate=null&requestMessage=null&logMessage=null&errorsOnly=0&includeOlbPing=0&apps=null

    const handle = Meteor.subscribe("environments");
    let context = new Object();
    context = FlowRouter.current();
    if(context.path.startsWith('/')){
        //Initial page load path
        HubLogs.getFromServer(null, null);
    }
    else {
        HubLogs.getFromServer(context.params, context.queryParams);
    }
    this.selectedEnvironment = new ReactiveVar(null);
    if(context.params.env){
        this.selectedEnvironment.set({'env': context.params.env});
    }

    Tracker.autorun(() => {
        const isReady = handle.ready();
        if(isReady){
            this.selectedEnvironment.set({'env': Environments.findOne().ENV_CODE});
        }
    });

    Applications.getFromServer(this.selectedEnvironment.get());
    let startParam = FlowRouter.getQueryParam("start");
    this.start = startParam ? new ReactiveVar(startParam) : new ReactiveVar(DEFAULT_START);
    let noRows = FlowRouter.getQueryParam("rowsPerPage");
    this.rowsPerPage = noRows ? new ReactiveVar(noRows) : new ReactiveVar(DEFAULT_ROWS_PER_PAGE);
    let requestIdParam = FlowRouter.getQueryParam("requestId");
    this.requestId = requestIdParam ? new ReactiveVar(requestIdParam) : new ReactiveVar(null);
    let serviceIdParam = FlowRouter.getQueryParam("serviceId");
    this.serviceId = serviceIdParam ? new ReactiveVar(serviceIdParam) : new ReactiveVar(null);
    let sourceNameParam = FlowRouter.getQueryParam("sourceName");
    this.sourceName = sourceNameParam ? new ReactiveVar(sourceNameParam) : new ReactiveVar(null);
    let userIdParam = FlowRouter.getQueryParam("userId");
    this.userId = userIdParam ? new ReactiveVar(userIdParam) : new ReactiveVar(null);
    let severityParam = FlowRouter.getQueryParam("severity");
    this.severity = severityParam ? new ReactiveVar(severityParam) : new ReactiveVar(null);
    let earliestDateParam = FlowRouter.getQueryParam("earliestDate");
    this.earliestDate = earliestDateParam ? new ReactiveVar(earliestDateParam) : new ReactiveVar(null);
    let latestDateParam = FlowRouter.getQueryParam("latestDate");
    this.latestDate = latestDateParam ? new ReactiveVar(latestDateParam) : new ReactiveVar(null);
    let logCodeParam = FlowRouter.getQueryParam("logCode");
    this.logCode = logCodeParam ? new ReactiveVar(logCodeParam) : new ReactiveVar(null);
    let requestMessageParam = FlowRouter.getQueryParam("requestMessage");
    this.requestMessage = requestMessageParam ? new ReactiveVar(requestMessageParam) : new ReactiveVar(null);
    let logMessageParam = FlowRouter.getQueryParam("logMessage");
    this.logMessage = logMessageParam ? new ReactiveVar(logMessageParam) : new ReactiveVar(null);
    let records = FlowRouter.getQueryParam("noRecords");
    this.noRecords = records ? new ReactiveVar(records) : new ReactiveVar(DEFAULT_NO_RECORDS);
    let errorsOnlyParam = FlowRouter.getQueryParam("errorsOnly");
    this.errsOnly = errorsOnlyParam === 0 ? new ReactiveVar(true) : new ReactiveVar(false);
    let olbPingParam = FlowRouter.getQueryParam("includeOlbPing");
    this.olbPing = olbPingParam === 0 ? new ReactiveVar(true) : new ReactiveVar(false);

    this.pageCursor = new ReactiveVar(0);
    this.page = new ReactiveVar(1);
    this.nextPage = new ReactiveVar(null);
    this.prevPage = new ReactiveVar(null);

    this.searchParams = new ReactiveVar({});

});

Template.hubLogsView.helpers({
    start: ()  => {
        return Template.instance().start.get();
    },

    rowsPerPage: () => {
        return Template.instance().rowsPerPage.get();
    },

    requestId: () => {
        return Template.instance().requestId.get();
    },

    serviceId: () => {
        return Template.instance().serviceId.get();
    },

    sourceName: () => {
        return Template.instance().sourceName.get();
    },

    userId: () => {
        return Template.instance().userId.get();
    },

    severity: () => {
        return Template.instance().severity.get();
    },

    earliestDate: () => {
        return Template.instance().earliestDate.get();
    },
    latestDate: () => {
        return Template.instance().latestDate.get();
    },
    logCode: () => {
        return Template.instance().logCode.get();
    },
    requestMessage: () => {
        return Template.instance().requestMessage.get();
    },
    logMessage: () => {
        return Template.instance().logMessage.get();
    },
    noRecords: function(){
        return Template.instance().noRecords.get();
    },
    errsOnly: () => {
        if(Template.instance().errsOnly.get() === true){
            return 'checked';
        }
        return null;
    },
    olbPing: () => {
        if(Template.instance().olbPing.get() === true){
            return 'checked';
        }
        return null;
    },

    getEnvironments: () => {
        return Environments.find({});
    },

    environmentOptions: (envCode) =>{
        //Loops thru twice. TODO: Look into this.
        console.log(envCode);
        let selectedEnv = Template.instance().selectedEnvironment.get();
        let isSelected = selectedEnv.env === envCode.ENV_CODE;
        return {key: envCode.ENV_CODE, selected: isSelected ? 'selected' : '', value: `HUB${envCode.ENV_CODE}`};

    },

    areLogsLoaded: () =>{
        return HubLogs.isLoaded.get();
    },

    isApplicationsLoaded: () => {
        return Applications.isLoaded.get();
    },

    applications: () => {
        let allApplications = [];
        //fetch turns the retrieved data into an array
        allApplications = Applications.find({}, {sort: {APPLICATION_CDE: 1}}).fetch();//Sort +1 ACS, -1 DESC
        let rows = [];
        let noCols = 2;
        let count = 0;
        while(allApplications.length > noCols)
        {
            count = allApplications.length;
            if(count == 1)
            {
                rows.push({row: allApplications.slice(0, 1)});
                allApplications = allApplications.slice(1);
            }
            else
            {
                rows.push({row: allApplications.slice(0, noCols)});
                allApplications = allApplications.slice(noCols);
            }
        }
        rows.push({row: allApplications});
        return rows;
    },

    hubLog: () => {
        let cursor = Template.instance().pageCursor.get();
        let rowsPerPage = Template.instance().rowsPerPage.get();
        return HubLogs.find({}, {skip: Number(cursor), limit: Number(rowsPerPage)});
    },

    next: () => {
        if((Number(Template.instance().pageCursor.get()) + Number(Template.instance().rowsPerPage.get())) <= HubLogs.find({}).count()){
            $(".next").css('visibility', 'visible');
            return "Next " + (Number(Template.instance().pageCursor.get()) +  Number(Template.instance().rowsPerPage.get())) + " - "
                + (Number(Template.instance().pageCursor.get()) + Number(Template.instance().rowsPerPage.get()) * 2);
        }
        else {
            $(".next").css('visibility', 'hidden');
            return '';
        }
    },

    prev: () => {
        $(".prev").css('visibility', 'hidden');
        if(Number(Template.instance().pageCursor.get()) < Number(Template.instance().rowsPerPage.get()) ) {
            return '';
        }
        else {
            $(".prev").css('visibility', 'visible');
            return "Prev " + (Number(Template.instance().pageCursor.get()) - Number(Template.instance().rowsPerPage.get())) + " - "
                + (Number(Template.instance().pageCursor.get()));
        }
    },

    serviceStatsPath: (requestId) => {
        let params = {env: getEnvironment(), requestId: requestId};
        return FlowRouter.path('serviceStatsByReqId', params);
    },

    getSourceNameUrl: (srcName) => {
        let params = {"env": getEnvironment()};
        let queryParams = {"sourceName":srcName};
        return FlowRouter.path('searchHublogs', params, queryParams);
    },

    getServiceIdUrl: (serviceId) => {
        let params = {"env": getEnvironment()};
        let queryParams = {"serviceId":serviceId};
        return FlowRouter.path('searchHublogs', params, queryParams);
    },

    getRequestIdUrl: (requestId) => {
        let params = {"env": getEnvironment()};
        let queryParams = {"requestId": requestId};
        return FlowRouter.path('searchHublogs', params, queryParams);
    },

    getApplicationCodeUrl: (appCode) => {
        let params = {"env": getEnvironment()};
        let queryParams = {"appCode": appCode};
        return FlowRouter.path('searchHublogs', params, queryParams);
    },

});


Template.hubLogsView.events({
    "keyup #start": (event, template) => {
        event.preventDefault();
        let start = Number($('#start').val());
        start = setIntFromInput(start, DEFAULT_START);
        template.start.set(start);
        updateSearchParams("start", start);
    },
    "click #start": (event, template) => {
        event.preventDefault();
        let start = Number($('#start').val());
        start = setIntFromInput(start, DEFAULT_START);
        template.start.set(start);
        updateSearchParams('start', start)
    },
    "keyup #rowsPerPage": (event, template) => {
        event.preventDefault();
        let rowsPerPage = Number($('#rowsPerPage').val());
        rowsPerPage = setIntFromInput(rowsPerPage, DEFAULT_ROWS_PER_PAGE);
        template.rowsPerPage.set(rowsPerPage);
        updateSearchParams('rowsPerPage', rowsPerPage)
    },
    "click #rowsPerPage": (event, template) => {
        event.preventDefault();
        let rowsPerPage = Number($('#rowsPerPage').val());
        rowsPerPage = setIntFromInput(rowsPerPage, DEFAULT_ROWS_PER_PAGE);
        template.rowsPerPage.set(rowsPerPage);
        updateSearchParams('rowsPerPage', rowsPerPage)
    },
    "keyup #requestId": (event, template) => {
        event.preventDefault();
        let requestId = Number($('#requestId').val());
        requestId = setIntFromInput(requestId, null);
        template.requestId.set(requestId);
        updateSearchParams("requestId", requestId);
    },
    "click #requestId": (event, template) => {
        event.preventDefault();
        let requestId = Number($('#requestId').val());
        requestId = setIntFromInput(requestId, null);
        template.requestId.set(requestId);
        updateSearchParams("requestId", requestId);
    },
    "keyup #serviceId": (event, template) => {
        event.preventDefault();
        let serviceId = Number($('#serviceId').val());
        serviceId = setIntFromInput(serviceId, null);
        template.serviceId.set(serviceId);
        updateSearchParams("serviceId", serviceId);
    },
    "click #serviceId": (event, template) => {
        event.preventDefault();
        let serviceId = Number($('#serviceId').val());
        serviceId = setIntFromInput(serviceId, null);
        template.serviceId.set(serviceId);
        updateSearchParams("serviceId", serviceId);
    },
    "keyup #sourceName": (event, template) => {
        event.preventDefault();
        let sourceName = $('#sourceName').val();
        template.sourceName.set(extractStringFromInput(sourceName));
        updateSearchParams('sourceName', extractStringFromInput(sourceName));
    },
    "keyup #userId": (event, template) => {
        event.preventDefault();
        let userId = $('#userId').val();
        template.userId.set(extractStringFromInput(userId));
        updateSearchParams('userId', extractStringFromInput(userId));
    },
    "keyup #severity": (event, template) => {
        event.preventDefault();
        let severity = $('#severity').val();
        template.severity.set(extractValidSeverity(severity));
        updateSearchParams('serverity', extractValidSeverity(severity));
    },
    "keyup #earliestDate": (event, template) => {
        event.preventDefault();
        let earliestDate = $('#earliestDate').val();
        template.earliestDate.set(extractStringFromInput(earliestDate));
        updateSearchParams('earliestDate', earliestDate);
    },
    "keyup #latestDate": (event, template) => {
        event.preventDefault();
        let latestDate = $('#latestDate').val();
        template.latestDate.set(extractStringFromInput(latestDate));
        updateSearchParams('latestDate', latestDate);
    },
    "keyup #logCode": (event, template) => {
        event.preventDefault();
        let logCode = Number($('#logCode').val());
        logCode = setIntFromInput(logCode, null);
        template.logCode.set(logCode);
        updateSearchParams('logCode', logCode);
    },
    "click #logCode": (event, template) => {
        event.preventDefault();
        let logCode = Number($('#logCode').val());
        logCode = setIntFromInput(logCode, null);
        template.logCode.set(logCode);
        updateSearchParams('logCode', logCode);
    },
    "keyup #requestMessage": (event, template) => {
        event.preventDefault();
        let message = $('#requestMessage').val();
        template.requestMessage.set(extractStringFromInput(message));
        updateSearchParams('requestMessage', message);
    },
    "keyup #logMessage": (event, template) => {
        event.preventDefault();
        let message = $('#logMessage').val();
        template.logMessage.set(extractStringFromInput(message));
        updateSearchParams('logMessage', message);
    },
    "keyup #noRecords": (event, template) => {
        event.preventDefault();
        let recordSize = Number($('#noRecords').val());
        recordSize = setIntFromInput(recordSize, DEFAULT_NO_RECORDS);
        template.noRecords.set(recordSize);
        updateSearchParams('noRecords', recordSize);
    },
    "click #noRecords": (event, template) => {
        event.preventDefault();
        let recordSize = Number($('#noRecords').val());
        recordSize = setIntFromInput(recordSize, DEFAULT_NO_RECORDS);
        template.noRecords.set(recordSize);
        updateSearchParams('noRecords', recordSize);
    },
    "click #errsOnly": (event, template) => {
        event.preventDefault();
        let isChecked = $('#errsOnly').is(":checked");
        template.errsOnly.set(isChecked);
        updateCheckboxSearchParam('errorsOnly', isChecked);
    },
    "click #olbPing": (event, template) => {
        event.preventDefault();
        let isChecked = $('#olbPing').is(":checked");
        template.olbPing.set(isChecked);
        updateCheckboxSearchParam('includeOlbPing', isChecked)
    },

    "click .reqId": (event, template) => {
        event.preventDefault();
        updateSearchParams("requestId", this.REQUEST_ID);
        searchHubLogs(template);
    },

    "change #hubEnvironments": (event, template) => {
        event.preventDefault();
        template.selectedEnvironment.set({"env": $('#hubEnvironments').val()});
        updateSearchParams("start", DEFAULT_START);
        updateSearchParams("noRecords", DEFAULT_NO_RECORDS);
        template.rowsPerPage.set(DEFAULT_ROWS_PER_PAGE);
        searchHubLogs(template, null, null);
    },

    "click .appCode": (event, template) => {
        event.preventDefault();
        updateSearchParams("apps", this.APPLICATION_CDE);
        searchHubLogs(template);
    },

    "click .srvcId": (event, template) => {
        event.preventDefault();
        updateSearchParams("serviceId", this.SERVICE_ID);
        searchHubLogs(template);
    },

    "click .srcName": (event, template) => {
        event.preventDefault();
        updateSearchParams("sourceName", this.SOURCE_NME);
        searchHubLogs(template);
    },

    "click #btnSearch": (event, template) => {
        event.preventDefault();
        let params = {"env": $('#hubEnvironments').val()};
        template.selectedEnvironment.set(params);

        //Add all Applications that are ticked
        let checkeddApps = template.findAll("input[type=checkbox]:checked");
        if(checkeddApps)
        {
            let apps = '';
            delete Template.instance().searchParams.get()["apps"];
            _.each(checkeddApps, function(app){
                if(apps === '')
                {
                    apps = app.value;
                }
                else
                {
                    apps = apps + ',' + app.value;
                }
            });
            if(apps != '')
            {
                updateSearchParams("apps", apps);
            }
        }
        HubLogs.getFromServer(params, template.searchParams.get());
        updateSearchUrl(params, template.searchParams.get());
    },

    "click #clearFilter": (event, template) => {
        event.preventDefault();
        clearFilter(template);
        searchHubLogs(template);
    },

    "click .prev": (event, template) => {
        event.preventDefault();
        if(Number(template.pageCursor.get()) > (Number(template.rowsPerPage.get())) -1)
        {
            let pageCursor = Number(template.pageCursor.get()) - Number(template.rowsPerPage.get());
            template.prevPage.set(pageCursor);
            template.pageCursor.set(pageCursor);
        }
    },

    "click .next": (event, template) => {
        event.preventDefault();
        let index = template.pageCursor.get();
        let pageRows = template.rowsPerPage.get();
        if((index + pageRows) <= HubLogs.find({}).count()){
            let env = {"env": getEnvironment()};
            let params = {"start": (index + pageRows), "noRecords": pageRows};
            HubLogs.insertFromServer(env, params);
        }
        template.pageCursor.set((index + pageRows));
    }

});

function searchHubLogs(template){
    let params = {"env": getEnvironment()};
    HubLogs.getFromServer(params, template.searchParams.get());
    updateSearchUrl(params, template.searchParams.get());
}

function clearFilter(template){
    template.start.set(DEFAULT_START);
    template.rowsPerPage.set(DEFAULT_ROWS_PER_PAGE);
    template.requestId.set('');
    template.serviceId.set('');
    template.sourceName.set('');
    template.userId.set('');
    template.severity.set('');
    template.earliestDate.set('');
    template.latestDate.set('');
    template.logCode.set('');
    template.requestMessage.set('');
    template.logMessage.set('');
    template.noRecords.set(DEFAULT_NO_RECORDS);
    template.errsOnly.set(false);
    template.olbPing.set(false);

    template.pageCursor = new ReactiveVar(0);
    template.nextPage = new ReactiveVar(null);
    template.prevPage = new ReactiveVar(null);

    let checked = template.findAll("input[type=checkbox]:checked");
    _(checked).each(function(ckbx){
        ckbx.checked=false;
    });

    template.searchParams.set({});
}

function updateSearchParams(key, value){
    if(value){
        Template.instance().searchParams.get()[key] = value;
    }
    else {
        delete Template.instance().searchParams.get()[key];
    }
}

function setIntFromInput(value, optionalVal){
    if(_.isNumber(optionalVal)){
        if(_.isNumber(value)){
            if(value <= 0){
                return optionalVal;
            }
            return value;
        }
    }
    else if(_.isNumber(value)){
        if(value <= 0){
            return 0;
        }
        return value;
    }
    else {
        return 0;

    }
}

function extractValidSeverity(value){
    if(value){
        let upper = value.toUpperCase();
        if(upper === 'E' || upper === 'I' || upper === 'C' || upper === 'W'){
            return value;
        }
    }
    return '';
}


function updateCheckboxSearchParam(key, value){
    if(value === false){
        delete queryParams[key];
    } else {
        queryParams[key] = 1;
    }
    return value;
}


function extractStringFromInput(value){
    if(value){
        return value;
    }
    else {
        return '';
    }
}

function updateSearchUrl(params, queryParams){
    FlowRouter.go('searchHublogs', params, queryParams);
}

function getEnvironment(){
    //For now always work off the Template
    let template = Template.instance();
    let environment = template.selectedEnvironment.get();
    if(!_.isString(environment.env)){
        template.selectedEnvironment.set({"env": Environments.findOne({}).ENV_CODE});
        return template.selectedEnvironment.get();
    }
    else{
        return environment.env;
    }
}


//Groups = new Mongo.Collection(null);
//​
//Groups.loading = new ReactiveVar(false);
//Groups.loaded = new ReactiveVar(false);
//​
//var oic;
//​
//Groups.updateFromServer = function() {
//    ​
//    let user = Meteor.user();
//    if(user && user.oic && user.oic !== oic) {
//    ​
//        oic = user.oic;
//        Groups.loading.set(true);
//​
//        Meteor.call('getCustomersForOIC', function(err, data) {
//            Groups.remove({});
//            if(!err) {
//                data.forEach(g => Groups.insert(g));
//            } else {
//                console.log(err);
//            }
//​
//            Groups.loading.set(false);
//            Groups.loaded.set(true);
//        });
//    }
//}

//http://stackoverflow.com/questions/2858202/how-to-convert-from-ebcdic-to-ascii-in-c-net
// This converts "00007570{" into "75700", and "000033}" into "-330"
// public static int? ConvertEBCDICtoInt(string i_strAmount)
// {
//     int? nAmount = null;
//
//     if (string.IsNullOrEmpty(i_strAmount))
//         return(nAmount);
//
//     StringBuilder strAmount = new StringBuilder(i_strAmount);
//     if (i_strAmount.IndexOfAny(new char[] { '}', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R' }) >= 0)
//     strAmount.Insert(0, "-");
//
//     strAmount.Replace("{", "0");
//     strAmount.Replace("}", "0");
//     strAmount.Replace("A", "1");
//     strAmount.Replace("J", "1");
//     strAmount.Replace("B", "2");
//     strAmount.Replace("K", "2");
//     strAmount.Replace("C", "3");
//     strAmount.Replace("L", "3");
//     strAmount.Replace("D", "4");
//     strAmount.Replace("M", "4");
//     strAmount.Replace("E", "5");
//     strAmount.Replace("N", "5");
//     strAmount.Replace("F", "6");
//     strAmount.Replace("O", "6");
//     strAmount.Replace("G", "7");
//     strAmount.Replace("P", "7");
//     strAmount.Replace("H", "8");
//     strAmount.Replace("Q", "8");
//     strAmount.Replace("I", "9");
//     strAmount.Replace("R", "9");
//
//     // Convert the amount to a int:
//     int n;
//     if (int.TryParse(strAmount.ToString(), out n))
//     nAmount = n;
//     return (nAmount);
// }

//http://stackoverflow.com/questions/20349491/converting-ebcdic-to-ascii-in-java
// public class EbcdicConverter
// {
//     public static void main(String[] args)
//     throws Exception
// {
//     String ebcdicString =<your EBCDIC string>;
//     // convert String into InputStream
//     InputStream is = new ByteArrayInputStream(ebcdicString.getBytes());
//     ByteArrayOutputStream baos=new ByteArrayOutputStream();
//
//     int line;
//     while((line = is.read()) != -1) {
//     baos.write((char)line);
// }
// String str = baos.toString("Cp500");
// System.out.println(str);
// }
// }