import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
// import { Notification, Message } from "element-react";

const stripeConfig = {
  publishableAPIKey: 'pk_test_uScALQ791ox1SQscViyuQ9GU',
  currency: 'USD'
};

const PayButton = ({ product, user }) => {
  return (
    <StripeCheckout
      email={user.attributes.email}
      name={product.description}
      amount={product.price}
      currency={stripeConfig.currency}
      stripeKey={stripeConfig.publishableAPIKey}
      shippingAddress={product.shipped}
      billingAddress={product.shipped}
      locale="auto"
      allowRememberMe={false}
    />
  );
};

export default PayButton;
