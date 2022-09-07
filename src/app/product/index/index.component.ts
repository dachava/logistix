import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  prods: Product[] = [];

  // constructor() { }
  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: Product[]) => {
      this.prods = data;
      console.log(this.prods);
    });
  }

  deleteProduct(id: any) {
    this.productService.delete(id).subscribe((res) => {
      this.prods = this.prods.filter((item) => item.id !== id);
      console.log('Product deleted successfully!');
    });
  }
}
