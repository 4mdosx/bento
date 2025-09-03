// 格式化工具函数模板
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date))
}

export const formatNumber = (number, options = {}) => {
  return new Intl.NumberFormat('en-US', options).format(number)
}

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
