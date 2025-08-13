import { useForm } from "react-hook-form"


export default function MyForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    console.log(watch('text'));
    const onSubmit = (data) => console.log(data)

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")}/>
        <input type="password" {...register("password", { required: true })}/>
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
    </form>
    )
}
