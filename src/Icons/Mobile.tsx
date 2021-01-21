import * as React from "react"

function Mobile(props:any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.367 0h2.273c.929 0 1.66.752 1.66 1.663v16.674c0 .91-.731 1.663-1.66 1.663H4.66C3.751 20 3 19.267 3 18.337V1.663C3 .753 3.731 0 4.66 0H12.367zm1.443 18.356c.454 0 .83-.376.83-.831h.02V2.495a.836.836 0 00-.83-.832h-1.443v.832c0 .455-.415.832-.909.832H7.841c-.493 0-.908-.377-.908-.832v-.832H5.49a.836.836 0 00-.83.832v15.03c0 .455.376.831.83.831h8.32zm-5.83-.831h3.34c.455 0 .83-.377.83-.832a.836.836 0 00-.83-.832H7.98a.836.836 0 00-.83.832c0 .455.376.832.83.832z"
        fill="#F7F8FC"
      />
    </svg>
  )
}

export default Mobile
