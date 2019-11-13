import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Role } from '../../models/role.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isEmpty, intersection } from 'lodash'


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private rolesCollection: AngularFirestoreCollection<Role>;

  constructor(
    private afs: AngularFirestore,
  ) { 
    this.rolesCollection = this.afs.collection('roles');
  }

  getAdmins(topic: string){
    return this.afs.collection('roles', ref => ref.where('topic', '==', topic)).valueChanges();
  }
}
