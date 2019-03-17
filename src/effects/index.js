import { createEffect, Actions } from '@youzan/shuai';
import api from '../api'

export function createEffectInit() {
  createEffect('form', {
    getUsers() {
      api.getUsers().then(data => {
        Actions.FormState.setUsers(data);
      })
    },
    addUser(user) {
      api.addUser(user).then(() => {
        Actions.formGetUsers();
      })
    },
    removeUser(id) {
      api.removeUser(id).then(() => {
        Actions.formGetUsers();
      })
    },
    editUser(user) {
      api.editUser(user).then(() => {
        Actions.formGetUsers();
      })
    }
  })
}