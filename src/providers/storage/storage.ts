import { Injectable } from '@angular/core';
import { LocalUser } from '../../models/local_user';
import { STORAGE_KEYS } from '../../config/storage_keys.config';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  getLocalUser() : LocalUser{
    let user = localStorage.getItem(STORAGE_KEYS.localUser)
    if (user == null) {
      return null;
    }
    else{
      return JSON.parse(user);
    }
  }

  setLocalUser(obj : LocalUser){
    if(obj == null){
        localStorage.removeItem(STORAGE_KEYS.localUser)
    }
    else{
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
}

}
