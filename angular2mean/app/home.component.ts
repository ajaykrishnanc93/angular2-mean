import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';


import {OrderBy} from './pipes';

@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
 
 pipes: [OrderBy]
})

export class HomeComponent implements  OnInit {

 
	private books = [];
	private options = new RequestOptions(
	{ 
	headers: new Headers(
	{ 
	'Content-Type': 'application/json',
	 'charset': 'UTF-8' })
	 });

	private isEditing = false;
	private isSearching = false;
	private isAdding = false;
	private book = {};

	private infoMsg = { body: "", type: "info"};

	private addBookForm: FormGroup;
	private bname = new FormControl("", Validators.required);
	private author = new FormControl("", Validators.required);
	private pages = new FormControl("", Validators.required);

	constructor(private http: Http, private formBuilder: FormBuilder) {}

  ngOnInit() {
		this.addBookForm = this.formBuilder.group({
			bname: this.bname,
			author: this.author,
			pages: this.pages
		});

		this.loadBooks();
	}

	loadBooks() {
		this.http.get("/books").map(res => res.json()).subscribe(
			data => this.books = data,
			error => console.log(error)
		);
	}

	
	 
	 enableEditing(book) {
		this.isEditing = true;
		this.book = book;
	}

	cancelEditing() {
		this.isEditing = false;
		this.book = {};
		
		this.loadBooks();
	}

	enableSearching(name){
		this.isSearching = true;
		this.http.get("/books/"+name).map(res => res.json()).subscribe(
			data => this.books = data,
			error => console.log(error)
		);
	}
	
	
	submitEdit(book) {
		this.http.put("/book/"+book._id, JSON.stringify(book), this.options).subscribe(
			res => {
				this.isEditing = false;
				this.book = book;
				},
			error => console.log(error)
		);
	
	}

    submitRemove(book) {
		var delOptions = new RequestOptions({
			body: '', 
			headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })}
		);
		if(window.confirm("Do you want to permanently delete this item?")) {
			this.http.delete("/book/"+book._id, delOptions).subscribe(
				res => {
					var pos = this.books.map((e) => { return e._id }).indexOf(book._id);
					this.books.splice(pos, 1);
					
				},
				error => console.log(error)
			);
		}
	}

	
	enableAdding() {
		this.isAdding = true;
		this.book = {};
		
		this.loadBooks();
	}
    cancelAdd() {
		this.isAdding = false;
		this.book = {};
		this.loadBooks();
	}
	
	cancelSearch() {
		this.isSearching = false;
		this.book = {};
		this.loadBooks();
	}
	
	
	submitAdd() {
		this.http.post("/book", JSON.stringify(this.addBookForm.value), this.options).subscribe(
			res => {
				this.books.push(res.json()); 
				this.addBookForm.reset();
			},
			error => console.log(error)
		);
	}
	
	
} 


 
 
 
 
 
 
 