import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  @Input() productDetails = {name: '',image:'',price:'',description:''};
  constructor(public restApi: RestApiService,public router: Router){}
  ngOnInit(){}
    addProduct(dataProduct: any){
      this.restApi.createProduct(this.productDetails).subscribe((data:{}) => {
        this.router.navigate(['/product-list']);
      
    });
  }
}
