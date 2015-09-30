function selection_sort(array) {
	
	var index = 0;
	var length = array.length;
	var temp;

	while (index < length) {
		
		temp = array[index];

		for (var i = index; i < length; i++) {
		
			if (temp > array[i]) {
				
				temp = array[i]

			}
			
		}

		array[array.indexOf(temp)] = array[index];
		array[index++] = temp;
		
	}
	
	return array;

}

/* Paste below in the browser's console log */

var arr = [5, 2, 1, 7, 3, 9];

/* Should print arr[1,2,3,5,7,9]*/

console.log(selection_sort(arr));
