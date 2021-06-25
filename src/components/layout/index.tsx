import { Header } from "./Header";
import { useContext, useEffect, useState } from "react";
import FireUserContext from "../../contexts/FireUserContext";
import UserContext from "./../../contexts/UserContext";
import { users } from "@prisma/client";
import { fetchUserFromUserid } from "../../utils/axiosHelpers";
import { useRouter } from "next/router";

export const Layout = ({ children }) => {
	const { fireId } = useContext(FireUserContext);
	const [currentUser, setCurrentUser] = useState<users>(null);

	const [displayHeader, setDisplayHeader] = useState(true);

	const router = useRouter();

	useEffect(() => {
		setDisplayHeader(
			router.pathname.toString() !== "/sign-up" &&
				router.pathname.toString() !== "/sign-in"
		);
	}, [router.pathname]);

	useEffect(() => {
		(async () => {
			const user = await fetchUserFromUserid(fireId);

			if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
				setCurrentUser(user);
			}
		})();
	}, [fireId, currentUser]);

	return (
		<UserContext.Provider value={currentUser}>
			<div className="bg-theme-blueGray-900 min-h-screen flex flex-col text-theme-blueGray-400 selection:bg-theme-blueGray-800 selection:text-theme-blueGray-400">
				{displayHeader && (
					<header className="flex justify-center">
						<Header />
					</header>
				)}

				<main
					className={`flex-1 ${
						displayHeader && "border-t-2"
					} border-theme-primary-500 ${
						!displayHeader && "flex justify-center items-center"
					}`}
				>
					{children}
				</main>
			</div>
		</UserContext.Provider>
	);
};