import RequirePermissionForm from "@/components/form/permission";

export default function RequirePermission(){
    return(
        <main className="p-3">
            <section className="border mx-auto p-3 rounded-lg w-100">
                <RequirePermissionForm />
            </section>
        </main>
    )
}