import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext();
// Provider
// Consumer

export default class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cardTax: 0,
        cartTotal: 0
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = []
        storeProducts.forEach(item => {
            const singleItem = { ...item }
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState(() => {
            return { products: tempProducts }
        })
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id)
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                detailProduct: product
            }
        })
    }

    addToCart = id => {
        let tempProducts = [...this.state.products]
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        console.log({ product })
        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            }
        }, () => {
            console.log(this.state)
            this.addTotals()
        }
        )
    }

    openModal = id => {
        const product = this.getItem(id)
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increment = id => {
        let tempCarts = [...this.state.cart]
        const selectedProduct = tempCarts.find(item => item.id === id)
        const index = tempCarts.indexOf(selectedProduct)
        let product = tempCarts[index]

        product.count = product.count + 1
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCarts]
            }
        },
            () => {
                this.addTotals()
            })
    }

    decrement = id => {
        let tempCarts = [...this.state.cart]
        const index = tempCarts.indexOf(this.getItem(id))
        let product = tempCarts[index];

        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id)
        }
        else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart: [...tempCarts]
                }
            },
                () => {
                    this.addTotals()
                })
        }

    }

    removeItem = id => {
        let tempCarts = [...this.state.cart]
        let tempProducts = [...this.state.products]

        tempCarts = tempCarts.filter(item => item.id !== id)
        const index = tempProducts.indexOf(this.getItem(id))
        let removeProduct = tempProducts[index]
        removeProduct.inCart = false
        removeProduct.count = 0
        removeProduct.total = 0

        this.setState(() => {
            return {
                products: [...tempProducts],
                cart: [...tempCarts]
            }
        },
            () => {
                this.addTotals()
            }
        )
        console.log(this.state)
    }

    clearCart = () => {
        console.log("cart was cleaned")
        this.setState(() => {
            return {
                cart: []
            }
        },
            () => {
                this.setProducts()
                this.addTotals()
                console.log(this.state)
            }
        )
    }

    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => (subTotal += item.total))
        const tempTax = subTotal * 0.1
        console.log({ subTotal })
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })

    }

    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    getItem: this.getItem,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    increment: this.increment
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }
