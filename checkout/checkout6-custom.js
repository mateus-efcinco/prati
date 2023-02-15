function sendObservation() {
  let info = ''
  let paymentMethod = ''

  $(window).on('hashchange', () => {
    if (window.location.hash == '#/payment') {
      setTimeout(() => {
        paymentMethod = document.querySelector(".payment-group-list-btn .payment-group-item.active .payment-group-item-text").innerText;
        sendObs(paymentMethod)
      }, 3000);
    }
  })

  $(document).on("click", ".payment-group-item", function () {
    paymentMethod = document.querySelector(".payment-group-list-btn .payment-group-item.active .payment-group-item-text").innerText;
    sendObs(paymentMethod)
  })

  const sendObs = (paymentMethod) => {
    if (document.getElementsByClassName('.shipping-selected-description').length) {
      info = document.querySelector('.shipping-selected-description').innerText
    } else {
      if (document.querySelectorAll('.product-item .shipping-date').length) {
        info = document.querySelector('.product-item .shipping-date .shipping-estimate-date:not(.shipping-estimate-detail)').innerText + ' - ' + document.querySelector('.product-item .shipping-date .shipping-estimate-date.shipping-estimate-detail').innerText
      }
    }

    let obs = `${info} - Forma de pagamento: ${paymentMethod}`;
    vtexjs.checkout
      .sendAttachment("openTextField", { value: obs })
      .done(function (orderForm) {
      })
      .fail(function () {
      });
  }
}

$(document).ready(function () {
  sendObservation();
});