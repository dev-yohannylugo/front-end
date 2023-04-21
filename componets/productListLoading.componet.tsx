import React, { useState, useEffect } from "react";

import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Skeleton } from "primereact/skeleton";
import { TLayaoutTable } from "./productList.componet";

interface IProductListLoadingProps {
  layout: TLayaoutTable;
}

export default function ProductListLoading(props: IProductListLoadingProps) {
  const { layout } = props;
  const products =[
    {},{},{},{},{},{},
  ]
  const listItem = () => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <Skeleton className="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto border-round" />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <Skeleton className="w-8rem border-round h-2rem" />
              <Skeleton className="w-6rem border-round h-1rem" />
              <div className="flex align-items-center gap-3">
                <Skeleton className="w-6rem border-round h-1rem" />
                <Skeleton className="w-3rem border-round h-1rem" />
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Skeleton className="w-4rem border-round h-2rem" />
              <Skeleton shape="circle" className="w-3rem h-3rem" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = () => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Skeleton className="w-6rem border-round h-1rem" />
            <Skeleton className="w-3rem border-round h-1rem" />
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <Skeleton className="w-9 shadow-2 border-round h-10rem" />
            <Skeleton className="w-8rem border-round h-2rem" />
            <Skeleton className="w-6rem border-round h-1rem" />
          </div>
          <div className="flex align-items-center justify-content-between">
            <Skeleton className="w-4rem border-round h-2rem" />
            <Skeleton shape="circle" className="w-3rem h-3rem" />
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = () => {
    if (layout === "list") return listItem();
    else if (layout === "grid") return gridItem();
  };

  return (
    <div className="card">
      <DataView value={products} itemTemplate={itemTemplate} layout={layout}/>
    </div>
  );
}
