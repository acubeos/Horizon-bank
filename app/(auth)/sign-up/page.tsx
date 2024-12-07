import Authform from "@/app/components/Authform"
import React from "react"

const SignUp = async () => {
	return (
		<section className='flex-center size-full max-sm:px-6'>
			<Authform type='sign-up' />
		</section>
	)
}

export default SignUp
