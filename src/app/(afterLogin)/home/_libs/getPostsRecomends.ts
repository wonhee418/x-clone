type Props = {
  pageParam?: number;
}

export async function getPostsRecomends({pageParam}: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postsRecomends?cursor=${pageParam}`, {
    next: {
      tags: ['posts', 'recomended'],
    }
  });

  if (!res.ok) throw new Error('Failed to fetch posts');

  return res.json();

}
