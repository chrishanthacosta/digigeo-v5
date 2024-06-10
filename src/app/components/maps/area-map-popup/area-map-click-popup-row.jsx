import Link from "next/link";

const AreaMapClickPopupRow = ({ label, value, url = "" }) => {
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
              className="w-80 p-1 underline text-blue-500 line-clamp-1"
              target="_blank"
              href={url}
            >
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

export default AreaMapClickPopupRow;
