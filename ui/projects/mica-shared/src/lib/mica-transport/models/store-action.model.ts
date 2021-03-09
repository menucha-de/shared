export type Action = 'LOAD_ALL' | 'LOAD' | 'ADD' | 'EDIT' | 'REMOVE';

export const LOAD_ALL: Action = 'LOAD_ALL';
export const LOAD: Action = 'LOAD';
export const ADD: Action = 'ADD';
export const EDIT: Action = 'EDIT';
export const REMOVE: Action = 'REMOVE';

export interface StoreAction {
  type: Action;
  data: any;
}
