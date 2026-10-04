import ProductCard from './ProductCard.jsx'

export default function ProductList({ products, onAdd, onDetail }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.title}
          price={product.price}
          image={product.image}
          category={product.category}
          rating={product.rating}
          onAdd={() => onAdd(product)}
          onDetail={() => onDetail(product)}
        />
      ))}
    </div>
  )
}
