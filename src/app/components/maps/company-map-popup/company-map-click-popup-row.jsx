import  Link  from 'next/link';

const CompanyMapClickPopupRow = ({label, value, url="" }) => {
  return (
    <>
      {value ? (
        <div className="flex  max-w-[300px] flex-wrap sm:flex-nowrap sm:max-w-none max-sm:[&>*:nth-child(odd)]:bg-gray-200 max-sm:[&>*:nth-child(even)]:bg-gray-300">
          <span className="w-80 sm:w-48 p-1">{label}</span>
          {url != "" ? (
            <Link
              className="w-80 p-1 underline text-blue-500 line-clamp-2"
              target="_blank"
              href={url}
            >
              {value}
            </Link>
          ) : (
            <span className="w-80 p-1 line-clamp-2">{value}</span>
          )}
        </div>
      ) : null}
    </>
  );
}

export default CompanyMapClickPopupRow