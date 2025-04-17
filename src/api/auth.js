import axios from "axios";
import { HttpManager  } from ".";

const authorizationURL = "/api/auth";
export const getAuth =  async(user,pass) => {
	/** 
	const response = await axios.get(authorizationURL,{
		auth: {username:user,password:pass}
	});
	*/
	const response = HttpManager.login({username:user,password:pass});
	return response;
}
