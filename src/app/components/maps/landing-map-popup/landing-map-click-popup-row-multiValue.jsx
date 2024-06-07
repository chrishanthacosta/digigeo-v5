
 "use client"

const LandingMapClickPopupRowMultiValue = ({label, value   }) => {
  return (
    <div className="flex  max-w-[300px] flex-wrap sm:flex-nowrap sm:max-w-none max-sm:[&>*:nth-child(odd)]:bg-gray-200 max-sm:[&>*:nth-child(even)]:bg-gray-300">
      <span className="w-80 sm:w-48 p-1">{label}</span>
      <div className="flex-col p-1 w-80 divide-y-1 divide-white">
        {value.map(
          (v, index) =>
            v && (
              <span
                key={index}
                className=" block pl-1 pt-1 pb-1 pr-1 line-clamp-2"
              >
                {v}
              </span>
            )
        )}
      </div>
    </div>
  );
}

export default LandingMapClickPopupRowMultiValue