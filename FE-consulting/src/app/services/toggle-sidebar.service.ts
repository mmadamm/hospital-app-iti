import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSidebarService {

  constructor() { }
  public isSideBarOpen$ = new BehaviorSubject<boolean>(true);
}
