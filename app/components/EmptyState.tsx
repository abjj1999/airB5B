"use client"
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title ="No exact matches found",
    subtitle = "Try resetting your filters or search term",
    showReset
}) => {
    const router = useRouter()
    return (  
        <div className="
            h-[60vh] 
            flex flex-col
            gap-2
            justify-center
            items-center
        ">
            <Heading
                center
                title={title}
                subTitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button 
                        outline
                        label="Reset Filters"
                        onClick={() => router.push("/")}
                    />
                )}
            </div>
        </div>
    );
}
 
export default EmptyState;