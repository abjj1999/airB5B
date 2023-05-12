'use client';
import Image from "next/image";
import {useRouter} from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image className="hidden md:block cursor-pointer" onClick={() => router.push("/")} src="/images/logo.png" width="100" height="100" alt="logo" loading="eager" unoptimized={true} />
    )
}

export default Logo;