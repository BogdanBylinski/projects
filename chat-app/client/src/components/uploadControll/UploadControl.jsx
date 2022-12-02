import images from "../../assets/images/images.json";

const UploadControl = ({
  children,
  value,
  onChange,
  disabled,
  accept,
  photoLink,
}) => {
  return (
    <label htmlFor="contained-button-file" className="m-0 w-100">
      <input
        value={value}
        accept={accept}
        disabled={disabled}
        style={{ display: "none" }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={disabled ? () => {} : onChange}
      />
      <img src={!photoLink ? images[4].url : photoLink} alt="avatar " />
    </label>
  );
};
export default UploadControl;
