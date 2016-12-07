import {Pipe} from "@angular/core";

@Pipe({
	name: "filterOptions"
})
//this filters out duplicates then sorts it alphabetically
export class SearchPipe {
	transform(array:Array<any>, args?){
		if(array){		
			array = array.filter(function(elem, index, self){
				return index === _.map(self, 'key').indexOf(elem.key)
			})

			array.sort((a: any, b: any) => {
		    	let value1 = a.value.toLowerCase();
		    	let value2 = b.value.toLowerCase();
		    	//handle add new 
		    	value1 = value1 === "add new" ? "000" : value1;
		    	value2 = value2 === "add new" ? "000" : value2;
		    	//compare values
		    	if(value1 < value2) return -1;
		    	if(value1 > value2) return 1;
		    });
		}
		return array;
	}
}