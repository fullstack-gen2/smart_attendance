import { classInfo } from "@/lib/mockupData/data";

export default function ClassCard() {
  return (
    <>
        {
            classInfo.map((cls)=>(
                <article key={cls.code} className="rounded-xl overflow-hidden border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg">
                    <div className= "flex justify-between items-center bg-blue-600 text-white py-2 px-2">
                        <h1 className="font-bold">{cls.name}</h1>
                        <span className="text-sm">{cls.status == true ? "active": "complete"}</span>
                    </div>
                    <div className="px-4 py-2">
                        <p className="flex justify-between">Room: <span>{cls.room}</span></p>
                        <p className="flex justify-between">Shift: <span>{cls.shift}</span></p>
                        <p className="flex justify-between">Time: <span>{cls.time}</span></p>
                        <p className="flex justify-between">Students: <span>{cls.total_student}</span></p>
                    </div>  
                    <hr className="px-2 " />
                    <span className="text-sm flex justify-end pr-2 py-2">code: {cls.code}</span>
                </article>
            ))
        }
    </>
  );
}
