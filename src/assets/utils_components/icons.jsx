import './icons.css'
export const SuccessIcon = ()=>{
  return(
    <div className="screenAlert-icon screenAlert-success animate">
      <span className="screenAlert-line screenAlert-tip animateSuccessTip"></span>
      <span className="screenAlert-line screenAlert-long animateSuccessLong"></span>
      <div className="screenAlert-placeholder"></div>
      <div className="screenAlert-fix"></div>
    </div>
  )
}

export const ErrorIcon = ()=>{
  return(
    <div className="screenAlert-icon screenAlert-error animate">
		<span className="screenAlert-x-mark">
			<span className="screenAlert-line screenAlert-left animateXLeft"></span>
			<span className="screenAlert-line screenAlert-right animateXRight"></span>
		</span>
      <div className="screenAlert-placeholder"></div>
      <div className="screenAlert-fix"></div>
    </div>
  )
}

export default {SuccessIcon,ErrorIcon}