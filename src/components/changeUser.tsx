import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUserEdit } from "react-icons/fa";
import { Change } from "@/action";

export default function ChangeUser({
  name,
  img,
  userId,
}: {
  name: string | undefined;
  img: string | undefined;
  userId: string | undefined;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-800 pl-5 py-5"
        >
          <FaUserEdit className="text-2xl font-extrabold" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={Change}
          className="w-full flex flex-col justify-center items-center gap-y-4"
        >
          <div className="w-full flex justify-center items-center gap-4">
            <input type="hidden" value={userId} name="userId" />
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              className="w-full"
              defaultValue={name || ""}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-4">
            <Label htmlFor="image" className="text-right">
              image
            </Label>
            <Input name="image" type="file" id="image" className="w-full" />
          </div>
          <Button type="submit" className="w-full font-extrabold">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
