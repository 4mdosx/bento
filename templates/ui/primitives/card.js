// 卡片组件模板
export const Card = ({ title, description, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  )
}

export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  )
}
