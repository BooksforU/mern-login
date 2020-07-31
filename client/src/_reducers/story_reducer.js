import { FETCH_STORIES } from "../_actions/types";

export default function(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_STORIES:
      return { ...state, stories: action.payload, loading: false };
    default:
      return state;
  }
}
