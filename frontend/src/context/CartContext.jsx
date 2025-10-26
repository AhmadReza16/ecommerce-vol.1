import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { cartAPI } from '../services/api'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        totalPrice: action.payload.total_price || 0,
        loading: false,
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      }
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
        loading: false,
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        loading: false,
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalPrice: 0,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

const initialState = {
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = async (productId, quantity = 1) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await cartAPI.addToCart(productId, quantity)
      dispatch({ type: 'ADD_TO_CART', payload: response.data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const updateCartItem = async (itemId, quantity) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await cartAPI.updateCartItem(itemId, quantity)
      dispatch({ type: 'UPDATE_CART_ITEM', payload: response.data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const removeFromCart = async (itemId) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      await cartAPI.removeFromCart(itemId)
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const clearCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      await cartAPI.clearCart()
      dispatch({ type: 'CLEAR_CART' })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartItemsCount,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
