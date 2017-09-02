/**
 * Created by adm9360 on 25/08/2016.
 */
BrowserPolicy.content.allowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();

var trusted = [
    '*.googleapis.com',
    '*.gstatic.com',
    'ajax.googleapis.com',
    '*.bootstrapcdn.com'
];

_.each(trusted, function(origin) {
    origin = "https://" + origin;
    BrowserPolicy.content.allowOriginForAll(origin);
});

BrowserPolicy.framing.allowAll();