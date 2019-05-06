import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import StripeCheckout from 'react-stripe-checkout';
// import { Notification, Message } from "element-react";

const stripeConfig = {
  publishableAPIKey: 'pk_test_uScALQ791ox1SQscViyuQ9GU',
  currency: 'USD'
};

const PayButton = ({ product, user }) => {
  const getOwnerEmail = async ownerId => {
    try {
      const input = { id: ownerId };
      const result = await API.graphql(graphqlOperation(getUser, input));
      return result.data.getUser.email;
    } catch (err) {
      console.error('error fatching product owners email: ', err);
    }
  };

  const handleCharge = async token => {
    const ownerEmail = await getOwnerEmail(product.owner);
    console.log({ ownerEmail });
    try {
      const result = await API.post('orderlambda', '/charge', {
        body: {
          token,
          charge: {
            currency: stripeConfig.currency,
            amount: product.price,
            description: product.description
          },
          email: {
            customerEmail: user.attributes.email,
            ownerEmail,
            shipped: product.shipped
          }
        }
      });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StripeCheckout
      token={handleCharge}
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
