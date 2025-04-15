import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useBackend } from "@/BackendContext"
import { useAccountContext } from "./AccountContext"
import { useNavigate } from "react-router"

const formSchema = z.object({
  username: z.string().min(1).min(3).max(20)
});

export default function UserEditForm() {
  const { addUser } = useBackend();
  const { updateUserList, setSelectedUser } = useAccountContext();
  const navigate = useNavigate();

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      // toast(
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      //   </pre>
      // );
      const result = addUser(values.username);
      if (result === "success"){
        toast.success("使用者已建立")
        updateUserList()
        setSelectedUser(values.username)
        navigate("/")
      } else if (result === "exist") {
        toast.error("建立失敗：已存在該使用者")
      } else {
        toast.error("建立失敗")
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>使用者名稱</FormLabel>
              <FormControl>
                <Input 
                placeholder="..."
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>你的使用者名稱</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">送出</Button>
      </form>
    </Form>
  )
}