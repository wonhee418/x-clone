export async function getUser(username:string){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,{
      next:{
        tags:['user', username],
      }
    })
  
    if(!res.ok) throw new Error("Failed to fetch user")
  
    return res.json();
  }