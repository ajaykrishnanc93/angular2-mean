import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './search';
import {AppComponent} from './app.component';

import {HomeComponent} from './home.component';

@NgModule({
    imports: [BrowserModule,
    		  RouterModule.forRoot(ROUTES),
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule],
    declarations: [AppComponent,SearchComponent,
  
    			   
    			   HomeComponent],
    bootstrap: [AppComponent]
})

export class AppModule {}