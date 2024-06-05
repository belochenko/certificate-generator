"use client";
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";

export default function AuthGuard({children}: { children: React.ReactNode }) {
    const {data: status}: any = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(true);

    const guestRoutes: string[] = [
        "/",
    ];

    useEffect(() => {
        const isGuestRoute = !!guestRoutes.find(route => route === pathname);
        setLoading(true);

        if (status === "loading") {
            return;
        } else if (status === "authenticated" && isGuestRoute) {
            router.push("/generate/certficate");
        } else if (status === "unauthenticated" && !isGuestRoute) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [pathname, status]);

    return (loading ?
        <div>
            Loading...
        </div> : children);
};