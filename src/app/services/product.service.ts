import { Injectable } from '@angular/core';
import {AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestoreService: AngularFirestore
  ) { }

  public async getProducts() : Promise<any>{
    try {
      const products = await this.firestoreService.collection("products").get().toPromise().then(
        querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data = doc.data() as any;
            return {
              _id: doc.id,
              ...data
            }
          })
        }
      );
      return products;
    } catch (error) {
     Promise.reject(error);
    }
  }
}
