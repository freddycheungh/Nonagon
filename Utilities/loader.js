var loader = loader || {};

(function(scope) {

	var _body;

	var create = function(config) {

		var content;
        
		if (config.type !== "overlay") {
            /*  NOTE:
                If a gif is being used, simply create a ElementNode for an <img> and add in the
                element's src attribute. 
            */    
            content = document.createElement("div");
            // Deduct the height of the gif/img/css Loader.
            content.style.marginTop = (document.body.offsetHeight/2 - 80) + "px";
            content.className = "loader";
            
		}

		_body = document.createElement("div");
		_body.className = "overlay";
		_body.style.width = config.element.offsetWidth + "px";
		_body.style.height = config.element.offsetHeight + "px";
        _body.style.backgroundColor = "rgba(0,0,0,0.7)";
        _body.style.zIndex = "1000";
        _body.style.position = "absolute";
        _body.style.top = "0";

		if (content) {

			_body.appendChild(content);
			content = "";

		}
		
	};

	scope.add = function(config) {
  
		create(config);
 
		config.element.appendChild(_body);
		
		_body = "";

	};
    
	scope.remove = function() {

		var el = document.body.querySelectorAll(".overlay");
		
		if (el[0]) {
			
			el[0].parentNode.removeChild(el[0]);
			
		}
		
		el = "";

	};

}(loader));

/* Usage :
    loader.add({
        element: document.body, 
        type: "loader"
    });
*/
