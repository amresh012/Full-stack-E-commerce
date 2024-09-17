import React from 'react';

const PreOrderTerms = () => {
  return (
    <div className="preorder-terms-container" style={styles.container}>
      <h1 style={styles.heading}>Pre-order Terms & Conditions</h1>
      <p style={styles.text}>
        Welcome to kfsFitness.com, a brand of Bhati Health Care Pvt. Ltd. We thank you for your interest in pre-ordering our products. By placing a pre-order with us, you agree to the following terms and conditions:
      </p>

      <h2 style={styles.subHeading}>1. Pre-Order Eligibility</h2>
      <p style={styles.text}>
        Pre-orders are available exclusively for select products. The availability of pre-orders will be clearly indicated on the product page.
      </p>

      <h2 style={styles.subHeading}>2. Payment</h2>
      <p style={styles.text}>
        Full payment is required at the time of placing a pre-order. Payment can be made using available payment methods, including credit/debit cards, net banking, or other available services.
      </p>

      <h2 style={styles.subHeading}>3. Estimated Delivery Date</h2>
      <p style={styles.text}>
        The estimated delivery date is indicated on the product page during the pre-order process. Please note that this is only an estimated date, and actual delivery times may vary.
      </p>

      <h2 style={styles.subHeading}>4. Shipping</h2>
      <p style={styles.text}>
        Shipping will commence once the product is available in stock. You will receive an email confirmation with tracking details once your pre-order has been shipped.
      </p>

      <h2 style={styles.subHeading}>5. Cancellations and Refunds</h2>
      <p style={styles.text}>
        You may cancel your pre-order at any time before the product has been shipped. Upon cancellation, a full refund will be issued. If the product has already been shipped, our standard return and refund policies will apply.
      </p>

      <h2 style={styles.subHeading}>6. Product Availability</h2>
      <p style={styles.text}>
        We make every effort to fulfill all pre-orders; however, product availability is not guaranteed. In case of unforeseen circumstances, such as manufacturing delays or stock shortages, we will notify you and provide a full refund.
      </p>

      <h2 style={styles.subHeading}>7. Changes to Pre-order Terms</h2>
      <p style={styles.text}>
        Bhati Health Care Pvt. Ltd. reserves the right to modify these pre-order terms and conditions at any time without prior notice. Please review these terms periodically for updates.
      </p>

      <h2 style={styles.subHeading}>8. Contact Us</h2>
      <p style={styles.text}>
        If you have any questions or concerns about your pre-order, please contact our customer support at support@kfsFitness.com or call us at +91-9650104416.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'left',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  text: {
    fontSize: '16px',
    marginBottom: '10px',
  },
};

export default PreOrderTerms;
