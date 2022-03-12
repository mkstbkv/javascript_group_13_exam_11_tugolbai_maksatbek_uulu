import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from './categories.actions';
import { CategoriesService } from '../services/categories.service';

@Injectable()
export class CategoriesEffects {
  fetchCategories = createEffect(() => this.actions.pipe(
    ofType(fetchCategoriesRequest),
    mergeMap(() => this.categoriesService.getComments().pipe(
      map(categories => fetchCategoriesSuccess({categories})),
      catchError(() => of(fetchCategoriesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService,
  ) {}
}
