import errorImage from "../../src/Components/Assets/404-Image.svg"

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      {/* Error Image */}
      <img src={errorImage} alt="404 Error" className="h-32 md:h-64 mb-6" />

      {/* Heading */}
      <h2 className="text-blue-600 text-2xl font-bold mb-4">
        Oops! there's nothing here
      </h2>

      {/* Paragraph */}
      <p className=" max-w-3xs md:max-w-sm text-[#8D8D8D] mb-12">
        This page doesn’t exist, kindly click the button below to find your way back home
      </p>

      {/* Button */}
      <a href="/">
      <button className="border border-gray-600 hover:bg-red-600 hover:text-white text-black py-3 rounded-md w-44 cursor-pointer"> 
        Go back home
      </button>
      </a>
    </div>
  )
};

export default NotFound;
