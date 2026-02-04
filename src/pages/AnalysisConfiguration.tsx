// src/pages/AnalysisConfiguration.tsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

import {
  businessBlocks,
  insideBlocks,
  customBlockTemplate,
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

import {
  GripVertical,
  Trash2,
  Plus,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Layers,
  FileBarChart2,
  Palette,
  BadgeCheck,
  Building2,
  User2,
  CalendarDays,
  Sparkles,
} from "lucide-react";

// ----------------------------------------------------------
// Helpers
// ----------------------------------------------------------
function formatDateDE(d: Date) {
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());
  return `${day}.${month}.${year}`;
}

function isNonEmpty(v: string) {
  return v.trim().length > 0;
}

// ----------------------------------------------------------
// Sortable Block Component
// ----------------------------------------------------------
function SortableBlock({ block, onToggle, onRemove }: any) {
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
      className="rounded-2xl p-6 shadow-lg bg-white mb-4 border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-gray-400 hover:text-gray-600"
            title="Reihenfolge ändern"
          >
            <GripVertical size={20} />
          </button>

          <div>
            <h3 className="text-lg font-semibold text-[#1b1f23]">
              {block.title}
            </h3>
            <p className="text-sm text-gray-600">{block.questions.length} Fragen</p>
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
            <div className="w-11 h-6 bg-gray-300 peer-checked:bg-[#7eb6b8] rounded-full relative">
              <div className="absolute bg-white w-5 h-5 rounded-full left-1 top-0.5 transition-all peer-checked:translate-x-5" />
            </div>
          </label>

          {block.isCustom && (
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-700"
              title="Eigenen Block löschen"
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
  const { analysisId } = useParams();
  const { user } = useAuth() as any;

  // ----------------------------------------------------------
  // UI-Step innerhalb dieser Seite (1: Angaben, 2: Blöcke)
  // ----------------------------------------------------------
  const [step, setStep] = useState<1 | 2>(1);

  // ----------------------------------------------------------
  // Pflichtfelder
  // ----------------------------------------------------------
  const [companyName, setCompanyName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  // Logo aus Profil / Upload (PNG)
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  // Datum (vorausgefüllt, aber editierbar)
  const [date, setDate] = useState<string>(formatDateDE(new Date()));

  // Blocks
  const [selectedBlocks, setSelectedBlocks] = useState<any[]>([]);

  // Form validation
  const [touched, setTouched] = useState(false);

  // DnD
  const sensors = useSensors(useSensor(PointerSensor));

  // ----------------------------------------------------------
  // Prefill aus User-Profil (ohne TS-Errors: safe via any + Fallbacks)
  // ----------------------------------------------------------
  useEffect(() => {
    const u: any = user || {};
    const meta: any =
      u?.user_metadata ||
      u?.data?.user?.user_metadata ||
      u?.app_metadata ||
      {};

    // Name (falls vorhanden)
    const fn = meta?.first_name || meta?.firstname || meta?.given_name || "";
    const ln = meta?.last_name || meta?.lastname || meta?.family_name || "";
    const fullName = [fn, ln].filter(Boolean).join(" ").trim();

    if (fullName) setCreatedBy(fullName);

    // Company (falls vorhanden)
    const company =
      meta?.company ||
      meta?.company_name ||
      meta?.organisation ||
      meta?.organization ||
      "";
    if (company) setCompanyName(company);

    // Logo URL (falls vorhanden)
    const logo =
      meta?.logo_url ||
      meta?.logoUrl ||
      meta?.company_logo ||
      meta?.companyLogo ||
      "";
    if (logo) {
      setLogoUrl(logo);
    }
    setLogoPreview((prev) => (prev ? prev : logo));
  }, [user]);

  // Cleanup für lokale Preview-URLs
  useEffect(() => {
    return () => {
      if (logoPreview && logoPreview.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(logoPreview);
        } catch {
          // ignore
        }
      }
    };
  }, [logoPreview]);

  // ----------------------------------------------------------
  // Default Blocks – aktuell Business.mii
  // (insideBlocks bleibt drin und wird dynamisch verwendet, falls später nötig)
  // ----------------------------------------------------------
  useEffect(() => {
    const blocks = businessBlocks;

    const defaults = blocks.map((b, i) => ({
      ...b,
      id: `block-${i}`,
      isActive: true,
      isCustom: false,
    }));

    setSelectedBlocks(defaults);
  }, []);

  // ----------------------------------------------------------
  // Validations
  // ----------------------------------------------------------
  const canContinueStep1 = useMemo(() => {
    const hasLogo = !!logoFile || isNonEmpty(logoUrl);
    return isNonEmpty(companyName) && isNonEmpty(createdBy) && hasLogo;
  }, [companyName, createdBy, logoFile, logoUrl]);

  // ----------------------------------------------------------
  // DnD events
  // ----------------------------------------------------------
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
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
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
  // Save Analysis + Create Blocks/Questions
  // ----------------------------------------------------------
  const saveAnalysis = async () => {
    if (!analysisId || !user) return;

    setTouched(true);
    if (!canContinueStep1) return;

    // Logo Upload (PNG) – speichert URL in analyses.logo_url
    let finalLogoUrl = logoUrl;

    if (logoFile) {
      try {
        const safeName = logoFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `businessmii/${analysisId}/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("logos")
          .upload(path, logoFile, {
            upsert: true,
            contentType: "image/png",
          });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from("logos")
            .getPublicUrl(path);
          if (publicData?.publicUrl) {
            finalLogoUrl = publicData.publicUrl;
            setLogoUrl(publicData.publicUrl); // fallback / persist in UI
          }
        }
      } catch {
        // Upload optional – falls Storage/Bucket nicht konfiguriert ist, läuft der Flow trotzdem weiter
      }
    }

    // 1) Analyse updaten
    await supabase
      .from("analyses")
      .update({
        company_name: companyName,
        created_by: createdBy,
        created_at_human: date,
        logo_url: finalLogoUrl || null,
        status: "running",
      })
      .eq("id", analysisId);

    // 2) Blocks + Questions (nur aktive)
    for (let i = 0; i < selectedBlocks.length; i++) {
      const block = selectedBlocks[i];
      if (!block.isActive) continue;

      const { data: newBlock } = await supabase
        .from("blocks")
        .insert({
          analysis_id: analysisId,
          title: block.title,
          order_index: i,
          is_custom: block.isCustom,
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

    // 3) Weiter zu Fragen
    navigate(`/analysis/questionnaire/${analysisId}`);
  };

  return (
    <>
      {/* Content Card (gleiche Breite wie Header) */}
      <div className="mt-10 rounded-[28px] bg-white shadow-[0_20px_50px_rgba(27,31,35,0.12)] border border-gray-100 p-10">
        {/* STEP 1 – Angaben */}
        {step === 1 && (
          <>
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#1b1f23]">
                  Angaben zur Analyse
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  Kurzer Check, bevor du loslegst. Wir übernehmen so viel wie
                  möglich aus deinem Profil – du kannst alles noch anpassen.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-[#dff7f5] text-[#1b1f23] px-4 py-2 border border-[#a8d6d4] shadow-sm">
                <Sparkles size={16} />
                <span className="text-sm font-medium">Premium Setup</span>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              {/* Unternehmen */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#1b1f23]">
                  <Building2 size={16} className="text-gray-500" />
                  Unternehmen <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="z. B. Muster AG"
                  className={[
                    "mt-2 w-full px-4 py-3 rounded-xl border bg-white shadow-sm outline-none transition",
                    touched && !isNonEmpty(companyName)
                      ? "border-red-300 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:ring-2 focus:ring-[#a8d6d4]/60",
                  ].join(" ")}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                {touched && !isNonEmpty(companyName) && (
                  <p className="mt-2 text-xs text-red-600">
                    Bitte gib den Firmennamen ein.
                  </p>
                )}
              </div>

              {/* Ersteller + Datum */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#1b1f23]">
                    <User2 size={16} className="text-gray-500" />
                    Analyse erstellt von <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Vorname Nachname"
                    className={[
                      "mt-2 w-full px-4 py-3 rounded-xl border bg-white shadow-sm outline-none transition",
                      touched && !isNonEmpty(createdBy)
                        ? "border-red-300 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:ring-2 focus:ring-[#a8d6d4]/60",
                    ].join(" ")}
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                  />
                  {touched && !isNonEmpty(createdBy) && (
                    <p className="mt-2 text-xs text-red-600">
                      Bitte gib deinen Namen ein.
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#1b1f23]">
                    <CalendarDays size={16} className="text-gray-500" />
                    Datum
                  </label>
                  <input
                    type="text"
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 shadow-sm outline-none"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Du kannst das Datum bei Bedarf anpassen.
                  </p>
                </div>
              </div>

              {/* Firmenlogo Block */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                      {logoPreview || logoUrl ? (
                        <img
                          src={logoPreview || logoUrl}
                          alt="Firmenlogo"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Building2 className="text-gray-400" />
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-medium text-[#1b1f23]">
                        Firmenlogo (aus Profil)
                      </div>
                      <div className="text-xs text-gray-600">
                        Wird später im Report verwendet.{" "}
                        <span className="text-red-500">*</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/png"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setLogoFile(file);

                          if (file) {
                            try {
                              const preview = URL.createObjectURL(file);
                              setLogoPreview(preview);
                            } catch {
                              setLogoPreview("");
                            }
                          } else {
                            setLogoPreview("");
                          }
                        }}
                        className="w-[280px] max-w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-[#1b1f23] file:px-4 file:py-2.5 file:text-white file:font-medium hover:file:opacity-90"
                      />
                    </div>

                    {touched && !logoFile && !isNonEmpty(logoUrl) && (
                      <p className="text-xs text-red-600">
                        Bitte lade dein Firmenlogo als PNG hoch.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pflichtfelder-Hinweis */}
              <p className="text-xs text-gray-500">* Pflichtfelder</p>

              {/* CTA */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => {
                    setTouched(true);
                    if (!canContinueStep1) return;
                    setStep(2);
                  }}
                  className={[
                    "inline-flex items-center gap-3 rounded-2xl px-6 py-4 font-medium shadow-sm transition",
                    canContinueStep1
                      ? "bg-[#7eb6b8] text-[#1b1f23] hover:opacity-90"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed",
                  ].join(" ")}
                >
                  Weiter zu den Themenblöcken
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* STEP 2 – Blöcke */}
        {step === 2 && (
          <>
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#1b1f23]">
                  Themenblöcke auswählen
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  Du kannst Blöcke aktivieren/deaktivieren, die Reihenfolge
                  festlegen und eigene Blöcke hinzufügen.
                </p>
              </div>

              <Button
                onClick={() => setStep(1)}
                variant="secondary"
                className="h-10"
              >
                Zurück
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
              <Button onClick={addBlock} variant="secondary" className="h-11">
                <Plus size={18} className="mr-2" />
                Eigenen Block hinzufügen
              </Button>

              <div className="text-sm text-gray-600">
                Tipp: Zieh die Blöcke am Griff-Icon, um die Reihenfolge zu ändern.
              </div>
            </div>

            <div className="mt-8">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
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
            </div>
          </>
        )}
      </div>

      {/* Footer / Hinweis + CTA */}
      <div className="mt-10 flex items-center justify-between">
        <div className="text-xs text-gray-500">
        </div>
      </div>

     
    </>
  );
}
