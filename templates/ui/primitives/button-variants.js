// 按钮变体模板
export const buttonVariants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md",
  danger: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md",
  success: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md",
  outline: "border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md"
}

export const Button = ({ variant = 'primary', children, ...props }) => {
  return (
    <button
      className={buttonVariants[variant]}
      {...props}
    >
      {children}
    </button>
  )
}
