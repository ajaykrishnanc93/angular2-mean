import { Pipe, PipeTransform } from '@angular/core';
import {Injectable} from '@angular/core';
@Pipe({
    name: 'myfilter',
    pure: false
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
    transform(books: any[], args: any[]): any {
        
        return books.filter(book => book.bname.indexOf(args[0].bname) !== -1);
    }
}