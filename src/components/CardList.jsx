import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10; // Number of products per page
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [filteredData, setFilteredData] = useState(data); // Data filtered by search term
  const [products, setProducts] = useState(data.slice(0, limit)); // Current page products

  // Function to filter products by tags
  const filterTags = (term) => {
    console.log('Filter triggered with:', term); // Debugging log

    const filtered = data.filter((product) =>
      product.tags.some((tag) =>
        tag.title.toLowerCase().includes(term.toLowerCase())
      )
    );

    console.log('Filtered results:', filtered); // Debugging log
    setFilteredData(filtered);
    setProducts(filtered.slice(0, limit)); // Show the first page of filtered results
    setOffset(0); // Reset pagination
  };

  // Pagination handler
  const handlePagination = (direction) => {
    const newOffset = offset + direction * limit;
    console.log('Pagination triggered with direction:', direction, 'New offset:', newOffset);
    if (newOffset >= 0 && newOffset < filteredData.length) {
      setOffset(newOffset);
    } else {
      console.log('Pagination reached boundary'); // Log when at start or end of pagination
    }
  };

  // Update displayed products when offset or filteredData changes
  useEffect(() => {
    console.log('Updating products. Offset:', offset, 'Filtered data length:', filteredData.length);
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <div className="mt2 mb4">
        <Search handleSearch={filterTags} />
      </div>

      {/* Products */}
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} {...product} />)
        ) : (
          <p>No products found for the given search term.</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination(-1)} />
        <Button
          text="Next"
          handleClick={() => handlePagination(1)}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
};

export default CardList;
