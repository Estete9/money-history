import PropTypes from 'prop-types';
import styles from '../styles/sectionHeader.module.css';

function SectionHeader({ name, value }) {
  return (
    <section className={styles.sectionHeader}>
      <img src="/" alt="currency icon" />
      <div>
        <p>{name}</p>
        <p>{value}</p>
      </div>
    </section>
  );
}

SectionHeader.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SectionHeader;
