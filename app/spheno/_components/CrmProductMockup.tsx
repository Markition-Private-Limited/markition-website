'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Users, 
  PhoneCall, 
  MessageSquare, 
  MessageCircle, 
  ArrowUpRight, 
  Sparkles, 
  Clock,
  ShieldCheck,
  ChevronRight,
  Zap,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface LeadItem {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  source: 'voice' | 'chat' | 'whatsapp';
  sourceLabel: string;
  inquiry: string;
  value: string;
  aiScore: number;
  status: 'Won' | 'Booked' | 'In Progress';
  time: string;
}

export const CrmProductMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'attribution'>('pipeline');
  const [selectedLeadId, setSelectedLeadId] = useState<string>('lead-1');

  const leads: LeadItem[] = [
    {
      id: 'lead-1',
      name: 'Marcus Vance',
      avatar: 'MV',
      avatarBg: 'bg-indigo-600 text-white',
      source: 'voice',
      sourceLabel: 'Voice',
      inquiry: 'Emergency Dental Implant Consultation',
      value: '$4,850',
      aiScore: 98,
      status: 'Won',
      time: 'Just now'
    },
    {
      id: 'lead-2',
      name: 'Sarah Jenkins',
      avatar: 'SJ',
      avatarBg: 'bg-emerald-600 text-white',
      source: 'whatsapp',
      sourceLabel: 'WhatsApp',
      inquiry: 'Full Veneer Package Re-engagement',
      value: '$3,200',
      aiScore: 94,
      status: 'Booked',
      time: '6m ago'
    },
    {
      id: 'lead-3',
      name: 'Dr. David Chen',
      avatar: 'DC',
      avatarBg: 'bg-sky-600 text-white',
      source: 'chat',
      sourceLabel: 'Chat',
      inquiry: 'Practice AI Workflow Integration',
      value: '$6,400',
      aiScore: 91,
      status: 'Booked',
      time: '18m ago'
    }
  ];

  return (
    <div className="relative w-full h-[470px] sm:h-[510px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF2F6] border border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)] p-4 sm:p-6 flex flex-col justify-between select-none group font-sans">
      
      {/* Background Subtle Accent Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-400/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================= */}
      {/* 1. TOP HEADER & LIVE SYNC STATUS                          */}
      {/* ========================================================= */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0018C5] to-[#0070F3] flex items-center justify-center text-white shadow-xs shrink-0">
            <Zap className="w-4 h-4 text-cyan-200" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#0018C5] uppercase tracking-wider">
              <span>SPHENO CRM</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-normal">Intelligence Engine</span>
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight truncate">
              Unified Revenue &amp; Pipeline Dashboard
            </h4>
          </div>
        </div>

        {/* Live Sync Beacon Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-700 text-[11px] font-mono font-bold shrink-0 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline">LIVE SYNC ACTIVE</span>
          <span className="sm:hidden">LIVE</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. THREE KEY METRIC CARDS                                 */}
      {/* ========================================================= */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 my-1">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 truncate">
              Total Pipeline
            </span>
            <span className="p-0.5 rounded bg-blue-50 text-[#0018C5] hidden sm:inline">
              <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            $548,200
          </div>
          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] font-semibold text-emerald-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+34.2%</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 truncate">
              AI Inbounds
            </span>
            <span className="p-0.5 rounded bg-indigo-50 text-indigo-600 hidden sm:inline">
              <Users className="w-3 h-3" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-indigo-900 tracking-tight">
            1,420
          </div>
          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] font-semibold text-indigo-600 truncate">
            <ShieldCheck className="w-3 h-3 text-indigo-500" />
            <span>100% Attribution</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 truncate">
              Auto-Booking
            </span>
            <span className="p-0.5 rounded bg-emerald-50 text-emerald-600 hidden sm:inline">
              <Sparkles className="w-3 h-3" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            44.6%
          </div>
          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] font-semibold text-emerald-600 truncate">
            <Clock className="w-3 h-3" />
            <span>Zero Latency</span>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. DUAL-PANE: ATTRIBUTION + REAL-TIME LEAD PIPELINE       */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
        
        {/* Left: Multi-Touch Attribution (5 Cols) */}
        <div className="sm:col-span-5 bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h5 className="text-[11px] font-mono font-bold text-slate-900 uppercase tracking-wider">
                Multi-Touch Attribution
              </h5>
              <span className="text-[10px] text-slate-400 font-mono">Live</span>
            </div>

            <div className="space-y-2.5">
              {/* Spheno Voice */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <PhoneCall className="w-3 h-3 text-[#0018C5]" />
                    <span className="truncate">Spheno Voice</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">48%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0018C5] to-[#2563EB] rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              {/* Spheno Chat */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MessageSquare className="w-3 h-3 text-sky-500" />
                    <span className="truncate">Spheno Chat</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">32%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>

              {/* Spheno WhatsApp */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MessageCircle className="w-3 h-3 text-emerald-500" />
                    <span className="truncate">Spheno WhatsApp</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">20%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">EMR / Calendar Sync</span>
            <span className="font-mono font-bold text-emerald-600">Active</span>
          </div>
        </div>

        {/* Right: Autonomous Lead Score & Pipeline Sync (7 Cols) */}
        <div className="sm:col-span-7 bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-[11px] font-mono font-bold text-slate-900 uppercase tracking-wider">
                Autonomous Lead Pipeline
              </h5>
              <span className="text-[10px] font-mono text-slate-400">
                3 Qualified
              </span>
            </div>

            <div className="space-y-1.5">
              {leads.map((lead) => {
                const isSelected = selectedLeadId === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-50/70 border-[#0018C5]/40 shadow-xs'
                        : 'bg-[#FAFBFD] border-slate-200/80 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-7 h-7 rounded-full ${lead.avatarBg} flex items-center justify-center text-[10px] font-bold shrink-0`}>
                        {lead.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {lead.name}
                          </span>
                          <span className="text-[9px] text-slate-400 hidden sm:inline">
                            • {lead.time}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {lead.inquiry}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 text-right">
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-900">
                          {lead.value}
                        </div>
                        <div className="text-[9px] font-mono font-bold text-emerald-600">
                          Score: {lead.aiScore}
                        </div>
                      </div>

                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        lead.status === 'Won'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Direct autonomous booking</span>
            <span className="font-semibold text-[#0018C5] flex items-center gap-0.5 hover:underline cursor-pointer">
              <span>View Pipeline</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
