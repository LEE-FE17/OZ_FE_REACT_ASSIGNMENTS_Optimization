import React, { useState, useMemo, useCallback } from "react";
import "./App.css";

// 1️⃣ React.memo 적용
const ListItem = React.memo(({ item, onClick }) => {
  console.log(`Rendering ${item}`);
  return <li onClick={() => onClick(item)}>{item}</li>;
});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // 2️⃣ items 메모이제이션
  const items = useMemo(() => {
    return ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape"];
  }, []);

  // 3️⃣ filteredItems 메모이제이션
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, items]);

  // 4️⃣ handleItemClick 메모이제이션
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />

        <ul className="item-list">
          {filteredItems.map((item) => (
            <ListItem key={item} item={item} onClick={handleItemClick} />
          ))}
        </ul>

        {selectedItem && (
          <p className="selected-item">
            Selected Item: {selectedItem}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
