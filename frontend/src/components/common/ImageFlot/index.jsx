import "./styles.scss";
const ImageFlot = ({ src }) => {
  return (
    <div className="floatWarpper">
      <img src={src} alt={src} />
    </div>
  );
};

export default ImageFlot;
