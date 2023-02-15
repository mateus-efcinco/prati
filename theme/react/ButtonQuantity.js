import React, { useState } from 'react'
import { useProduct, useProductDispatch } from 'vtex.product-context'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { Spinner } from 'vtex.styleguide'
import styles from './styles.css';



const ButtonQuantity = () => {

  const productContextValue = useProduct()
  const productContextDispatch = useProductDispatch()

  const { orderForm: { items } } = useOrderForm()
  const { updateQuantity, removeItem } = useOrderItems()
  const { product, selectedQuantity, selectedItem, buyButton } = productContextValue

  const [qty, setQty] = useState(selectedQuantity)
  const [isLoading, setIsLoading] = useState(false)

  const max = selectedItem.sellers[0]?.commertialOffer.AvailableQuantity

  const options = {
    allowedOutdatedData: ['paymentData'],
  }

  const timeout = React.useRef();

  function handleClick(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    setIsLoading(true);

    let button = ev.target?.closest('article')?.querySelector('.vtex-button')

    if (button === undefined) {
      button = ev.target?.closest('.vtex-flex-layout-0-x-flexCol--product--rightCol')
        ?.querySelector('.vtex-flex-layout-0-x-flexRow--add--cart--hide .vtex-button')
    }

    button.click();
    setIsLoading(false);
  }

  const updateQty = React.useCallback((qty_) => {

    clearTimeout(timeout.current)

    setIsLoading(true);

    timeout.current = setTimeout(() => {
      let uniqueId = items.filter(item => item.id === selectedItem.itemId)[0].uniqueId

      if (qty_ === 0) {
        removeItem({ uniqueId }, options)
        return
      }

      updateQuantity({ uniqueId: uniqueId, quantity: qty_ }, options)

      setIsLoading(false);
    }, 2000)
  })

  const handleMinus = React.useCallback((ev) => {
    ev.stopPropagation()
    ev.preventDefault()

    if (qty > 1) {
      updateQty(qty - 1)
      setQty(qty - 1)
    }
    else if (qty === 1) {
      productContextDispatch({
        type: 'SET_BUY_BUTTON_CLICKED',
        args: { clicked: false },
      })
      updateQty(qty - 1)
    }
  })

  const handlePlus = React.useCallback((ev) => {
    ev.stopPropagation()
    ev.preventDefault()

    if (qty < max) {
      updateQty(qty + 1)
      setQty(qty + 1)
    }
  })

  const handleLoad = React.useCallback((ev) => {
    ev.stopPropagation()
    ev.preventDefault()
  })
  React.useEffect(() => {

    const cartItem = items.filter(item => item.id === selectedItem.itemId)

    if (cartItem.length) {
      productContextDispatch({
        type: 'SET_BUY_BUTTON_CLICKED',
        args: { clicked: true },
      })

      setQty(cartItem[0].quantity)
    }
    else {
      productContextDispatch({
        type: 'SET_BUY_BUTTON_CLICKED',
        args: { clicked: false },
      })
      setQty(1)
    }

    setIsLoading(false);
  }, [items])

  if (max <= 0) {
    return (
      <>
        <div className={styles.unavailable}>
          <span>Indisponível</span>
        </div>
      </>
    )
  }

  return (
    <>
      {isLoading && (
        <div className={styles.loadPrd} onClick={handleLoad}>
          <img src="/arquivos/ajax-loader.gif" alt="" />
        </div>
      )}
      {buyButton.clicked ? (
        <div onClick={handleLoad} className={`${styles.buttonWrapper} ${isLoading ? styles.buttonwLoading : ""}`}>
          <button
            className={styles.buttonQtyMinus}
            onClick={handleMinus}></button>

          <input type="text" value={qty} className={styles.inputQty} />

          <button
            className={styles.buttonQtyPlus}
            onClick={handlePlus}></button>
        </div>
      ) : (
        <div className={styles.buttonWrapper} style={{ width: "100%" }}>
          <button style={{
            backgroundColor: "#009180",
            fontSize: "18px",
            color: "#fff",
            border: " none",
            width: "100%",
            padding: "16px",
            textTransform: "uppercase",
            fontWeight: "500",
            borderRadius: "4px",
            fontFamily: "Nyata",
            cursor: "pointer"
          }}
            className={`${styles.buttonClick} ${isLoading ? styles.buttonLoading : ""}`}
            onClick={handleClick} disabled={isLoading}>
            {isLoading ?
              <Spinner size="24" color="white" /> :
              "comprar"
            }
          </button>
        </div>
      )}
    </>
  )
}

export default ButtonQuantity
