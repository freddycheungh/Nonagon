(function($) {

    /* *****************************************
     *  Key         		Code
     * Backspace            8
     * Tab              	9
     * Arrow(left)          37
     * Arrow(right)         39
     * Delete           	46
     * Num (0-9)            48 - 57
     * Num (0-9) NumPad     96 - 105
     * Decimal dot (NumPad) 110
     * Period          		190
     * Dash / Minus 		173 / 109
     * ****************************************/

      $.fn.numberfield = function() {

        return this.each(function(index, element) {

            formatComma(this);

            $(element).bind('keydown',function(event) {
                var a               = $(this).val().split(".");
                var array           = new Array();                              //Array to store Entire numbers and Decimals
                var charCode        = event.which ? event.which : event.keyCode;//gets the event code for the key pressed.
                var curPos          = $(this).getCursorPosition();              //gets the current position
                var decDotPos       = $(this).val().indexOf('.');               //Gets the position of the decimal dot
                var decimalPoint    = 0;                                        //Decimal point will be 1 if it exist
                var decimalCount    = 0;                                        //Stores how many decimals are in used
                var maxNaturalCount = 0;                                        //Stores the maximum number of entire digit.
                var maxDecimalCount = 0;                                        //Stores the maximum number of decimals allowed.
                var naturalCount    = 0;                                        //Stores how many entire numbers are in used
                var negative        = 0;										//Allows negative value
                var rateInd         = 0;                                        //Indicates the limit of the maximum number of entire number and decimals
                var retVal          = true;                                     //return value
                var temp            = 0;                                        //Temporary variable that will store the maximum amount of entire numbers
                var val             = $(this).val();
                var numOnly         = 0;
                var selectedText    = SelectedText(this);
                var yearOnly		= 0;									    //Year indicator
                var percentage 		= 0;
                var dashChar        = false;									//Keeps track of the dash key - NOTE that it's different with every browser.

                dashChar = (charCode == 173 || charCode == 109 || charCode == 189 ? true : false);

                curPos = parseInt(curPos);

                if (charCode == 37)
                    curPos = parseInt(curPos) - 1;
                else if (charCode == 39)
                    curPos = parseInt(curPos) + 1;

                if(selectedText == true )
                {
                    if ((charCode == 46 || charCode == 8 || charCode == 9) || (charCode > 96 && charCode < 105) || (charCode > 48 && charCode < 57 ))
                        return true;
                }

                /*Check for which type of format is required*/
                if ($(this).hasClass("numberOnly"))	//for Account numbers MAX:15 numbers
                    numOnly = 1;

                if($(this).hasClass("rate"))    //Looks for an specific class, if it contains a RateMasking in the input textbox, it will set the rateInd to active.
                    rateInd = 1;

                if($(this).hasClass("year"))	//for years MAX:4 numbers
                    yearOnly = 1;

                if($(this).hasClass("negative"))	//Negative indicator - Allows negative value to be inputted
                    negative = 1;

                if($(this).hasClass("percentage"))
                    percentage = 1;
                /*-----------------------------------------*/

                /*set the maximum natural number and decimals allowed*/
                if (rateInd == 1)               //If rate exists, it will set the limit to 2 entire numbers and 3 decimals
                {
                    if ($(this).val().indexOf("-") != -1 )
                        maxNaturalCount = 5;
                    else
                        maxNaturalCount = 4;

                    maxDecimalCount = 3;
                }
                else if (numOnly == 1)
                {
                    maxNaturalCount = 16;
                }
                else if (yearOnly == 1)
                {
                    maxNaturalCount = 5;
                }
                else if (percentage == 1){
                    maxNaturalCount = 4;
                    maxDecimalCount = 2;
                }
                else                            //otherwise, it will be by default 9 entire numbers and 2 decimals
                {
                    maxNaturalCount = 12;
                    maxDecimalCount = 2;
                }
                /*----------------------------------------*/
                temp = maxNaturalCount;         //temp gets the value of maxNaturalCount
                if ($(this).val().indexOf(".") != -1)       //If contains a decimal dot
                {
                    array = val.split(".");
                    decimalPoint++;
                    naturalCount = array[0].length;
                    decimalCount = array[1].length;
                }
                //Prevents the user to enter two times the decimal dot.
                if ((charCode == 190 || charCode == 110) && decDotPos != -1)
                    return false;

                if (negative == 1 && $(this).val().indexOf("-") != -1 && curPos == 0 && charCode != 37 && charCode != 39 && charCode != 46)
                    return false;

                // Prevent the user from deleting the decimal dot if there are 9 integers and 2 decimals
                if (decDotPos != -1 && naturalCount == (maxNaturalCount -1) && decimalCount == maxDecimalCount && curPos == decDotPos + 1 && charCode == 8)
                    return false;

                if (decDotPos != -1 && naturalCount == (maxNaturalCount -1) && decimalCount == maxDecimalCount && curPos == decDotPos && charCode == 46)
                    return false;

                if (numOnly == 0)
                {
                    if (a[0].replace(/,/g,"").length > 9)
                    {
                        if (charCode != 8 && charCode != 46 && charCode != 37 && charCode != 39 && charCode != 9 && selectedText != true && charCode != 190 && charCode != 110 )
                        {
                            if (decDotPos != -1)
                            {
                                if (curPos <= decDotPos)
                                    return false;
                            }
                            else
                                return false;
                        }
                        else
                        {
                            if (selectedText && (charCode == 46 || charCode == 8 || charCode == 9) || (charCode > 96 && charCode < 105) || (charCode > 48 && charCode < 57 ))
                                return true;

                            if ((charCode == 110 || charCode == 190) || (charCode == 46 || charCode == 8 || charCode == 9) || (charCode > 96 && charCode < 105) || (charCode > 48 && charCode < 57 ))
                                return true;
                        }
                    }
                }

                if (rateInd == 1)
                {
//                	if (!selectedText && curPos < decDotPos && (charCode != 46 && charCode != 8))
//                	{
//                		return false;
//                	}
                    if (negative == 1)
                    {
                        // limit only "-" when two whole number is placed
                        if ((naturalCount + 1) == 3 && curPos == 0 && !dashChar && charCode != 37 && charCode != 39)
                            return false;
                    }

                    if (decDotPos == -1 && charCode == 110 || charCode == 190)
                        return true;

                    if (decDotPos != -1 && decimalCount != 0 && curPos == decDotPos + 1 && charCode == 8)
                        return false;

                    if (decDotPos != -1 && decimalCount == maxDecimalCount && naturalCount == 0 && curPos == decDotPos && charCode == 46)
                    {
                        if (a[1] == "000")
                        {
                            $(this).val("");
                            return true;
                        }
                    }
                    if (decDotPos != -1 && decimalCount != 0 && curPos == decDotPos && charCode == 46)
                        return false;
                }
                // Always return true if right/left arrow are pressed as well as TAB
                if (charCode == 37 || charCode == 39 || charCode == 9)
                    return true;

                if (val.indexOf(".") == -1)     //If NOT contains a decimal dot
                    naturalCount = val.length;

                if (numOnly == 0 && naturalCount == 10 && decDotPos != -1)   //prevents the user from entering more than 9 entire numbers when a decimal point is available.
                {
                    if (curPos <= decDotPos && charCode != 8 && charCode != 46)
                        retVal = false;
                }

                if (naturalCount >= (temp - 2) && charCode != 46 && charCode != 8)
                {
                    naturalCount += 1;          //Adds one assuming it's the next record. If next record does not reach the limit, then will allow the user to keep adding
                    if(naturalCount == (temp - 1))
                    {
                        if ((charCode > 48 || charCode < 57) || (charCode < 96 || charCode > 105))
                            retVal = true;
                        else
                            retVal = false;
                    }

                    if(naturalCount == maxNaturalCount && val.indexOf(".") == -1)   //If the last character (10 is considered as the limit) is not a decimal dot
                        retVal = false;
                    if (selectedText)           //If the whole data in the text box is selected
                        retVal = true;
                }

                if (decimalPoint != 0)          // if decimals are available
                {
                    if (decimalCount == maxDecimalCount && charCode != 8 && charCode != 46 && charCode != 37 && charCode != 39) //If two decimals are placed AND the current keyboard entry is not a backspace
                    {   //If there aren't 7 entire numbers (non-decimal) it will allow the user to keep adding more entire numbers but not decimals
                        if (naturalCount <= maxNaturalCount  && curPos <= decDotPos)
                            retVal = true;

                        if (naturalCount == maxNaturalCount && decimalCount == maxDecimalCount && charCode != 8 && charCode != 46 && selectedText != true)
                            retVal = false;
                        //If there are two decimals and the cursor position is standing at the decimal point, it will not allow the user to enter another decimal
                        else if (decDotPos < curPos && decimalCount == maxDecimalCount)
                            retVal = false;
                        else
                            retVal = true;
                    }
                    if (rateInd == 0)       //If rate indicator is inactive/not found.
                    {
                        //If only one decimal is present
                        if (decimalCount == 1 && charCode != 8 && charCode != 46)
                        {
                            //Check the cursor position, as long as it is not greater than ten, user will be allow to keep inputting numbers
                            if (curPos <= decDotPos && naturalCount < maxNaturalCount)
                                retVal = true;

                            //If the numbers reaches the limit, it will stop adding.
                            if (curPos <= decDotPos && naturalCount == maxNaturalCount)
                                retVal = false;
                        }
                    }
                    if (rateInd == 1)   //If rate indicator is active
                    {
                        if (decDotPos != -1 && charCode != 8 && charCode != 46)
                        {
                            //Check the cursor position, as long as it is not greater than the max amount of number allowed, user will be allow to keep inputting numbers
                            if (curPos == 0 && negative == 1 && dashChar)
                                retVal = true;

                            if (curPos <= decDotPos && naturalCount < maxNaturalCount)
                                retVal = true;

                            //If the numbers reaches the limit, it will stop adding.
                            if (curPos <= decDotPos && naturalCount == maxNaturalCount)
                                retVal = false;
                        }
                    }
                }

                if (numOnly == 1)
                {
                    if (charCode != 46 && charCode != 8 && charCode != 9 && charCode > 31 && (charCode < 96 || charCode > 105) && (charCode < 48 || charCode > 57) && (charCode < 37 || charCode > 40))
                        retVal = false;
                }

                if (numOnly == 0 && (charCode != 110 && charCode != 190) && (charCode != 46 && charCode != 8) && charCode != 9 && charCode > 31 && (charCode < 96 || charCode > 105) && (charCode < 48 || charCode > 57 ) && (charCode < 37 || charCode > 40))
                    retVal = false;

                /*Negative Value*/
                if (negative == 1 && dashChar)
                {
                    if (dashChar && $(this).val().indexOf("-") != -1)
                        return false;

                    if (rateInd == 1)
                        if (curPos == 0 )
                            retVal = true;

                    if (rateInd == 0)
                        if (curPos == 0 )
                            retVal = true;
                }

                return retVal;

            });

            $(element).bind('focus',function() {

                if (!$(this).hasClass("cssreadonly"))
                {
                    if ($(this).val() == "0.00" || $(this).val() == "0.000" || $(this).val() == "0")
                        $(this).val("");

                    $(this).val($(this).val().replace(/,/g,""));
                }

            });

            $(element).bind('blur',function() {

                var array      = new Array();
                var zeroCheck  = new Array();
                var str        = $(this).val().replace(/,/g,"");
                var decimalDot = str.indexOf(".");
                var holder     = '';
                var temp       = '';
                var i          = 0;
                var rateInd    = 0;
                var zero       = 0;
                var minus      = "";	//holds the minus sign
                var b          = "";	//temporary holds the value separated from the minus sign

                if ($(this).val() == "0.00" || $(this).val() == "0.000")    // fixes a bug, for instance 0.000 or 0.00 is entered
                    return $(this).val();

                if ($(this).hasClass("numberOnly"))
                    return false;

                if ($(this).hasClass("year"))
                    return false;

                if ($(this).hasClass("rate"))
                    rateInd = 1;

                array[0] = "0";             //Default value if user does not provide an amount

                if (rateInd == 1)
                    array[1] = ".000";
                else
                    array[1] = ".00";       //Default decimal value if user does not provide an amount

                if (str.indexOf(".") != -1) //if there is a decimal dot
                {
                    array = str.split(".");
                    temp = array[0];
                }
                else
                    temp = $(this).val();

                // Separate the negative sign and re adds it at the bottom
                if (temp.indexOf("-") != -1)
                {
                    b = temp.split("-");
                    temp = b[1];
                    if (temp != "0" || (temp == "0" && decimalDot != -1))
                        minus = "-";
                }

                zeroCheck = temp.split("");

                temp = temp.replace(/\s/g, "");

                if (zeroCheck[0] == "0")    // && temp.length > 1
                {
                    for (i ; zeroCheck[i] == "0" ; i++)
                    {
                        zero += 1;
                    }

                    if (zero != 0)
                    {
                        for (i; i < temp.length; holder += zeroCheck[i], i++) {}

                        temp = holder;
                    }
                }
                if (temp == "")     //Will check if the user enters .01, it will append a 0 so it will look liked 0.01
                    temp = "0";

                switch (temp.length)
                {
                    case 4:
                        temp = temp.splice(1,0,",");
                    break;
                    case 5:
                        temp = temp.splice(2,0,",");
                    break;
                    case 6:
                        temp = temp.splice(3,0,",");
                    break;
                    case 7:
                        temp = temp.splice(1,0,",");
                        temp = temp.splice(5,0,",");
                    break;
                    case 8:
                        temp = temp.splice(2,0,",");
                        temp = temp.splice(6,0,",");
                    break;
                    case 9:
                        temp = temp.splice(3,0,",");
                        temp = temp.splice(7,0,",");
                    break;
                    case 10:
                        temp = temp.splice(1,0,",");
                        temp = temp.splice(5,0,",");
                        temp = temp.splice(9,0,",");
                    break;
                }

                if (array[1] == "" && temp != "" && rateInd == 0)       //If the user only provides a whole number plus a decimal dot
                    $(this).val(minus+temp + ".00");

                else if (array[1] == "" && temp != "" && rateInd == 1)  //If the user only provides a whole number plus a decimal dot (for rate)
                    $(this).val(minus+temp + ".000");

                else if (temp == "" && array[1] == "" && rateInd == 0)  //If the user only inputs a decimal dot
                    $(this).val("0.00") ;

                else if (temp == "" && array[1] == "" && rateInd == 1)  //If the user only inputs a decimal dot (for rate)
                    $(this).val("0.000");

                else if (array[1].length == 1 && rateInd == 0)          //If user enters one decimal only
                    $(this).val(minus+temp + "." + array[1] + "0");

                else if (array[1].length == 1 && rateInd == 1)          //If user enters one decimal only (for rate)
                    $(this).val(minus+temp + "." + array[1] + "00");

                else if (array[1].length == 2 && rateInd == 1)          //If user enters two decimals (for rate)
                    $(this).val(minus+temp + "." + array[1] + "0");

                else if (array[1] != ".00" && rateInd == 0)             //If no decimal was entered
                    $(this).val(minus+temp + "." + array[1]);

                else if (array[1] != ".000" && rateInd == 1)            //If no decimal was entered (for rate)
                    $(this).val(minus+temp + "." + array[1]);

                else if (temp == "")                                    //If Nothing was entered
                    $(this).val(array[0] + array[1]);

                else
                    $(this).val(minus+temp + array[1]);                 //If everything is entered

            });

        }); // return this.each(function(index, element)

    } // $.fn.numberfield = function()

    $(document).ready(function() {
        $('input.masker').numberfield().css("text-align","right");
    });

})(jQuery);

/____________________________________________/

function SelectedText(input){
    var startPos = input.selectionStart;
    var endPos = input.selectionEnd;
    var doc = document.selection;

//    /* Text Selection for rates */
//    if ((startPos == 0 && endPos > (input.value.length - 2)) || (startPos == 0 && endPos < (input.value.length - 3)) )
//    	return true;
//    if ((startPos == 1 && endPos > (input.value.length - 1)) || (startPos == 1 && endPos < (input.value.length - 2)) )
//    	return true;
//    //-------------------------//
    if (input.value.substring(startPos,endPos).length == input.value.length && endPos != 0)
    {
        return true;
    }
    return false;
}


/_____________________________________________/

/*----------- String.prototype.splice -----------*/
/* Will create a custom splice function. This splice will be used to format the value
 * by adding commas in the respective place. Normally splice will only work on arrays.*/
String.prototype.splice = function( idx, rem, s )
{
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

/*-------------- $.fn.getCursorPosition; ------------- */
/* Will be used to get the cursor position. In the context of the decimal masking, it will be used
 * to determine how many entire numbers and decimals are in a text box. */
$.fn.getCursorPosition = function() {
    var el = $(this).get(0);
    var pos = 0;        //Starting position (cursor)
    var posEnd = 0;     //Ending position (cursor)
    if('selectionStart' in el)
    {
        pos = el.selectionStart;
        posEnd = el.selectionEnd;
    }
    else if('selection' in document)
    {
        el.focus();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length - SelLength;
        posEnd = Sel.text.length;
    }
    return [pos, posEnd];
}

/*-------------- isTextSelected(input) ------------- */
/* Used to determine if the entire data is selected. This will avoid the textbox to freeze when the
 * user wants to select all the entire data and delete it. */
function isTextSelected(input) {
    if (typeof input.selectionStart == "number")
    {
        return input.selectionStart == 0 && input.selectionEnd == input.value.length;
    }
    else if (typeof document.selection != "undefined")
    {
        input.focus();
        return document.selection.createRange().text == input.value;
    }
}

/*-------------- formatComma(input) ------------- */
/* Will format the number input and put a comma into the respective 100. Will also fill
 * the decimal zeros if user does not provide a decimal.*/
function formatComma(input)
{
    var array      = new Array();
    var b          = "";						//Holds temporary the separated value from the minus sign
    var decimalDot = input.value.indexOf(".");
    var holder     = '';
    var i          = 0;
    var minus      = "";
    var temp       = '';
    var rateInd    = 0;

    if (input.value == "0.00" || input.value == "0.000")	// fixes a bug, for instance 0.000 or 0.00 is entered
        return input;

    if (input.className.indexOf("numberOnly") != -1)
        return false;

    if (input.className.indexOf("year") != -1)
        return false;

    if ($(input).hasClass("rate"))
        rateInd = 1;

    array[0] = "0";	//Default value if user does not provide an amount

    if (rateInd == 1)
        array[1] = ".000";
    else
        array[1] = ".00"; //Default decimal value if user does not provide an amount

    if (decimalDot != -1)	//if there is a decimal dot
    {
        array = input.value.split(".");
        temp = array[0].replace(/,/g,""); // remove any existing commas before processing
    }
    else
        temp = input.value.replace(/,/g,""); // remove any existing commas before processing

    //Separate the negative sign
    if (temp.indexOf("-") != -1)
    {
        b = temp.split("-");
        temp = b[1];
        if (temp != "0" || (temp == "0" && decimalDot != -1))
            minus = "-";
    }

    temp = temp.replace(/\s/g, "");

    /* If the first digit in the value is a 0, then count all the leading
     * zeroes and remove them. */
    if (temp[0] == "0" && decimalDot == -1)	// && temp.length > 1
    {
        for (i ; temp[i] == "0" ; i++){}

        temp = temp.substring(i);
    }

    if (temp == "")		//Will check if the user enters .01, it will append a 0 so it will look liked 0.01
        temp = "0";

    switch (temp.length)
    {
    case 4:
        temp = temp.splice(1,0,",");
        break;
    case 5:
        temp = temp.splice(2,0,",");
        break;
    case 6:
        temp = temp.splice(3,0,",");
        break;
    case 7:
        temp = temp.splice(1,0,",");
        temp = temp.splice(5,0,",");
        break;
    case 8:
        temp = temp.splice(2,0,",");
        temp = temp.splice(6,0,",");
        break;
    case 9:
        temp = temp.splice(3,0,",");
        temp = temp.splice(7,0,",");
        break;
    case 10:
        temp = temp.splice(1,0,",");
        temp = temp.splice(5,0,",");
        temp = temp.splice(9,0,",");
        break;
    }

	if (array[1] == "" && temp != "" && rateInd == 0)		//If the user only provides a whole number plus a decimal dot
        input.value = minus+temp + ".00";

    else if (array[1] == "" && temp != "" && rateInd == 1)	//If the user only provides a whole number plus a decimal dot (for rate)
        input.value = minus+temp + ".000";

    else if (temp == "" && array[1] == "" && rateInd == 0)	//If the user only inputs a decimal dot
        input.value = "0.00";

    else if (temp == "" && array[1] == "" && rateInd == 1)	//If the user only inputs a decimal dot	(for rate)
        input.value = "0.000";

    else if (array[1].length == 1 && rateInd == 0)			//If user enters one decimal only
        input.value = minus+temp + "." + array[1] + "0";

    else if (array[1].length == 1 && rateInd == 1)			//If user enters one decimal only (for rate)
        input.value = minus+temp + "." + array[1] + "00";

    else if (array[1].length == 2 && rateInd == 1)        	//If user enters two decimals (for rate)
        input.value = minus+temp + "." + array[1] + "0";

    else if (array[1] != ".00" && rateInd == 0)				//If no decimal was entered
        input.value = minus+temp + "." + array[1];

    else if (array[1] != ".000" && rateInd == 1)            //If no decimal was entered (for rate)
    	input.value = minus+temp + "." + array[1];

    else if (temp == "")									//If Nothing was entered
        input.value = array[0] + array[1];

    else
        input.value = minus+temp + array[1];				//If everything is entered

}
/*-------------- replaceComma(input) ------------- */
/* Replaces the commas formatted value (the value formatted when the form is loaded) into spaces. This will
 * only be called when the user clicks on the textbox and is ready to edit the field*/
function replaceComma(input)
{
    var str = input.value;

    /* Omit 0 decimal feature (for later release IF needed)*/
    /*var temp = str;
    var array = new Array();
    if (temp.split(".") != -1)
        array = temp.split(".");
    if ((array[1] == "00" && array[0] == "0") || (array[0] == "0" && array[1] == "000")) {

        if(array[1] == "00")
            str = str.replace("0.00","");
        if (array[1] == "000")
            str = str.replace("0.000","");
    }
    if (array[1] == "00" || array[1] == "000") {

        if(array[1] == "00")
            str = str.replace(".00","");
        if (array[1] == "000")
            str = str.replace(".000","");
    }
    */

    str = str.replace(/,/g,"");
    input.value = str;
    input.selectionStart = str.length;
}