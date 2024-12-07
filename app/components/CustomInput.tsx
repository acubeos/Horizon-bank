import {
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import React from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import { authFormSchema } from "@/lib/utils"
import { z } from "zod"

const formSchema = authFormSchema("sign-up")

interface Props {
	form: FieldValues
	label: string
	placeholder: string
	name: FieldPath<z.infer<typeof formSchema>>
}

const CustomInput = ({ form, label, placeholder, name }: Props) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<div className='form-item'>
					<FormLabel className='form-label'>{label}</FormLabel>
					<div className='flex flex-col w-full'>
						<FormControl>
							<Input
								placeholder={placeholder}
								className='input-class'
								{...field}
								type={name === "password" ? "password" : "text"}
							/>
						</FormControl>
						<FormMessage className='form-message mt-2' />
					</div>
				</div>
			)}
		/>
	)
}

export default CustomInput
