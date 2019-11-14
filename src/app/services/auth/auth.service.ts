import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toast: ToastrService, 
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

  getCurrentUser(){
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else{
          return of(null);
        }
      })
    )
  }

  // ========================================
  // Update User Data
  // ========================================
  private updateUserData(user){
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        user: true
      }
    }
    return userRef.set(data, { merge: true })
  }

  // ========================================
  // Email and Password Sign Up Auth
  // ========================================
  emailSignUp(email: string, password: string, name: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(credential => {
        credential.user.updateProfile({
          displayName: name
        }).then(() => {
          return this.updateUserData(credential.user);
        })
      })
      .catch(error => 
        this.toast.error(error.message, "Error While Signing in"),
      );
  }

  // ========================================
  // Email and Password Sign In Auth
  // ========================================
  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => 
        this.toast.error(error.message, "Error While Signing in"),
      );
  }

  // ========================================
  // Google Login Route
  // ========================================
  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => 
        this.toast.error(error.message, "Error While Signing in"),
      );
  }

  // ========================================
  // Gerneal Sign out
  // ========================================
  async signOut(){
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/account']);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean{
    if (!user) return false
    for (const role of allowedRoles){
      if (user.roles[role]){
        return true
      }
    }
    return false
  }
}
