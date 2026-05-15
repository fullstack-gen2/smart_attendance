import ClassCard from "@/components/card/classCard";
import { DropdownMenuCheckboxes } from "@/components/ui/drop-box";

export default function ClassInformation(){
    return(
        <main> 
            <div className="flex justify-between mb-5">
                <h1 className="text-xl font-semibold">Class Information</h1>
                <DropdownMenuCheckboxes />
            </div>
            <div
               className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-5">
                <ClassCard />
            </div>
    </main>
    )
}