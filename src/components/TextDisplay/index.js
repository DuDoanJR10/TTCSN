const TEXT_DEFAULT = 'N/A';

const TextDisplay = ({
  className,
  text,
  defaultText = TEXT_DEFAULT,
}) => {
  if (typeof text === 'undefined' || text === null || text === '') {
    return <span className={className}>{defaultText}</span>;
  }
  return <span className={className}>{text}</span>;
};

export default TextDisplay;
