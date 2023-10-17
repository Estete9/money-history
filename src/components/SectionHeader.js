import PropTypes from 'prop-types';

function SectionHeader({ name, value }) {
  return (
    <section>
      <img src="/" alt="section header" />
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
