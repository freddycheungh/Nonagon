/* NOTE: Yes! this is a TERRIBLE way to apply this, it's just a quick prototype.
         End product will involve CANVAS rendering if the idea is a good to go
         and possibly the use of react.js since it uses virtual doms which is
         unargueably faster when it comes to rendering in the browser. */
         
$(document).ready(function() {
    
    $(".main-content").mousemove(function(e) {
        
        var span = $("<span/>",{"class":"randomGenerated"});
        
        span.css({
            "left": e.pageX - 1,
            "top": e.pageY,
            "display": "inline-block",
            "position": "absolute"
        });
        
        $(".main-content").append(span);
        
        setTimeout(function() {
            
            $("span:first-child").remove();
  
        },1000);

    });
    
});
