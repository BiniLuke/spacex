import "./styles.css";
import { useState } from "react";
import Cart from "./Cart";
//add icon to cart
// add totalItems--
//

export default function App() {
  const [productList] = useState([
    { id: 1, name: "Cholcate" },
    { id: 2, name: "Bottle" },
    { id: 3, name: "Phone" },
    { id: 4, name: "Pencil" },
    { id: 5, name: "Pen" }
  ]);

  const [totalItems, setTotalItems] = useState([]);

  const addToCart = (id) => {
    let prevTotalItems = totalItems;
    prevTotalItemspush(id);
    setTotalItems(prevTotalItems);
  };

  const deleteFromCart = (id) => {
    let prevTotalItems = totalItems;
    prevTotalItems = prevTotalItems - 1;
    setTotalItems(prevTotalItems);
  };

  console.log(totalItems);
  return (
    <div className="App">
      <div>
        <Cart totalItems={totalItems} />
      </div>
      <>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Product Name</td>
            </tr>
          </thead>
          <tbody>
            {productList?.map((prduct) => {
              return (
                <tr>
                  <td>{prduct.id}</td>
                  <td>{prduct.name}</td>
                  <td>
                    <>
                      <button onClick={() => addToCart(prduct.id)}>
                        Add to Cart{" "}
                      </button>
                      <button onClick={() => deleteFromCart(prduct.id)}>
                        Delete{" "}
                      </button>
                    </>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </div>
  );
}
