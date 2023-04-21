import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Skeleton } from "primereact/skeleton";
import { Product, getProduct, isAvailable } from "@/services/products.services";

function productDialogLoading() {
  const renderIsAvailable = (isAvail: boolean) => {
    return isAvail ? (
      <>
        <i className="pi pi-check" style={{ fontSize: "2rem", color: "green", marginLeft: "5px" }} />
        <h6 style={{ color: "green", marginLeft: "5px" }}>DISPONIBLE</h6>
      </>
    ) : (
      <>
        <i className="pi pi-times" style={{ fontSize: "2rem", color: "red", marginLeft: "5px" }} />
        <h6 style={{ color: "red", marginLeft: "5px" }}>RESERVADO</h6>
      </>
    );
  };

  const renderTypeSpace = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "50vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flex: 1, height: "100%" }}>
          <div style={{ marginRight: 10, width: "50%" }}>
            <Skeleton height="2rem" className="mb-2" />
            <b />

            <Skeleton height="2rem" className="mb-2" />
            <b />

            <Skeleton height="2rem" className="mb-2" />
            <b />
            <Skeleton height="2rem" className="mb-2" />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Skeleton height="2rem" className="mb-2" />
            </div>

            <b />
            <Skeleton height="2rem" className="mb-2" />
            <b />
            <b />
            <div style={{ display: "flex", alignItems: "center" }}>
              <Skeleton height="2rem" className="mb-2" />
            </div>
            <b />
          </div>

          <div style={{ width: "50%", height: "100%" }}>
            <Skeleton width="100%" height="100%"></Skeleton>
          </div>
        </div>
      </div>
    );
  };

  return renderTypeSpace();
}

export default productDialogLoading;
