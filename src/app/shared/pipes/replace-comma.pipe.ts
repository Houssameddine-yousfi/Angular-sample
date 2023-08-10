
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'replaceComma'
})

export class ReplaceComma implements PipeTransform{



  transform(value: string | null) : string {
    if(!!value){
      return value.replace(/,/g, '.');
    }
    return '';
  }

}
