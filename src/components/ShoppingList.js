import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpdateItem(updatedItem){
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  function handleDeletedItems(deleteItem){
    const updatedItems = items.filter((item) => item.id !== deleteItem.id);
  setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const fetchShoppingList = () => {
    fetch("http://localhost:4000/items") 
    .then((response) => response.json())
    .then((data) => setItems(data))
  }

  useEffect(()=>{
    fetchShoppingList()
  }, [])



  const newItem = (item) => {
    console.log(item);

    setItems([...items, item]);
  }
  return (
    <div className="ShoppingList">
      <ItemForm addedItem={newItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem = {handleUpdateItem} onDeleteItem = {handleDeletedItems} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
