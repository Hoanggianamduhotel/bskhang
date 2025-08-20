import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { UserPlus, Users, LogOut } from 'lucide-react'

export default function ReceptionistPage() {
  const [activeTab, setActiveTab] = useState<'patients' | 'waiting'>('patients')

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-blue-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-900">
              <h1 className="text-white text-lg font-semibold">Lễ tân</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                <button 
                  onClick={() => setActiveTab('patients')}
                  className={`${
                    activeTab === 'patients' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
                  } group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <UserPlus className="text-blue-200 mr-3 h-5 w-5" />
                  Quản lý bệnh nhân
                </button>
                <button 
                  onClick={() => setActiveTab('waiting')}
                  className={`${
                    activeTab === 'waiting' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
                  } group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Users className="text-blue-200 mr-3 h-5 w-5" />
                  Danh sách chờ
                </button>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-blue-700 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 w-full group block text-left"
              >
                <div className="flex items-center">
                  <LogOut className="text-blue-200 mr-3 h-5 w-5" />
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
          <div className="flex-1 px-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {activeTab === 'patients' ? 'Quản lý bệnh nhân' : 'Danh sách chờ khám'}
              </h1>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {activeTab === 'patients' && (
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col">
                  <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Danh sách bệnh nhân
                      </h2>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Thêm bệnh nhân
                      </Button>
                    </div>
                    <div className="text-gray-500">
                      Danh sách bệnh nhân sẽ được hiển thị ở đây
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'waiting' && (
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col">
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Danh sách chờ khám hôm nay
                    </h2>
                    <div className="text-gray-500">
                      Danh sách bệnh nhân chờ khám sẽ được hiển thị ở đây
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