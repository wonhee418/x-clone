'use client'

import Main from "@/app/(beforeLogin)/_component/Main";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const {data: session} = useSession();

  if(session) {
    router.replace('/home');
    return null;
  }

  return (
    <Main />
  )
}
