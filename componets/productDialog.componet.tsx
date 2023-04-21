import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Product, getProduct, isAvailable } from "@/services/products.services";
import { getLoaction } from "./untiles/functions.untiles";
import { ETypeProduct } from "./productList.componet";
import { Skeleton } from "primereact/skeleton";

import { InputText } from "primereact/inputtext";
import ProductDialogLoading from "./productDialogLoading.componet";
import moment from "moment";

interface IProps {
  productId: number;
  open: boolean;
  setOpen: Function;
}

const updateMapLink = (location: string) => {
  const geoLocation = getLoaction(location);
  const baseLink = "https://maps.google.com/maps?";
  let link = `${baseLink}width=100%25&height=400&hl=en&q=${geoLocation.lat},${geoLocation.long}&t=&z=17&ie=UTF8&iwloc=B&output=embed`;
  return link;
};

const initialValue: Product = {
  id: 0,
  name: "",
  price: 0,
  code: "",
  image: "",
  description: "",
  seller: "",
  type: "",
  stock: 0,
  rent: {
    location: undefined,
    id: 0,
    type: "",
    typeRent: "",
  },
};

function ProductDialog(props: IProps) {
  const { open, productId, setOpen } = props;
  const [product, setProduct] = useState<Product>(initialValue);
  const [loadingDate, setLoadingDate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAvail, setIsAvail] = useState<boolean | null>(null);
  const [date, setDate] = useState<Date>(moment().toDate());

  const getProductDetails = () => {
    setLoading(true);
    getProduct(productId)
      .then((data) => {
        setProduct(data as Product);
        getisAvailable(moment().toDate());
      })
      .finally(() => setLoading(false));
  };

  const getisAvailable = (date: Date) => {
    setLoadingDate(true);
    setDate(date);
    isAvailable(product.rent.id, moment(date).format("YYYY/MM/DD"))
      .then((data) => setIsAvail(data))
      .finally(() => setLoadingDate(false));
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  const renderIsAvailable = (isAvail: boolean) => {
    return isAvail ? (
      <>
        <i
          className="pi pi-check"
          style={{ fontSize: "2rem", color: "green", marginLeft: "5px" }}
        />
        <h6 style={{ color: "green", marginLeft: "5px" }}>DISPONIBLE</h6>
      </>
    ) : (
      <>
        <i
          className="pi pi-times"
          style={{ fontSize: "2rem", color: "red", marginLeft: "5px" }}
        />
        <h6 style={{ color: "red", marginLeft: "5px" }}>RESERVADO</h6>
      </>
    );
  };

  const renderTypeSpace = (product: Product) => {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flex: 1,
            height: "60%",
          }}
        >
          <div style={{ marginRight: 10, width: "50%" }}>
            <h3 style={{ margin: 0 }}>Nombre del vendedor </h3>
            <p style={{ margin: 0 }}>{product.seller} </p>
            <b />
            <h3 style={{ margin: 0 }}>Descripcion</h3>
            <p style={{ margin: 0 }}>{product.description}</p>
            <b />
            <h3 style={{ margin: 0 }}>Tipo de renta</h3>
            <p style={{ margin: 0 }}>{product?.rent?.typeRent}</p>
            {product.type !== ETypeProduct.SIMPLE && (
              <>
                <h3 style={{ margin: 0 }}>Disponibilidad según la fecha</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Calendar
                      id="icon"
                      value={date}
                      onChange={(e) => getisAvailable(e.value as Date)}
                      showIcon
                    />
                  </div>
                  {loadingDate ? (
                    <i
                      className="pi pi-spin pi-spinner"
                      style={{
                        fontSize: "2rem",
                        color: "green",
                        marginLeft: "5px",
                      }}
                    />
                  ) : (
                    renderIsAvailable(isAvail as boolean)
                  )}
                </div>
                <b />
              </>
            )}

            <b />

            <h4 style={{ margin: 0 }}>Precio</h4>
            <b />
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  marginRight: 5,
                  marginBottom: "10px",
                }}
              >{`$${product.price}`}</span>
            </div>
            <b />
          </div>

          <div style={{ width: "50%", height: "90%" }}>
            <img
              src={`${product.image}`}
              alt={product.name}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        {product?.rent?.location && (
          <iframe
            width="100%"
            src={updateMapLink(product?.rent?.location)}
            style={{ border: 0, flex: 1 }}
          ></iframe>
        )}
      </div>
    );
  };

  const renderBasic = (product: Product) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "60vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flex: 1,
            height: "60%",
          }}
        >
          <div style={{ marginRight: 10, width: "50%" }}>
            <h3 style={{ margin: 0 }}>Nombre del vendedor</h3>
            <p style={{ margin: 0 }}>{product.seller} </p>
            <b />

            <h3 style={{ margin: 0 }}>Descripcion</h3>
            <p style={{ margin: 0 }}>{product.description}</p>
            <b />

            {product.type !== ETypeProduct.SIMPLE && (
              <>
                <h3 style={{ margin: 0 }}>Tipo de renta</h3>
                <p style={{ margin: 0 }}>{product.type}</p>
                <b />
                <h3 style={{ margin: 0 }}>Disponibilidad según la fecha</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Calendar
                      id="icon"
                      value={date}
                      onChange={(e) => getisAvailable(e.value as Date)}
                      showIcon
                    />
                  </div>
                  {loadingDate ? (
                    <i
                      className="pi pi-spin pi-spinner"
                      style={{
                        fontSize: "2rem",
                        color: "green",
                        marginLeft: "5px",
                      }}
                    />
                  ) : (
                    renderIsAvailable(isAvail as boolean)
                  )}
                </div>
                <b />
              </>
            )}

            <b />
            {product.stock && (
              <div>
                <h3 style={{ margin: 0 }}>Cantidad</h3>
                <p style={{ margin: 0 }}>{product.stock}</p>
              </div>
            )}

            <b />
            <h4 style={{ margin: 1 }}>Precio</h4>
            <b />
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{ fontSize: 30, fontWeight: "bold", marginRight: 5 }}
              >{`$${product.price}`}</span>
            </div>
            <b />
          </div>

          <div style={{ width: "50%", height: "100%" }}>
            <img
              src={`${product.image}`}
              alt={product.name}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    );
  };

  const footerContent = (
    <div>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        onClick={() => setOpen(false)}
        className="p-button-text"
      />
    </div>
  );
  return (
    <Dialog
      visible={open}
      header={
        loading ? <Skeleton height="2rem" className="mb-2" /> : product.name
      }
      style={{ width: "70%", height: "100%", margin: 0, padding: 0 }}
      onHide={() => setOpen(false)}
      footer={footerContent}
    >
      {loading ? (
        <ProductDialogLoading />
      ) : (
        <>
          {product.type === ETypeProduct.RENT && product.rent.location
            ? renderTypeSpace(product)
            : renderBasic(product)}
        </>
      )}
    </Dialog>
  );
}

export default ProductDialog;
