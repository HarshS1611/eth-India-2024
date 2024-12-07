import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Navbar() {
    return (
        <div className="flex items-center justify-between pb-2 border-b-2 border-b-gray-500 mb-5 w-full md:w-[550px] ">
            <a className="mx-4 font-bold text-2xl" href="/">
                Eth India 2024
            </a>
            <Avatar className="mx-4 ">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>
    )
}