import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  
  id = this.actRoute.snapshot.params['id'];
  productData!:FormGroup;
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder 
  ){}


  ngOnInit(){
    this.productData = this.fb.group({
      id:[],
      name:[],
      image:[],
      price:[],
      description:[]
    })

    this.restApi.getProduct(this.id).subscribe((data:any)=> {
      this.productData.setValue(data);
    })
  }

  updateProduct(){
    if(window.confirm('Are you sure,you want to update?')){
      this.restApi.updateProduct(this.id, this.productData.value).subscribe(data => {
        this.router.navigate(['/product-list'])
      })
    }
  }
}
