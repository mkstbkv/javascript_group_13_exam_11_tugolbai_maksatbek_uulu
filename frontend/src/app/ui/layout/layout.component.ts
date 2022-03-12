import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { logoutUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user: Observable<null | User>;

  constructor(
    private store: Store<AppState>
  ) {
    this.user = store.select(state => state.users.user);
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }
}
