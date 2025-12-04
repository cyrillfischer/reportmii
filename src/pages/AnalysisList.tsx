import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { dashboardTranslations } from '../i18n/dashboard';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

interface Analysis {
  id: string;
  type: string;
  company_name: string;
  status: string;
  created_at: string;
}

export function AnalysisList() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = dashboardTranslations[language];
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadAnalyses();
  }, [user]);

  const loadAnalyses = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAnalyses(data);
    }
    setLoading(false);
  };

  const filteredAnalyses = analyses.filter((analysis) => {
    const matchesSearch = analysis.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || analysis.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t.analysis.completed;
      case 'in_progress':
        return t.analysis.inProgress;
      default:
        return t.analysis.draft;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t.dashboard.myAnalyses}
          </h1>
          <p className="text-xl text-gray-600">
            Übersicht aller deiner Analysen
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Suche nach Firmennamen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="all">Alle Typen</option>
              <option value="business">Business.mii</option>
              <option value="inside">Inside.mii</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredAnalyses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg"
          >
            <p className="text-gray-600 text-lg mb-6">
              Noch keine Analysen vorhanden
            </p>
            <button
              onClick={() => navigate('/analysis/new')}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-teal-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              {t.dashboard.newAnalysis}
            </button>
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.analysis.date}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Firma</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.analysis.type}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.analysis.status}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAnalyses.map((analysis, index) => (
                    <motion.tr
                      key={analysis.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/report/${analysis.id}`)}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(analysis.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {analysis.company_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {analysis.type === 'business' ? 'Business.mii' : 'Inside.mii'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(analysis.status)}`}>
                          {getStatusText(analysis.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-violet-600 hover:text-violet-700 font-medium text-sm">
                          Ansehen →
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
