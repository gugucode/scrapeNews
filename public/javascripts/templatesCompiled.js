(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['news/news-blocks'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"row\">\n        <div class=\"col-10\" style=\"background:AliceBlue;margin: 2em\">\n            <div class=\"posts-wrap\" post-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n                <div class=\"portfolio-info\" >\n                    <h4><a href="
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + " target=\"_blank\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></h4>\n                    <p>By "
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</p>\n                    <p>"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.writtenDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</p>\n                    <p>\n                        <a class=\"btn btn-primary\" data-toggle=\"collapse\" href="
    + alias4((helpers.concat || (depth0 && depth0.concat) || alias2).call(alias1,"#news",(depth0 != null ? depth0._id : depth0),{"name":"concat","hash":{},"data":data}))
    + " role=\"button\" aria-expanded=\"false\" >\n                            Detail\n                        </a>\n                    </p>\n                    <div class=\"collapse\" id="
    + alias4((helpers.concat || (depth0 && depth0.concat) || alias2).call(alias1,"news",(depth0 != null ? depth0._id : depth0),{"name":"concat","hash":{},"data":data}))
    + ">\n                        <div class=\"card card-body\">\n                            <p>"
    + alias4(((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summary","hash":{},"data":data}) : helper)))
    + "</p>\n                            <img src="
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + " style=\"width:40%\"/>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.news : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});
})();