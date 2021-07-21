import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'brand', 'image', 'amount', 'currencyType'];
  data:any;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private productService: ProductService
  ) {
  }


  //TODO: Agregar registros en el FireBase en la colección de products.
  //TODO: Mostrar la data de la colección products en la página web.
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().then(products =>{
      console.log(products);
      this.data = products;
      this.dataSource  = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
}