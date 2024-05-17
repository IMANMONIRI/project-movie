import { LuFileQuestion } from "react-icons/lu";

type appProps={
  title:string;
  description:string;
}

export default function NoItems({description,title}:appProps) {
  return (
    <div className="min-h-[400px] flex flex-col justify-center items-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="flex h-20 w-20 text-4xl items-center justify-center rounded-full bg-primary/10">
        <LuFileQuestion />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        {title}
      </h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}