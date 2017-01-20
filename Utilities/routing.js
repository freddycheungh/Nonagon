var router = router || {};

(function (scope) {

	/* Change this to service from your localhost */
	//var provider = "http://localhost:8080/";

	var map = function (view) {
		
	    // Holds the path of the view/hmtl
	    var path;
	    // Holds the path and the file name that it's going to be appended to the view/html
	    var jsFile;
	    // Holds the identifier (parent) element to which the JS will be loaded to
	    var appendTo;
            
	    var root = document.location.origin + document.location.pathname;
	
	    switch (view) {

	        case "project-nonagon" :
		    path = root + "views/project-nonagon.html"; //html name
		    jsFile = root + "js/project-nonagon.js";    //javascript/controller name
		    appendTo = "project-nonagon";               //identifier (where it will be appended to)
		break;
			
                case "project-undecagon" :
		    path = root + "views/project-undecagon.html"; //html name
		    jsFile = root + "js/project-undecagon.js";    //javascript/controller name
		    appendTo = "project-undecagon";               //identifier (where it will be appended to)
		break;
            
		default:
		    console.log("Invalid view");
		break;

	    }

	    return {
	        path,
	        jsFile,
		appendTo
	    };

	};

	/* Creates the script tag that will be appended to the corresponding views. */
	var addRespectiveJs = function (obj) {

	    if (!obj.jsFile || !obj.appendTo) return false;
		
	    var script = document.createElement('script');
		
	    script.type = 'text/javascript';
	    script.src = obj.jsFile;

	    document.getElementById(obj.appendTo).appendChild(script);

	};

	/* Called in the href of the link or button.
	 * Determines which view to go/flow.
	   - The variable page is the page/view that is about to be loaded. */
	scope.draw = function (page) {
		
	    var location = map(page);
    
	    $("#content-holder").empty().load(location.path, function() {

	    addRespectiveJs(location);

            //if want, we can check for history.state.view here
            if (document.location.pathname != "/") {

                var url = document.location.href.substr(0, document.location.href.lastIndexOf("/") + 1) + page;
                history.replaceState({view: page}, null, url);
                
            }
            
            else {
                
                var url = document.location.href + (document.location.pathname != "/" ? "/" : "") + page;
                history.pushState({view: page}, null, url);

            }
			
	});

    };

    /* Acts as the workflow for the window's on pop state.*/
    scope.back = function (evt) {
        
        var state = evt.state;

        // state determins whether there's a history state or not
        if (state && state.view) {

            router.draw(state.view);

        }
        
    };
    
    /* Initialize any event handlers*/
    scope.init = function () {
        
        window.onpopstate = function(e) {

            router.back(e);
        
        }
        
    };
    
}(router));
