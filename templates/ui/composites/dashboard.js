// 仪表板布局模板
export const DashboardLayout = ({ children, sidebar, header }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {header || (
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            {sidebar || (
              <nav className="space-y-2">
                <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Overview
                </a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Analytics
                </a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Settings
                </a>
              </nav>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
