'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./user-provider";
import InfinityLoader from "./Loader";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (!isLoading && (!user || !user._id)) {
            setRedirecting(true);
            router.push("/Login");
        }
    }, [user, isLoading, router]);

    if (isLoading || redirecting) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <InfinityLoader />
            </div>
        );
    }

    return <>{children}</>;
}
