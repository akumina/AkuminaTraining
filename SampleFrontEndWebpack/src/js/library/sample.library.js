var Sample = {
    namespace: function (ns_string) {
        var parts = ns_string.split('.'), parent = Sample, i;
        if (parts[0] === "Sample") {
            parts = parts.slice(1);
        }
        for (i = 0; i < parts.length; i += 1) {
            if (typeof parent[parts[i]] === "undefined") {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    }
};


Sample.namespace('Sample.Widgets');

//This is not used in PROD, we use individual files
//Sample.Widgets.SampleWidget = require('../widgets/samplewidget.js');