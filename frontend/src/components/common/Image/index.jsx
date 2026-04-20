import "./styles.scss";
const Image = ({ src, className, alt }) => {
  return (
    <div className={`ImgContainer ${className}`}>
      <img src={src} alt={alt} />
    </div>
  )
};

export default Image;
