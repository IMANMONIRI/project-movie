import { login, signup, google } from "./actions";
import ContentSlider from "@/components/contentSlider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <>
      <div className="w-full h-[90vh] flex justify-center items-center overflow-hidden">
        <ContentSlider />
      </div>
      <div className="absolute container top-[10vh] left-0 w-full h-[90vh] flex justify-center items-center">
        <form className="bg-slate-950 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border-2 border-gray-800 p-8 rounded-2xl flex flex-col justify-center items-start gap-y-4">
          <div className="w-full">
            <Label htmlFor="email">Email:</Label>
            <Input className="w-full" id="email" name="email" type="email" placeholder="Email..." />
          </div>
          <div className="w-full">
            <Label htmlFor="password">Password:</Label>
            <Input className="w-full" id="password" name="password" type="password" placeholder="Password..." />
          </div>
          <div className="w-full flex justify-center items-center gap-x-4">
            <Button className="w-full hover:bg-orange-600" variant="outline" formAction={login}>Log in</Button>
            <Button className="w-full hover:bg-orange-600" variant="outline" formAction={signup}>Sign up</Button>
          </div>
          <Button className="w-full hover:bg-orange-600" variant="outline" formAction={google}>Google</Button>
        </form>
      </div>
    </>
  );
}
