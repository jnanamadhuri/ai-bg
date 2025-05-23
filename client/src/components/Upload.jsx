import { assets } from "../assets/assets";

const Upload = () => {
  return (
    <div className="pb-16">
      <h1 className="text-center text-2xl md:text-3xl py-6 md:py-16 lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        See the magic. Try now
      </h1>
      <div className="text-center mb-24">
        <input type="file" id="upload2" hidden />
        <label
          htmlFor="upload2"
          className="inline-flex gap-3 px-6 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700 "
        >
          <img width={20} src={assets.upload_btn_icon} alt="" />
          <p className="text-white text-sm ">Upload your image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
