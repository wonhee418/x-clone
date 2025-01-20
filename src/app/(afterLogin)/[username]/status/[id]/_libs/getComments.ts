

export const getComments = async ({ queryKey }: { queryKey: [_1: string, _2: string, _3: string ]}) => {
    const [_1, id] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}/comments`, {
      next: {
        tags: ['posts', id, 'comments'],
      },
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }