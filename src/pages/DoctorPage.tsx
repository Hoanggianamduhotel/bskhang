import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { Users, Stethoscope, LogOut, Menu } from 'lucide-react'

export default function DoctorPage() {
  const [activeTab, setActiveTab] = useState<'waiting' | 'examination'>('waiting')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 hidden md:flex md:flex-shrink-0`}>
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-green-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-green-900">
              <h1 className="text-white text-lg font-semibold">Bác sĩ</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                <button 
                  onClick={() => setActiveTab('waiting')}
                  className={`${
                    activeTab === 'waiting' ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700'
                  } group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Users className="text-green-200 mr-3 h-5 w-5" />
                  Danh sách chờ
                </button>
                <button 
                  onClick={() => setActiveTab('examination')}
                  className={`${
                    activeTab === 'examination' ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700'
                  } group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Stethoscope className="text-green-200 mr-3 h-5 w-5" />
                  Khám bệnh
                </button>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-green-700 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 w-full group block text-left"
              >
                <div className="flex items-center">
                  <LogOut className="text-green-200 mr-3 h-5 w-5" />
                  <div className="text-sm">
                    <p className="text-white">Đăng xuất</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {activeTab === 'waiting' ? 'Danh sách bệnh nhân chờ khám' : 'Khám bệnh'}
              </h1>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {activeTab === 'waiting' && (
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col">
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Danh sách bệnh nhân chờ khám
                    </h2>
                    <div className="text-gray-500">
                      Chức năng danh sách chờ sẽ được triển khai ở đây
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'examination' && (
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col">
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Khám bệnh
                    </h2>
                    <div className="text-gray-500">
                      Form khám bệnh sẽ được triển khai ở đây
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}