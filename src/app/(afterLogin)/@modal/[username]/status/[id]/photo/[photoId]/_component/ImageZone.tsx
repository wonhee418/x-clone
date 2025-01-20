'use client';

import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import style from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/photoModal.module.css";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_libs/getSinglePost';

type Props = {
  id: string;
};

export default function ImageZone({ id }: Props) {
  const {data } = useQuery({queryKey: ['posts', id], queryFn: getSinglePost})

    return(
        <div className={style.imageZone}>
        <img src={data?.Images[0].link} alt={data?.Images[0].Post?.content} />
        <div className={style.image} style={{backgroundImage: `url(${data?.Images[0].link})`}} />
        <div className={style.buttonZone}>
          <div className={style.buttonInner}>
            <ActionButtons white />
          </div>
        </div>
      </div>
    )
}