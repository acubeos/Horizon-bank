"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/app/components/ui/button"
import { Form } from "@/app/components/ui/form"
import CustomInput from "./CustomInput"
import { Loader2 } from "lucide-react"
import { authFormSchema } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/actions/user.actions"
import { signIn } from "@/lib/actions/user.actions"

const Authform = ({ type }: { type: string }) => {
	const router = useRouter()
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const formSchema = authFormSchema(type)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	// 2. Define a submit handler.
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true)

		try {
			if (type === "sign-up") {
				const newUser = await signUp(data)
				setUser(newUser)
			}

			if (type === "sign-in") {
				const response = await signIn({
					email: data.email,
					password: data.password,
				})
				if (response) router.push("/")
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className='auth-form'>
			<header className='flex flex-col gap-5 md:gap-8'>
				<Link href='/' className='flex mb-12 cursor-pointer items-center gap-1'>
					<Image
						alt='Horizon logo'
						src='/icons/logo.svg'
						width={34}
						height={34}
						className='size-[24px] max-xl:size-14'
					/>
					<h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
						Horizon
					</h1>
				</Link>

				<div className='flex flex-col gap-1 md:gap-3'>
					<h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
						{user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign up"}
						<p className='text-16 font-normal text-gray-600'>
							{user
								? "Link your account to get started"
								: "Please enter your details"}
						</p>
					</h1>
				</div>
			</header>
			{user ? (
				<div className='flex flex-col gap-4'></div>
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						{type === "sign-up" && (
							<>
								<div className='flex gap-4'>
									<CustomInput
										form={form}
										label={"First Name"}
										placeholder='Enter your first name'
										name='firstName'
									/>
									<CustomInput
										form={form}
										label={"Last Name"}
										placeholder='Enter your last name'
										name='lastName'
									/>
								</div>
								<CustomInput
									form={form}
									label={"Address"}
									placeholder='Enter your address'
									name='address'
								/>
								<CustomInput
									form={form}
									label={"City"}
									placeholder='Enter your city'
									name='city'
								/>
								<div className='flex gap-4'>
									<CustomInput
										form={form}
										label={"State"}
										placeholder='Ex: NY'
										name='state'
									/>
									<CustomInput
										form={form}
										label={"Postal Code"}
										placeholder='ex: 33304'
										name='postalCode'
									/>
								</div>
								<div className='flex gap-4'>
									<CustomInput
										form={form}
										label={"Birthday"}
										placeholder='YYYY-MM-DD'
										name='birthday'
									/>
									<CustomInput
										form={form}
										label={"SSN"}
										placeholder='Ex: 125465'
										name='ssn'
									/>
								</div>
							</>
						)}
						<CustomInput
							form={form}
							label={"Email"}
							placeholder='Enter your email'
							name='email'
						/>
						<CustomInput
							form={form}
							label='Password'
							placeholder='Enter your password'
							name='password'
						/>
						<div className='flex flex-col gap-4'>
							<Button type='submit' className='form-btn' disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 size={20} className='animate-spin' /> Loading...
									</>
								) : type === "sign-in" ? (
									"Sign In"
								) : (
									"Sign Up"
								)}
							</Button>
						</div>
					</form>
				</Form>
			)}
			<footer className='flex justify-center gap-1'>
				<p className='text-14 font-normal text-gray'>
					{type === "sign-in"
						? "Don't have an account?"
						: "Already have an account?"}
				</p>
				<Link
					className='form-link'
					href={type === "sign-in" ? "/sign-up" : "/sign-in"}
				>
					{type === "sign-in" ? "Sign up" : "Sign in"}
				</Link>
			</footer>
		</section>
	)
}

export default Authform
