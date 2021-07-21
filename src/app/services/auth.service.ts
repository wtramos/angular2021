import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { NetWorkResponse } from "../models/Network.model";
import { NetWorkResponseError } from "../models/Network.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(
        private authService: AngularFireAuth
    ){

    }

    public async signIn(email: string, password: string): Promise<NetWorkResponse | NetWorkResponseError> {
        try {
            const response = await this.authService.signInWithEmailAndPassword(email, password);
            return { success: true, response }
        } catch (error){
            return { success: false, error }
        }
    }
}