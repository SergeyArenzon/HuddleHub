"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";

const AUTH_BUTTON_CLASS_NAME = "relative w-[80%] m-auto flex items-center font-semibold justify-center h-14 px-6 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
const AUTH_BUTTON_IMAGE_CLASS_NAME = "w-5 h-5 absolute left-[20px] top-0 bottom-0 my-auto"

export function GoogleSignInButton() {
	const handleClick = () => {
		signIn("google");
	};

	return (
		<button
			onClick={handleClick}
			className={AUTH_BUTTON_CLASS_NAME}
		>
			<FcGoogle className={AUTH_BUTTON_IMAGE_CLASS_NAME} />
			<span className="ml-4">Sign in with Google</span>
		</button>
	);
}

export function GithubSignInButton() {
	const handleClick = () => {
		signIn("github");
	};

	return (
		<button
			onClick={handleClick}
			className={AUTH_BUTTON_CLASS_NAME}
		>
			<span className="ml-4">Sign in with Github</span>
		</button>
	);
}

export function EmailSignInButton() {
	const router = useRouter()

	const handleClick = () => {
		router.push('/login')
	}

	const f = async() => {
		let x = await axios.get('http://localhost:8080/api/auth/healthcheck');
		console.log({x});
		
	}

	return (<>
		<button
			onClick={handleClick}
			className={AUTH_BUTTON_CLASS_NAME}
		>
			<MdOutlineMailOutline className={AUTH_BUTTON_IMAGE_CLASS_NAME} />
			<span className="ml-4">Sign in with Email</span>
		</button>
			<button onClick={f}>test</button>
	</>
	);
}