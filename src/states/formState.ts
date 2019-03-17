import { createState } from '@youzan/shuai';

export default createState('FormState', {
  initial: {
    users: []
  },
  setUsers(state, payload) {
    return {
      ...state,
      users: payload
    };
  }
});
