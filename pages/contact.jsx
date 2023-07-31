import React from 'react';
import styles from '../styles/Contact.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Make sure to add the Instagram icon to the library
library.add(faTwitter, faInstagram, faFacebook);

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <FontAwesomeIcon className={styles.logo} icon={['fab', 'facebook']} />
          <FontAwesomeIcon className={styles.logo} icon={['fab', 'instagram']} />
          <FontAwesomeIcon className={styles.logo} icon={['fab', 'twitter']} />
      </div>
    </div>
  );
};

export default Contact;
