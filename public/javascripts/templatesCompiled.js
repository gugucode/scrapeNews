(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['commentblocks'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<div class=\"row justify-content-md-center\">\n    <div class=\"col-9\" style=\"background:AliceBlue;margin: 2em\">\n        <div class=\"userInfo\" >\n            <h6 style=\"font-weight: bold;\">"
    + alias4(((helper = (helper = helpers.postUser || (depth0 != null ? depth0.postUser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postUser","hash":{},"data":data}) : helper)))
    + "</h6>\n            <p style=\"font-style: italic;\">"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.postDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</p>\n        </div>\n        <div class=\"comment\">\n            <p>"
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</p>\n        </div>\n    </div>\n    <div class=\"col-1\">\n        <button type=\"button\" class=\"btn btn-outline-danger delBnt\" comment-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">Delete</button>\n    </div>\n</div>\n";
},"useData":true});
})();