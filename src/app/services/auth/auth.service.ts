import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else{
          return of(null);
        }
      })
    );
  }

  // Sign up with email/password
  emailSignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been successfully registered!");
        console.log(result.user)
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with email/password
  emailSignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
         this.router.navigate(['/account']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user)
  }

  async signOut(){
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/account']);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User){
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = { 
      uid,
      email,
      displayName,
      photoURL
    } 

    return userRef.set(data, { merge: true })
  }

}
