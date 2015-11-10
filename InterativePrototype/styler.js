/* NOTE: Yes! this is a TERRIBLE way to apply this, it's just a quick prototype.
         End product will envolver CANVAS rendering if the idea is a good to go.
         and possibly the use of react.js since it uses virtual doms and it's
         unargueably faster when it comes to rendering in the browser. */
         
$(document).ready(function() {
    
    $("body").mousemove(function(e) {
        
        var span = $("<span/>",{"class":"randomGenerated"});
        
        span.css({
            "left": e.pageX - 1,
            "top": e.pageY,
            "display": "inline-block",
            "position": "absolute"
        });
        
        $(".main-content").append(span);
        
        setTimeout(function() {
            
            $(".randomGenerated:first-child").remove();
  
        },1000);

    });
    
});