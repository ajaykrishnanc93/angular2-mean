import {Component} from '@angular/core';
import {EventEmitter, Input, Output} from '@angular/core';
@Component({
	selector: 'search',
	templateUrl: 'app/search.html'
 })
 
 export class SearchComponent{
	
    @Input() names: string;
    @Output() namesChange = new EventEmitter();


    change(newValue) {

        console.log('newvalue', newValue)

        this.names = newValue;
        

        this.namesChange.emit(newValue);

    }

}