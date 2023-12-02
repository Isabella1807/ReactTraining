import {createContext, useReducer} from "react";
//createContext spreader data til komponenter??

const CartContext = createContext({
    items: [],
    addItem: (item) => {
    },
    removeItem: (id) => {
    }
});

//De der parametre bliver automatisk passed til funktionen
//Action objektet fortæller hvordan funktionen skal opdatere state
function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        //Den her if update the state to add a meal item
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems};
    }

    if (action.type === 'REMOVE_ITEM') {
        //remove an item from the state
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItemIndex.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state, items: updatedItems};
    }
    return state;
}

export function CartContextProvider({children}) {
    //useReducer manages mere komplekse states, useReducer er en hook
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item){
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id){
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    };

    console.log(cartContext);

    //Provider er et property, der er et komponent som kan outputte og bør wrappes om alle komponenter der skal bruge CartContext
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;

