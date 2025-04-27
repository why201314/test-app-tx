import { useState, useEffect } from "react";
import { getAuth } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import { HttpManager } from "../api";

export const useAuth = (user, pass) => {
	const navigate = useNavigate();
	const [status,setStatus] = useState();
	useEffect(() => {
		getAuth(user, pass).then((res) => {
			setStatus(res.status);
			console.log(res);
			//HttpManager.getAllContact();
			navigate('/contact');
		}).catch((err) => {
			console.log(err);
			setStatus(err.response.status);
			navigate('/');
		});
	}, []);
	return status;
}
