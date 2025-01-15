"use client";

import style from "./rightSearchZone.module.css";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, { ChangeEvent } from "react";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";


export default function RightSearchZone() {
  const pathname = usePathname()
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const onChangeFollow = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('pf', value);
    router.replace(`/search?${newSearchParams.toString()}`);
  }

  const onChangeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('pf');
    router.replace(`/search?${newSearchParams.toString()}`);

  }
  if (pathname === '/explore') {
    return null;
  }
  if (pathname === '/search') {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <label htmlFor="pf_off">모든 사용자</label>
              <input type="radio" name="pf" id="pf_off" defaultChecked onChange={onChangeAll} />
            </div>
            <div className={style.radio}>
              <label htmlFor="pf_on">내가 팔로우하는 사람들</label>
              <input type="radio" name="pf" id="pf_on" value="on" onChange={onChangeFollow} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 60, width: 'inherit' }}>
      <SearchForm />
    </div>
  )
}