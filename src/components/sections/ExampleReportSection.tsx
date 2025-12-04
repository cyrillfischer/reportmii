import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function ExampleReportSection() {
  const { t } = useLanguage();

  const barData = [
    { name: "Strategie", value: 85 },
    { name: "Prozesse", value: 72 },
    { name: "Team", value: 91 },
    { name: "Innovation", value: 68 },
  ];

  const pieData = [
    { name: "Hervorragend", value: 45 },
    { name: "Gut", value: 35 },
    { name: "Verbesserung", value: 20 },
  ];

  // dezente Design-A Farben
  const COLORS = ["#6D28D9", "#9F7AEA", "#D1D5DB"];

  return (
    <section className="w-full py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
            {t.exampleReport.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t.exampleReport.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* BAR CHART */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-3xl p-10 shadow-soft"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Bereichsanalyse
            </h3>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#6D28D9" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-8 space-y-4">
              {barData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-900 font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PIE CHART */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-3xl p-10 shadow-soft"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Gesamtbewertung
            </h3>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-8 space-y-3">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[idx] }}
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
