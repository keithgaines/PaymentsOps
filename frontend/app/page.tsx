'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  AlertTriangle,
  FileText,
  Settings,
  Menu,
  X,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Filter,
  Download,
} from 'lucide-react';

// Types
interface KPICard {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  type: string;
}

interface Alert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  action?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

// Mock Data
const mockKPIs: KPICard[] = [
  {
    label: 'Transaction Volume',
    value: '$124.5M',
    change: 12.5,
    icon: <TrendingUp className="w-6 h-6" />,
    trend: 'up',
  },
  {
    label: 'Approval Rate',
    value: '98.2%',
    change: 2.3,
    icon: <CheckCircle className="w-6 h-6" />,
    trend: 'up',
  },
  {
    label: 'Pending Merchants',
    value: '47',
    change: -15,
    icon: <Users className="w-6 h-6" />,
    trend: 'down',
  },
  {
    label: 'Chargeback Ratio',
    value: '0.32%',
    change: -8.1,
    icon: <AlertTriangle className="w-6 h-6" />,
    trend: 'down',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    merchant: 'TechStore NYC',
    amount: 45000,
    status: 'completed',
    timestamp: '2 hours ago',
    type: 'Card Payment',
  },
  {
    id: 'TXN002',
    merchant: 'Global Retail Inc',
    amount: 120000,
    status: 'completed',
    timestamp: '4 hours ago',
    type: 'Wire Transfer',
  },
  {
    id: 'TXN003',
    merchant: 'Fashion Hub Ltd',
    amount: 67500,
    status: 'pending',
    timestamp: '6 hours ago',
    type: 'Card Payment',
  },
  {
    id: 'TXN004',
    merchant: 'Digital Services Co',
    amount: 23000,
    status: 'completed',
    timestamp: '8 hours ago',
    type: 'ACH Transfer',
  },
  {
    id: 'TXN005',
    merchant: 'Enterprise Solutions',
    amount: 890000,
    status: 'completed',
    timestamp: '12 hours ago',
    type: 'Wire Transfer',
  },
  {
    id: 'TXN006',
    merchant: 'Quick Commerce Ltd',
    amount: 12500,
    status: 'failed',
    timestamp: '14 hours ago',
    type: 'Card Payment',
  },
];

const mockAlerts: Alert[] = [
  {
    id: 'ALR001',
    level: 'critical',
    title: 'High Chargeback Rate Detected',
    description: 'Merchant MER-2847 has exceeded chargeback threshold (5.2%)',
    timestamp: '32 minutes ago',
    action: 'Review',
  },
  {
    id: 'ALR002',
    level: 'warning',
    title: 'Unusual Transaction Pattern',
    description: 'Account MER-5031 shows 3x normal transaction velocity',
    timestamp: '1 hour ago',
    action: 'Analyze',
  },
  {
    id: 'ALR003',
    level: 'warning',
    title: 'Pending KYC Documents',
    description: '23 merchants awaiting document verification',
    timestamp: '2 hours ago',
    action: 'Process',
  },
  {
    id: 'ALR004',
    level: 'info',
    title: 'Settlement Completed',
    description: 'Daily settlement processed successfully. $2.3M transferred.',
    timestamp: '4 hours ago',
  },
];

// Navigation Items
const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: 'Dashboard',
    href: '#',
    active: true,
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: 'Merchants',
    href: '#',
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    label: 'Transactions',
    href: '#',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    label: 'Risk',
    href: '#',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: 'Reports',
    href: '#',
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: 'Settings',
    href: '#',
  },
];

// Component: KPI Card
const KPICard: React.FC<{ kpi: KPICard }> = ({ kpi }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="text-gray-600 text-sm font-medium">{kpi.label}</div>
      <div className="text-blue-500">{kpi.icon}</div>
    </div>
    <div className="mb-2">
      <div className="text-3xl font-bold text-slate-900">{kpi.value}</div>
    </div>
    <div className="flex items-center gap-1">
      <span
        className={`text-sm font-medium ${
          kpi.trend === 'up' ? 'text-green-600' : 'text-green-600'
        }`}
      >
        {kpi.trend === 'up' ? '+' : ''}
        {kpi.change}%
      </span>
      <span className="text-gray-500 text-xs">vs last month</span>
    </div>
  </div>
);

// Component: Transaction Status Badge
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status as keyof typeof styles] || styles.pending
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Component: Alert Item
const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  const levelStyles = {
    critical: 'border-l-4 border-red-500 bg-red-50',
    warning: 'border-l-4 border-yellow-500 bg-yellow-50',
    info: 'border-l-4 border-blue-500 bg-blue-50',
  };

  const iconStyles = {
    critical: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        levelStyles[alert.level as keyof typeof levelStyles]
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${iconStyles[alert.level]}`}>
          {alert.level === 'critical' ? (
            <AlertTriangle className="w-5 h-5" />
          ) : alert.level === 'warning' ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-900">{alert.title}</h4>
            <span className="text-xs text-gray-500">{alert.timestamp}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
          {alert.action && (
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 mt-2">
              {alert.action} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Component: Sidebar
const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <>
    {/* Mobile Overlay */}
    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
        onClick={onClose}
      />
    )}

    {/* Sidebar */}
    <aside
      className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg">PayOps</h1>
            <p className="text-xs text-slate-400">Operations</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-blue-500 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
            {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
          </a>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-sm text-slate-300">Last updated</p>
          <p className="text-xs text-slate-400 mt-1">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </aside>
  </>
);

// Main Dashboard Component
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <h2 className="text-2xl font-bold text-slate-900 flex-1 lg:flex-none">
              Dashboard
            </h2>

            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8 space-y-8">
          {/* KPI Cards Section */}
          <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Key Performance Indicators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockKPIs.map((kpi, idx) => (
                <KPICard key={idx} kpi={kpi} />
              ))}
            </div>
          </section>

          {/* Main Grid: Transactions & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Transactions */}
            <section className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Recent Transactions
                  </h3>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all →
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Transaction ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Merchant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            {tx.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                            {tx.merchant}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                            ${(tx.amount / 1000).toFixed(1)}K
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {tx.type}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <StatusBadge status={tx.status} />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {tx.timestamp}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Operational Alerts */}
            <section>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Operational Alerts
                  </h3>
                </div>

                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {mockAlerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    Manage alerts <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Stats */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-gray-600 text-sm">Transactions Today</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">1,247</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">99.2%</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Avg Response Time</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">234ms</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">System Status</p>
                <p className="text-2xl font-bold text-green-600 mt-1">Operational</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
