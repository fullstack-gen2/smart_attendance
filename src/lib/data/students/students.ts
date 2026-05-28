const url = process.env.base_url

export async function allStudents(){
    const req = await fetch(`${url}/attendance/users/students`);
    return await req.json()
}