import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="6" ry="6" width="280" height="27" /> 
    <rect x="-5" y="310" rx="5" ry="5" width="280" height="88" /> 
    <rect x="0" y="418" rx="6" ry="6" width="92" height="27" /> 
    <rect x="128" y="418" rx="6" ry="6" width="152" height="27" /> 
    <circle cx="140" cy="177" r="130" />
  </ContentLoader>
)

export default MyLoader