// src/pages/AnalysisConfiguration.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "../components/Button";

import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

import {
  businessBlocks,
  insideBlocks,
  customBlockTemplate,
  BlockTemplate,
} from "../data/blockTemplates";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { GripVertical, Trash2, Plus } from "lucide-react";

// ----------------------------------------------------------
// Sortable Block Component
// ----------------------------------------------------------
function SortableBlock({
  block,
  onToggle,
  onRemove,
}: {
  block: any;
  onToggle: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-2xl p-6 shadow-lg bg-white mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-gray-400 hover:text-gray-600"
          >
            <GripVertical size={20} />
          </button>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{block.title}</h3>
            <p className="text-sm text-gray-600">
              {block.questions.length} Fragen
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={block.isActive}
              onChange={onToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-checked:bg-violet-600 rounded-full relative">
              <div className="absolute bg-white w-5 h-5 rounded-full left-1 top-0.5 transition-all peer-checked:translate-x-5"></div>
            </div>
          </label>

          {block.isCustom && (
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------
// Main Component
// ----------------------------------------------------------
export function AnalysisConfiguration() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [params] = useSearchParams();
  const type = params.get("type") || "business";
  const id = params.get("id"); // analysis.id

  const [step, setStep] = useState(0);

  // Step 0: Basic settings
  const [analysisName, setAnalysisName] = useState("");

  // Step 1: Company info
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");

  // Step 2: Block selection
  const [selectedBlocks, setSelectedBlocks] = useState<any[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  // Load block templates on mount
  useEffect(() => {
    const blocks = type === "business" ? businessBlocks : insideBlocks;

    const defaults = blocks.map((b, i) => ({
      ...b,
      id: `block-${i}`,
      isActive: true,
      isCustom: false,
    }));

    setSelectedBlocks(defaults);
  }, [type]);

  // Drag & Drop
  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSelectedBlocks((prev) => {
      const oldIndex = prev.findIndex((b) => b.id === active.id);
      const newIndex = prev.findIndex((b) => b.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const toggleBlock = (id: string) =>
    setSelectedBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, isActive: !b.isActive } : b
      )
    );

  const addBlock = () =>
    setSelectedBlocks((prev) => [
      ...prev,
      {
        ...customBlockTemplate,
        id: `custom-${Date.now()}`,
        isActive: true,
        isCustom: true,
      },
    ]);

  const removeBlock = (id: string) =>
    setSelectedBlocks((prev) => prev.filter((b) => b.id !== id));

  // ----------------------------------------------------------
  // Save Analysis (final step)
  // ----------------------------------------------------------
  const saveAnalysis = async () => {
    if (!id || !user) return;

    // Update base info
    await supabase
      .from("analyses")
      .update({
        company_name: companyName,
        industry,
        country,
        status: "running",
      })
      .eq("id", id);

    // Save blocks
    for (let i = 0; i < selectedBlocks.length; i++) {
      const block = selectedBlocks[i];

      if (!block.isActive) continue;

      const { data: newBlock } = await supabase
        .from("blocks")
        .insert({
          analysis_id: id,
          title: block.title,
          order_index: i,
          is_custom: block.isCustom,
          is_active: true,
        })
        .select()
        .single();

      if (newBlock) {
        for (let j = 0; j < block.questions.length; j++) {
          const q = block.questions[j];

          await supabase.from("questions").insert({
            block_id: newBlock.id,
            text: q.text,
            type: q.type,
            order_index: j,
          });
        }
      }
    }

    navigate(`/analysis/questionnaire/${id}`);
  };

  // ----------------------------------------------------------
  // Render Steps
  // ----------------------------------------------------------
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-12">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-6"
        >
          {type === "business" ? "Business.mii Analyse" : "Inside.mii Analyse"}
        </motion.h1>

        {/* STEP 0 – Analysis name */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-3xl shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Analyse-Name</h2>

            <input
              type="text"
              placeholder="Analyse Titel"
              value={analysisName}
              onChange={(e) => setAnalysisName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300"
            />

            <div className="flex justify-end mt-8">
              <Button onClick={() => setStep(1)} variant="primary">
                Weiter
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 1 – Company info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-3xl shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Firmendaten</h2>

            <div className="space-y-6">
              <input
                type="text"
                placeholder="Firmenname"
                className="w-full px-4 py-3 rounded-xl border"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Branche"
                className="w-full px-4 py-3 rounded-xl border"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              <input
                type="text"
                placeholder="Land"
                className="w-full px-4 py-3 rounded-xl border"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="secondary" onClick={() => setStep(0)}>
                Zurück
              </Button>
              <Button variant="primary" onClick={() => setStep(2)}>
                Weiter
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 – Block selection */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-3xl shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">
              Themenblöcke wählen
            </h2>

            <Button
              onClick={addBlock}
              className="mb-6"
              variant="secondary"
            >
              <Plus size={18} className="mr-2" />
              Eigenen Block hinzufügen
            </Button>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext
                items={selectedBlocks.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                {selectedBlocks.map((block) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    onToggle={() => toggleBlock(block.id)}
                    onRemove={() => removeBlock(block.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <div className="flex justify-between mt-8">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Zurück
              </Button>
              <Button variant="primary" onClick={() => setStep(3)}>
                Weiter
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 – Summary */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-3xl shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Zusammenfassung</h2>

            <p className="text-gray-700 mb-6">
              Überprüfe deine Angaben und starte die Analyse.
            </p>

            <ul className="space-y-3 text-gray-800">
              <li><strong>Analyse:</strong> {analysisName}</li>
              <li><strong>Firma:</strong> {companyName}</li>
              <li><strong>Branche:</strong> {industry}</li>
              <li><strong>Land:</strong> {country}</li>
              <li><strong>Aktive Themenblöcke:</strong> {
                selectedBlocks.filter((b) => b.isActive).length
              }</li>
            </ul>

            <div className="flex justify-between mt-8">
              <Button variant="secondary" onClick={() => setStep(2)}>
                Zurück
              </Button>
              <Button variant="primary" onClick={saveAnalysis}>
                Analyse starten
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
