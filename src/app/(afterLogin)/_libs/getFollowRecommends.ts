export async function getFollowRecommends(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/followRecommends`,{
      next:{
        tags:['user', 'followRecommends'],
      }
    })
  
    if(!res.ok) throw new Error("Failed to fetch trends")
  
    return res.json();
  }