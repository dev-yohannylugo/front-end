import ProductDialog from "./productDialog.componet";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import ProductListLoading from "./productListLoading.componet";
import { Product, getProductList } from "@/services/products.services";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { truncateString } from "./untiles/functions.untiles";
import { Tag } from "primereact/tag";

export type TLayaoutTable = "grid" | "list";
export type TProduct = "all" | "Rentable" | "Simple";
type TColor = "success" | "info" | "warning" | "danger" | null | undefined
type TSeleccted = { name: string; code: TProduct };

export const enum ETypeProduct {
  ALL = "all",
  RENT = "Rentable",
  SIMPLE = "Simple",
  SPACES = "Inmobiliario",
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [layout, setLayout] = useState<TLayaoutTable>("grid");
  const [open, setOpen] = useState<boolean>(false);
  const [productsSelected, setProductsSelected] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [typeSelected, setTypeSelected] = useState<TSeleccted>({ name: "Todos", code: "all" });

  const getProducts = () =>
    getProductList(typeSelected.code)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, [typeSelected]);

  const openModal = (product: Product) => {
    setOpen(true);
    setProductsSelected(product.id);
  };

  const getType = (product: Product) => {
    switch (product.type) {
      case ETypeProduct.RENT:
        return "RENTA";

      case ETypeProduct.SIMPLE:
        return "BASICO";

      case ETypeProduct.SPACES:
        return "ESPACIO";

      default:
        return null;
    }
  };

  const getSeverity = (product: Product): { color: TColor; message: string } => {
    switch (true) {
      case product.type === ETypeProduct.SIMPLE && product.stock && product.stock > 5:
        return { color: "success", message: "DISPONIBLE" };
      case product.type === ETypeProduct.SIMPLE && product.stock && product.stock <= 5:
        return { color: "warning", message: "BAJO STOCK" };
      case product.type === ETypeProduct.SIMPLE && !product.stock:
        return { color: "danger", message: "SIN STOCK" };
      case product.type === ETypeProduct.RENT:
        return { color: "success", message: "DISPONIBLE" };
      default:
        return { color: "danger", message: "ERROR" };
    }
  };

  const typeProducts = [
    { name: "Todos", code: ETypeProduct.ALL },
    { name: "Simples", code: ETypeProduct.SIMPLE },
    { name: "Rentables", code: ETypeProduct.RENT },
  ];

  const listItem = (product: Product) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`${product.image}`}
            alt={product.name}
            onClick={() => openModal(product)}
            style={{ cursor: "pointer", maxWidth: "216px", maxHeight: "240px" }}
          />

          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900" onClick={() => openModal(product)} style={{ cursor: "pointer" }}>
                {product.name}
              </div>

              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{getType(product)}</span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (product: Product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 " style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="p-4 border-1 surface-border surface-card border-round" style={{ height: "400px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ marginRight: "10px" }}>
              <i className="pi pi-tag"></i>
              <span className="font-semibold m-1">{getType(product)}</span>
            </div>
            <Tag value={getSeverity(product).message} severity={getSeverity(product).color}></Tag>
          </div>
          <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", flex: 1 }}>
            <img
              className="w-9 shadow-2 border-round"
              src={`${product.image}`}
              alt={product.name}
              onClick={() => openModal(product)}
              style={{ cursor: "pointer", maxWidth: "216px", maxHeight: "200px" }}
            />
            <div className="text-2xl font-bold" style={{ marginTop: "10px" }}>
              <div dangerouslySetInnerHTML={{ __html: truncateString(product.name, 38) }} />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
              <span>${product.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product: Product, layout: string) => {
    if (!product) {
      return;
    }

    if (layout === "list") return listItem(product);
    else if (layout === "grid") return gridItem(product);
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value as TLayaoutTable)} />
      </div>
    );
  };

  const headerToolBar = () => {
    return (
      <Dropdown
        value={typeSelected}
        onChange={(e) => setTypeSelected(e.value)}
        options={typeProducts}
        optionLabel="name"
        placeholder="Seleccione..."
        className="w-full md:w-14rem"
      />
    );
  };

  return (
    <div className="card" style={{ width: "90%" }}>
      <Toolbar start={headerToolBar()} end={header()} />
        <>{loading ? <ProductListLoading layout={layout} /> : <DataView value={products} itemTemplate={itemTemplate} layout={layout} rows={6} />}</>
      {open && <ProductDialog open={open} setOpen={setOpen} productId={productsSelected} />}
    </div>
  );
};

export default ProductList;
