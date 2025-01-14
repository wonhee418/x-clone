export async function getPostsRecomends() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postsRecomends`, {
    next: {
      tags: ['posts', 'recomended'],
    }
  });

  if (!res.ok) throw new Error('Failed to fetch posts');

  return res.json();

}
