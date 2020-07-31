import axios from "axios";
import { FETCH_STORIES,CREATE_STORY } from "./types";
import { STORY_SERVER } from "../components/Config.js";

export function getStories() {
  const request = axios.get(`${STORY_SERVER}`).then(response => response.data);

  return {
    type: FETCH_STORIES,
    payload: request
  };
}

export function createStory(values, callback) {
	console.log('createStory')
	const request = axios.post(`${STORY_SERVER}`, values).then(() => callback())
	return {
		type: CREATE_STORY,
		payload: request
	}
}
