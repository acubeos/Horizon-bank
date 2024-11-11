import React from "react"
import HeaderBox from "../components/HeaderBox"
import TotalBalanceBox from "../components/TotalBalanceBox"
import RightSideBar from "../components/RightSideBar"

const Home = () => {
	const loggedIn = {
		firstName: "Aziz",
		lastName: "Akande",
		email: "acube2017@gmail.com",
	}
	return (
		<section className='home'>
			<div className='home-content'>
				<header className='home-header'>
					<HeaderBox
						type='greeting'
						title='Welcome'
						user={loggedIn?.firstName || "guest"}
						subtext='Access and manage your account and translations efficiently'
					/>
					<TotalBalanceBox
						accounts={[]}
						totalBanks={1}
						totalCurrentBalance={20000.0}
					/>
				</header>
				RECENT TRANSACTIONS
			</div>
			<RightSideBar
				user={loggedIn}
				transactions={[]}
				banks={[{ currentBalance: 2300 }, { currentBalance: 7500 }]}
			/>
		</section>
	)
}

export default Home
