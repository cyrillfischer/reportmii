import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Download, Share2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { DashboardLayout } from '../components/DashboardLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { dashboardTranslations } from '../i18n/dashboard';
import { supabase } from '../supabase/supabaseClient';
import { Button } from '../components/Button';

interface Analysis {
  id: string;
  company_name: string;
  type: string;
  created_at: string;
}

interface BlockResult {
  name: string;
  value: number;
  color: string;
}

export function Report() {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [blockResults, setBlockResults] = useState<BlockResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
    loadResults();
  }, [id]);

  const loadAnalysis = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!error && data) {
      setAnalysis(data);
    }
    setLoading(false);
  };

  const loadResults = async () => {
    if (!id) return;

    const { data: blocks } = await supabase
      .from('blocks')
      .select('id, title, questions(id, is_main)')
      .eq('analysis_id', id)
      .eq('is_active', true);

    if (!blocks) return;

    const results: BlockResult[] = [];
    const colors = ['#8b5cf6', '#a78bfa', '#5eead4', '#14b8a6', '#f97316', '#ec4899'];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const mainQuestions = (block.questions as any[]).filter((q) => q.is_main);

      if (mainQuestions.length === 0) continue;

      const questionIds = mainQuestions.map((q) => q.id);
      const { data: answers } = await supabase
        .from('answers')
        .select('numeric_value')
        .in('question_id', questionIds)
        .eq('analysis_id', id);

      if (answers && answers.length > 0) {
        const avg = answers.reduce((sum, a) => sum + (a.numeric_value || 0), 0) / answers.length;
        results.push({
          name: block.title,
          value: Math.round((avg / 5) * 100),
          color: colors[i % colors.length],
        });
      }
    }

    setBlockResults(results);
  };

  const sampleData = blockResults.length > 0 ? blockResults : [
    { name: 'Strategie', value: 85, color: '#8b5cf6' },
    { name: 'Prozesse', value: 72, color: '#a78bfa' },
    { name: 'Team', value: 91, color: '#5eead4' },
    { name: 'Innovation', value: 68, color: '#14b8a6' },
  ];

  const pieData = [
    { name: 'Hervorragend', value: 45, color: '#8b5cf6' },
    { name: 'Gut', value: 35, color: '#a78bfa' },
    { name: 'Verbesserung', value: 20, color: '#5eead4' },
  ];

  const topActions = [
    { area: 'Innovation', score: 68, suggestion: 'Innovationsprozesse strukturieren und fördern' },
    { area: 'Prozesse', score: 72, suggestion: 'Digitalisierung von Kernprozessen vorantreiben' },
    { area: 'Strategie', score: 85, suggestion: 'Strategische Ziele klar kommunizieren' },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Analyse nicht gefunden</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {t.report.title}
              </h1>
              <p className="text-xl text-gray-600">
                {analysis.company_name} • {new Date(analysis.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary">
                <Share2 size={18} className="mr-2" />
                {t.report.shareLink}
              </Button>
              <Button variant="primary">
                <Download size={18} className="mr-2" />
                {t.report.downloadPDF}
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bereichsanalyse</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {sampleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {sampleData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-bold bg-gradient-to-r from-violet-600 to-teal-500 bg-clip-text text-transparent">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gesamtbewertung</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="text-violet-600" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{t.report.topActions}</h3>
          </div>

          <div className="space-y-4">
            {topActions.map((action, index) => (
              <motion.div
                key={action.area}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-r from-violet-50 to-teal-50 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-bold text-gray-900">{index + 1}. {action.area}</h4>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                    {action.score}%
                  </span>
                </div>
                <p className="text-gray-600">{action.suggestion}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-violet-500 to-teal-300 rounded-3xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Zusammenfassung</h3>
          <p className="text-lg">
            Ihre Organisation zeigt starke Leistungen im Bereich Team (91%) und Strategie (85%).
            Verbesserungspotenzial besteht in den Bereichen Innovation und Prozessdigitalisierung.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
