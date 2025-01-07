import {useUserContext} from "@/context/UserContext";
import Link from "next/link";

const UserDropdown = ({isOpen}: {isOpen: boolean}) => {

    const {user} = useUserContext()

    return (
        <div className={`${isOpen ? 'flex' : 'hidden'} flex-col bg-white translate-y-3 shadow-lg w-36 rounded-md absolute border right-0 z-10 p-2 px-3 text-gray-600 gap-y-1.5`}>
            <Link href={`/user/${user?.username}`} className={'font-semibold'}>{user?.username}</Link>
            <div className={'cursor-pointer'}>Odhlásit se</div>
        </div>
    );
};

export default UserDropdown;