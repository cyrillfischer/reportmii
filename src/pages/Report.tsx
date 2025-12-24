import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Download, Share2, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useLanguage } from "../contexts/LanguageContext";
import { dashboardTranslations } from "../i18n/dashboard";
import { supabase } from "../supabase/supabaseClient";
import { Button } from "../components/Button";

/* ------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------ */

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

/* ------------------------------------------------ */
/* PAGE */
/* ------------------------------------------------ */

export default function Report() {
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

  /* ------------------------------------------------ */
  /* DATA */
  /* ------------------------------------------------ */

  const loadAnalysis = async () => {
    if (!id) return;

    const { data } = await supabase
      .from("analyses")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (data) setAnalysis(data);
    setLoading(false);
  };

  const loadResults = async () => {
    if (!id) return;

    const { data: blocks } = await supabase
      .from("blocks")
      .select("id, title, questions(id, is_main)")
      .eq("analysis_id", id)
      .eq("is_active", true);

    if (!blocks) return;

    const colors = [
      "#8b5cf6",
      "#a78bfa",
      "#5eead4",
      "#14b8a6",
      "#f97316",
      "#ec4899",
    ];

    const results: BlockResult[] = [];

    for (let i = 0; i < blocks.length; i++) {
      const block: any = blocks[i];
      const mainQuestions = block.questions.filter((q: any) => q.is_main);

      if (!mainQuestions.length) continue;

      const questionIds = mainQuestions.map((q: any) => q.id);

      const { data: answers } = await supabase
        .from("answers")
        .select("numeric_value")
        .in("question_id", questionIds)
        .eq("analysis_id", id);

      if (!answers?.length) continue;

      const avg =
        answers.reduce((sum, a) => sum + (a.numeric_value || 0), 0) /
        answers.length;

      results.push({
        name: block.title,
        value: Math.round((avg / 5) * 100),
        color: colors[i % colors.length],
      });
    }

    setBlockResults(results);
  };

  /* ------------------------------------------------ */
  /* FALLBACK DATA */
  /* ------------------------------------------------ */

  const sampleData =
    blockResults.length > 0
      ? blockResults
      : [
          { name: "Strategie", value: 85, color: "#8b5cf6" },
          { name: "Prozesse", value: 72, color: "#a78bfa" },
          { name: "Team", value: 91, color: "#5eead4" },
          { name: "Innovation", value: 68, color: "#14b8a6" },
        ];

  const pieData = [
    { name: "Hervorragend", value: 45, color: "#8b5cf6" },
    { name: "Gut", value: 35, color: "#a78bfa" },
    { name: "Verbesserung", value: 20, color: "#5eead4" },
  ];

  const topActions = [
    {
      area: "Innovation",
      score: 68,
      suggestion: "Innovationsprozesse klar strukturieren und fördern",
    },
    {
      area: "Prozesse",
      score: 72,
      suggestion: "Digitale Kernprozesse priorisieren und automatisieren",
    },
    {
      area: "Strategie",
      score: 85,
      suggestion: "Strategische Ziele klar kommunizieren",
    },
  ];

  /* ------------------------------------------------ */
  /* STATES */
  /* ------------------------------------------------ */

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#7eb6b8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-20 text-gray-600">
        Analyse nicht gefunden
      </div>
    );
  }

  /* ------------------------------------------------ */
  /* UI */
  /* ------------------------------------------------ */

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-[#1b1f23] mb-2">
              {t.report.title}
            </h1>
            <p className="text-gray-600">
              {analysis.company_name} ·{" "}
              {new Date(analysis.created_at).toLocaleDateString()}
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

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Bereichsanalyse</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {sampleData.map((item, i) => (
                  <Cell key={i} fill={item.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Gesamtbewertung</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                paddingAngle={5}
              >
                {pieData.map((item, i) => (
                  <Cell key={i} fill={item.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOP ACTIONS */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={28} className="text-[#7eb6b8]" />
          <h3 className="text-xl font-semibold">{t.report.topActions}</h3>
        </div>

        <div className="space-y-4">
          {topActions.map((a, i) => (
            <div
              key={a.area}
              className="rounded-2xl bg-[#f0f7f7] p-6"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">
                  {i + 1}. {a.area}
                </h4>
                <span className="font-semibold">{a.score}%</span>
              </div>
              <p className="text-gray-600">{a.suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="rounded-3xl bg-[#1b1f23] text-white p-8 text-center">
        <h3 className="text-2xl font-semibold mb-3">Zusammenfassung</h3>
        <p className="opacity-90">
          Starke Resultate in Team und Strategie. Fokus sollte nun auf Innovation
          und Prozessoptimierung liegen.
        </p>
      </div>
    </div>
  );
}
