import { AttendanceCheckingList } from "@/components/table_class/check_attendance";

export default function AttendanceTaking(){
    return(
        <section className="border rounded-lg overflow-hidden" >
            <AttendanceCheckingList />
        </section>
    )
}