import Link from "next/link";

const PropertyMapClickPopupRow = ({ label, value, url = "" }) => {
  const isUrl = (url) => {
    if (url) {
      const removeHttp = url.replace(/(^\w+:|^)\/\//, "");
      return removeHttp;
    }
  };

  return (
    <>
      {value ? (
        <div className="flex  max-w-[300px] flex-wrap sm:flex-nowrap sm:max-w-none max-sm:[&>*:nth-child(odd)]:bg-gray-200 max-sm:[&>*:nth-child(even)]:bg-gray-300">
          <span className="w-80 sm:w-48 p-1">{label}</span>
          {url != "" ? (
            <Link
              className="w-80 p-1 mr-4 line-clamp-3  underline text-blue-500 "
              target="_blank"
              href={url}
            >
              {/* {value} */}
              {isUrl(value)}
            </Link>
          ) : (
            <p className="w-80 p-1 ">{value}</p>
          )}
        </div>
      ) : null}
    </>
  );
};
//do this for all maps

export default PropertyMapClickPopupRow;
