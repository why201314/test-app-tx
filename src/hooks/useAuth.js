import { useState, useEffect } from "react";
import { getAuth } from "../api/auth";
import { useNavigate } from 'react-router-dom';

export const useAuth = (user, pass) => {
	const navigate = useNavigate();
	const [status,setStatus] = useState();
	useEffect(() => {
		getAuth(user, pass).then((res) => {
			setStatus(res.status);
			navigate('/contact')
		}).catch((err) => {
			setStatus(err.response.status);
			navigate('/');
		});
	}, []);
	return status;
}
