import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
	const [items, setItems] = useState(defaultBasket);

	useEffect(() => {
		localStorage.setItem("basket", JSON.stringify(items));
	}, [items]);

	const addToBasket = (data, findBasketItem) => {
		if (!findBasketItem) {
			return setItems((items) => [data, ...items]);
		} // if first time add to basket then add to basket

		const filtered = items.filter((item) => item._id !== findBasketItem._id);  // if item already exist in basket then remove it
		setItems(filtered);
	};

	const removeFromBasket = (item_id) => {
		const filtered = items.filter((item) => item._id !== item_id);
		setItems(filtered);
	};

	const emptyBasket = () => setItems([]);

	const values = {
		items,
		setItems,
		addToBasket,
		removeFromBasket,
		emptyBasket,
	};

	return (
		<BasketContext.Provider value={values}>{children}</BasketContext.Provider>
	);
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
