import { BasketItem } from "@/types/basketitem";
import { createContext, useReducer } from "react";

export const CartContext = createContext<CartContextInterface>({
    items: [],
    addToCart: undefined,
    removeFromCart: undefined,
    updateQty: undefined,
    clearCart: undefined
});

interface CartContextInterface {
    items: BasketItem[],
    addToCart: ((product: BasketItem) => void) | undefined,
    removeFromCart: ((id: string) => void) | undefined,
    updateQty: ((id: string, qty: number) => void) | undefined,
    clearCart: (() => void) | undefined
}

type Actions = "ADD" | "REMOVE" | "UPDATE" | "CLEAR";

interface CartAction {
    type: Actions;
    payload: {
        items: BasketItem[]
    }
}

//actions that can occur on a cart
const cartReducer = (state: { items: BasketItem[] }, action: CartAction) => {
    const { type, payload } = action;
    
    switch (type) {
        case "ADD":
            return {
                ...state,
                items: payload.items,
            };
    
        case "REMOVE":
            return {
                ...state,
                items: payload.items,
            };
        
        case "UPDATE":
            return {
                ...state,
                items: payload.items
            }

        case "CLEAR":
            return {
                ...state,
                items: payload.items
            }
    
        default:
            throw new Error("No case for that type");
    }
};

interface Props {
    children: string | JSX.Element | JSX.Element[]
}

export function CartProvider({children} : Props) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

        const addToCart = (product: BasketItem) => {
            const updatedCart = [...state.items, product];

            dispatch({
                type: "ADD",
                payload: {
                    items: updatedCart,
                },
            });
        }

        const removeFromCart = (id: String) => {
            const updatedCart = state.items.filter(
                (product) => product.productId !== id
            );

            dispatch({
                type: "REMOVE",
                payload: {
                    items: updatedCart,
                },
            });
        }

        const updateQty = (id: String, qty: number) => {
            const updatedCart = state.items.map((product) => {
                // Check if this is the product to update
                if (product.productId === id) {
                    // Update the quantity of the product
                    return { ...product, qty: qty };
                }
        
                // Return the product unchanged if it's not the one we're updating
                return product;
            })

            dispatch({
                type: "UPDATE",
                payload: {
                    items: updatedCart
                }
            })
        }

        const clearCart = () => {
            dispatch({
                type: "CLEAR",
                payload: {
                    items: []
                }
            })
        }

        const value = {
            items: state.items,
            addToCart,
            removeFromCart,
            updateQty,
            clearCart
        }
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}