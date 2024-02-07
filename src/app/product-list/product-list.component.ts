import { Component } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { debounceTime } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  Product: any = [];
  searchForm!: FormGroup;
  constructor(public restApi: RestApiService,private fb:FormBuilder){}
  ngOnInit(){
    this.searchForm=this.fb.group({
      searchText:[]
    })
    this.loadProducts();
}
loadProducts(){
  return this.restApi.getProducts().subscribe((data:{}) => {
    this.Product = data;
  });
}

deleteProduct(id:any){
  if(window.confirm('Are you sure, you want to delete?')){
    this.restApi.deleteProduct(id).subscribe((data) => {
      this.loadProducts();
    })
  }
}


onSearchTextChange(event:any){
  console.log('event fired');
  
  this.searchForm.controls['searchText'].valueChanges
  .pipe(debounceTime(500))
  .subscribe(()=> {
    console.log('hghh');
    
    if(this.searchForm.controls['searchText'].value.length > 2){
      const searchedBooks = this.Product?.filter((b:any) => b.name.toLowerCase().startsWith(event.target.value))
      console.log('searchedBooks', searchedBooks);
      this.Product = searchedBooks;
    }
    if(this.searchForm.controls['searchText'].value.length == 0){
      this.Product =this.loadProducts();
    }
  })
}

}