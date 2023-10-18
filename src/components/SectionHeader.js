import PropTypes from 'prop-types';
import styles from '../styles/sectionHeader.module.css';

function SectionHeader({ countryName, value }) {
  return (
    <section className={styles.sectionHeader}>
      <img src="/" alt="currency icon" />
      <div>
        <p>{countryName}</p>
        <p>{value}</p>
      </div>
    </section>
  );
}

SectionHeader.propTypes = {
  countryName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SectionHeader;
