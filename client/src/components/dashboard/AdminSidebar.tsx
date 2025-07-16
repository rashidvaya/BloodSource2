import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../../assets/logo white.svg";

// TypeScript types for props
interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Sidebar structure as data
const sidebarSections = [
  {
    header: "🧭 Dashboard",
    items: [
      { label: "Business Overview", emoji: "📈" },
      { label: "Custom Widget Builder", emoji: "🧱" },
      { label: "System Health Status", emoji: "🖥️" },
      { label: "AI Watchdog Summary", emoji: "👁️‍🗨️" },
      { label: "Behavior Heatmaps", emoji: "🔥" },
      { label: "Smart Suggestions Panel", emoji: "💡" },
      { label: "Quick Actions", emoji: "⚡", children: [
        { label: "Backup Now", emoji: "💾" },
        { label: "Send Announcement", emoji: "📣" },
        { label: "Lock System", emoji: "🔒" },
        { label: "Restart Server", emoji: "🔁" },
      ]},
    ]
  },
  {
    header: "🧑‍💼 Owner Control Center",
    items: [
      { label: "System Configuration", emoji: "⚙️" },
      { label: "Feature Toggles", emoji: "🎛️" },
      { label: "Feature Flags (Beta)", emoji: "🧪" },
      { label: "Backup & Restore", emoji: "📦" },
      { label: "Kill Switch / Panic Mode", emoji: "🛑" },
      { label: "Maintenance Mode", emoji: "🛠️" },
      { label: "Environment Cloner", emoji: "🧬" },
      { label: "Emergency Controls", emoji: "🚨", children: [
        { label: "Lock Admins", emoji: "🚫" },
        { label: "Force Logout", emoji: "🚷" },
        { label: "Trigger Critical Logs", emoji: "📄" },
      ]},
      { label: "Ghost Mode", emoji: "👻" },
      { label: "AI Incident Advisor", emoji: "🧠" },
      { label: "Magic Setup (Auto-configure dashboard)", emoji: "✨" },
    ]
  },
  {
    header: "🌐 Website Settings",
    items: [
      { label: "General Info", emoji: "📝" },
      { label: "Appearance / Branding", emoji: "🎨" },
      { label: "Domain & SEO", emoji: "🔗" },
      { label: "Legal Pages", emoji: "📜" },
      { label: "Home Page Editor", emoji: "🏠" },
    ]
  },
  {
    header: "📑 Audit & Logs",
    items: [
      { label: "View All Logs", emoji: "📂" },
      { label: "Filter by Date / Role / Action", emoji: "🗓️" },
      { label: "Export Logs (CSV, PDF, JSON)", emoji: "📤" },
      { label: "Error Logs", emoji: "❌" },
      { label: "API Logs", emoji: "🔌" },
      { label: "Email Logs", emoji: "📧" },
      { label: "Cron Job Logs", emoji: "⏲️" },
      { label: "AI Log Summaries", emoji: "🧠" },
    ]
  },
  {
    header: "🧑‍🤝‍🧑 Role Management",
    items: [
      { label: "Role List & Hierarchy", emoji: "📋" },
      { label: "Discord-style Role Editor", emoji: "🛠️" },
      { label: "Role Tags & Themes", emoji: "🏷️" },
      { label: "Role Inheritance System", emoji: "🪜" },
      { label: "Create Custom Roles", emoji: "🧑‍🎨" },
      { label: "Action Limits Per Role", emoji: "⛔" },
      { label: "Time-Locked Role Access", emoji: "⏳" },
      { label: "Shadow Roles (invisible)", emoji: "👥" },
      { label: "Assign Users to Roles", emoji: "✅" },
    ]
  },
  {
    header: "📊 Analytics",
    items: [
      { label: "Traffic Overview", emoji: "🚦" },
      { label: "User Journey Flow", emoji: "🧭" },
      { label: "Device & Platform Metrics", emoji: "📱" },
      { label: "Session Duration & Retention", emoji: "⏱️" },
      { label: "Geo Location Heatmap", emoji: "🗺️" },
      { label: "Funnel Drop-off Analysis", emoji: "🧮" },
      { label: "Revenue & Monetization", emoji: "💰" },
      { label: "AI-Based User Predictions", emoji: "🤖" },
      { label: "Custom KPIs Tracker", emoji: "🎯" },
    ]
  },
  {
    header: "👤 Users",
    items: [
      { label: "All Users", emoji: "👥" },
      { label: "Roles & Groups", emoji: "🧑‍💼" },
      { label: "Suspended / Banned Users", emoji: "🚫" },
      { label: "Moderation History", emoji: "🕵️" },
      { label: "Activity History", emoji: "📜" },
      { label: "Trainee Progress Tracker", emoji: "🧗" },
    ]
  },
  {
    header: "🛡️ Moderation Tools",
    items: [
      { label: "Flagged Content", emoji: "🚩" },
      { label: "Reported Users", emoji: "🧾" },
      { label: "Comment Review", emoji: "💬" },
      { label: "Ban / Block List", emoji: "⛔" },
      { label: "Case Files (per user)", emoji: "📁" },
      { label: "Case Review Panel", emoji: "👨‍⚖️" },
      { label: "Moderator Scoreboard (Gamified)", emoji: "🏆" },
      { label: "Override Mod Decisions", emoji: "📝" },
      { label: "AI Auto-Flagger", emoji: "🤖" },
    ]
  },
  {
    header: "🧩 Admin Panel Settings",
    items: [
      { label: "Admin Roles & Permissions", emoji: "🛡️" },
      { label: "Security & Login (2FA, Session History)", emoji: "🔐" },
      { label: "System Preferences", emoji: "⚙️" },
      { label: "Localization", emoji: "🌍" },
      { label: "Developer Tools Panel", emoji: "🧑‍💻" },
      { label: "Changelog Viewer", emoji: "📜" },
      { label: "Progressive Disclosure UX Settings", emoji: "🧊" },
    ]
  },
  {
    header: "🏢 Office Management",
    items: [
      { label: "Teams", emoji: "👨‍👩‍👧‍👦" },
      { label: "Tasks & Calendar", emoji: "📅" },
      { label: "Documents", emoji: "📄" },
      { label: "HR / Payroll", emoji: "💼" },
      { label: "Meeting Room Booking", emoji: "🏛️" },
    ]
  },
  {
    header: "📣 Announcements",
    items: [
      { label: "Create Announcement", emoji: "✍️" },
      { label: "Scheduled Announcements", emoji: "📆" },
      { label: "Sent Messages", emoji: "📤" },
      { label: "Audience Filters", emoji: "🎯" },
      { label: "Engagement Stats (Read %)", emoji: "📊" },
      { label: "Announcement Feedback (Reactions)", emoji: "😃" },
    ]
  },
  {
    header: "🆘 Support Center",
    items: [
      { label: "Open Tickets", emoji: "📥" },
      { label: "Resolved Tickets", emoji: "✅" },
      { label: "Help Docs / FAQs Editor", emoji: "📚" },
      { label: "Auto-Reply Settings", emoji: "🤖" },
      { label: "AI-Suggested Ticket Replies", emoji: "💬" },
      { label: "Internal Support Chat (Admins Only)", emoji: "💬" },
    ]
  },
  {
    header: "🎉 Community & Fun",
    items: [
      { label: "Mini Games", emoji: "🎮" },
      { label: "Leaderboard (Engagement)", emoji: "🏆" },
      { label: "Meme Wall", emoji: "😂" },
      { label: "Quiz & Trivia", emoji: "❓" },
      { label: "Music / Radio Stream", emoji: "🎵" },
    ]
  },
  {
    header: "🧠 AI Assistant",
    items: [
      { label: "Chat Interface", emoji: "💬" },
      { label: "Help Center Search", emoji: "🔍" },
      { label: "Quick Commands", emoji: "⚡" },
      { label: "Summarize Logs / Reports", emoji: "📄" },
      { label: "Natural Language Dashboard Queries", emoji: "🤖" },
    ]
  },
  {
    header: "🧾 System Logs",
    items: [
      { label: "Error Logs", emoji: "❗" },
      { label: "API Usage", emoji: "🔌" },
      { label: "Email Logs", emoji: "📧" },
      { label: "Cron Jobs", emoji: "⏲️" },
    ]
  },
  {
    header: "👨‍🏫 Trainee Zone",
    items: [
      { label: "Moderation Sandbox (Simulated)", emoji: "🧪" },
      { label: "Task & Skill Checklist", emoji: "✅" },
      { label: "Mentor Evaluation Panel", emoji: "🧑‍🏫" },
      { label: "Badge & Progression System", emoji: "🏅" },
    ]
  },
  {
    header: "⚙️ Settings",
    items: [
      { label: "General Settings", emoji: "🔧" },
      { label: "Theme & Appearance", emoji: "🎨", children: [
        { label: "Light / Dark Mode", emoji: "🌞/🌙" },
        { label: "Primary / Secondary Colors", emoji: "🎯" },
        { label: "Font & Spacing", emoji: "🔤" },
        { label: "Boxed / Full-width Layout", emoji: "📐" },
      ]},
      { label: "Localization", emoji: "🌐" },
      { label: "Email & Notification Settings", emoji: "📧" },
      { label: "Authentication", emoji: "🔐" },
      { label: "Privacy & Compliance", emoji: "🔒" },
      { label: "Feature Flags", emoji: "🧪" },
      { label: "API & Webhooks", emoji: "🔗" },
      { label: "Backup & Restore", emoji: "💾" },
    ]
  },
  {
    header: "🔔 Notifications Center",
    items: [
      { label: "System Alerts", emoji: "🚨" },
      { label: "Ticket Updates", emoji: "📬" },
      { label: "Role-Specific Notices", emoji: "🧑‍🏫" },
      { label: "Event Reminders", emoji: "⏰" },
      { label: "Granular Notification Controls", emoji: "⚙️" },
    ]
  },
  {
    header: "🔌 Integrations",
    items: [
      { label: "Connect Tools (Slack, Zapier, Google, etc.)", emoji: "🔗" },
      { label: "API Keys & OAuth", emoji: "🔑" },
      { label: "Sync Status & Logs", emoji: "🔄" },
    ]
  },
];

// SidebarItem component for correct hook usage
function SidebarItem({
  item,
  collapsed,
  openDropdowns,
  toggleDropdown,
  level,
  setActiveTooltip,
  activeTooltip,
  tooltipTimeoutRef,
  setTooltipPos,
  tooltipPos,
  sidebarRef,
  anyDropdownOpen,
  parentIsOpen
}: {
  item: any,
  collapsed: boolean,
  openDropdowns: Record<string, boolean>,
  toggleDropdown: (key: string, level: number) => void,
  level: number,
  setActiveTooltip?: (key: string | null) => void,
  activeTooltip?: string | null,
  tooltipTimeoutRef?: React.MutableRefObject<NodeJS.Timeout | null>,
  setTooltipPos?: (pos: { top: number, left: number } | undefined) => void,
  tooltipPos?: { top: number, left: number },
  sidebarRef?: React.RefObject<HTMLDivElement>,
  anyDropdownOpen?: boolean,
  parentIsOpen?: boolean
}) {
  const hasChildren = !!item.children;
  const dropdownKey = (level === 0 ? `item-${item.label}` : `item-${item.label}-${level}`);
  const isOpen = openDropdowns[dropdownKey] === true;
  const tooltipKey = level === 0 ? `item-tooltip-${item.label}` : null;
  const rowRef = useRef<HTMLDivElement>(null);

  // Dot indicator logic: show dot if item.dot is true (at any level)
  const showDot = item.dot;

  // Indentation and style by level
  let paddingClass = "";
  if (level === 0) paddingClass = "pl-12 py-3";
  else if (level === 1) paddingClass = "pl-16 pr-2 py-2";
  else if (level === 2) paddingClass = "pl-12 pr-2 py-2";
  else if (level === 3) paddingClass = "pl-16 pr-2 py-2";
  else paddingClass = `pl-${(level + 1) * 4} pr-2 py-2`;

  // Active/expanded background for any item
  const activeBg = isOpen ? "bg-[#232e3c] text-white rounded-md" : "";
  // Text color
  const textColor = isOpen ? "text-white" : "text-gray-300";

  return (
    <React.Fragment key={item.label + level}>
      <div
        ref={rowRef}
        className={`
          flex items-center gap-2 transition-colors transition-filter duration-300 ease-in-out group cursor-pointer select-none
          ${paddingClass}
          ${level === 0 ? "font-regular text-[12px]" : "font-normal text-[12px]"}
          ${activeBg}
          ${!activeBg ? "hover:bg-[#232e3c] hover:text-white" : ""}
          ${textColor}
          relative
          ${(!collapsed && anyDropdownOpen && !(isOpen || parentIsOpen)) ? 'blur-[4px]' : ''}
        `}
        tabIndex={0}
        onClick={() => {
          if (hasChildren) toggleDropdown?.(dropdownKey, level + 1);
        }}
        onMouseEnter={e => {
          if (collapsed && level === 0 && setActiveTooltip && tooltipKey) {
            setActiveTooltip(tooltipKey);
            if (tooltipTimeoutRef && tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
            if (setTooltipPos && rowRef.current && sidebarRef && sidebarRef.current) {
              const rect = rowRef.current.getBoundingClientRect();
              const sidebarRect = sidebarRef.current.getBoundingClientRect();
              setTooltipPos({
                top: rect.top + window.scrollY + rect.height / 2,
                left: sidebarRect.left + sidebarRef.current.offsetWidth + 8,
              });
            }
          }
        }}
        onMouseLeave={() => {
          if (collapsed && level === 0 && setActiveTooltip && tooltipKey) {
            setActiveTooltip(null);
            if (tooltipTimeoutRef && tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
            if (setTooltipPos) setTooltipPos(undefined);
          }
        }}
        onMouseDown={e => {
          if (collapsed && level === 0 && setActiveTooltip && tooltipKey) {
            setActiveTooltip(tooltipKey);
            if (tooltipTimeoutRef && tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
            if (tooltipTimeoutRef) tooltipTimeoutRef.current = setTimeout(() => setActiveTooltip(null), 1500);
            if (setTooltipPos && rowRef.current && sidebarRef && sidebarRef.current) {
              const rect = rowRef.current.getBoundingClientRect();
              const sidebarRect = sidebarRef.current.getBoundingClientRect();
              setTooltipPos({
                top: rect.top + window.scrollY + rect.height / 2,
                left: sidebarRect.left + sidebarRef.current.offsetWidth + 8,
              });
            }
          }
        }}
      >
        {/* Icon for every item if emoji is present, match size to text */}
        {item.emoji && (
          <span className={`${level === 0 ? "text-[12px]" : "text-[12px]"} flex-shrink-0`} aria-hidden>
            {item.emoji}
          </span>
        )}
        {/* Label */}
        {!collapsed && (
          <span className="ml-2 flex items-center gap-1">
            {item.label}
            {/* Dot indicator if needed */}
            {showDot && <span className="inline-block w-2 h-2 bg-orange-400 rounded-full ml-1" />}
          </span>
        )}
        {/* Chevron for items with children */}
        {hasChildren && !collapsed && (
          <ChevronDownIcon
            className={`h-4 w-4 ml-auto transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        )}
        {/* Tooltip for collapsed mode */}
        {collapsed && level === 0 && activeTooltip === tooltipKey && tooltipPos !== undefined && (
          <span
            className="fixed z-50 px-4 py-2 rounded-lg bg-gray-900 text-sm font-semibold text-white shadow-xl whitespace-nowrap pointer-events-none transition-opacity duration-300 ease-in-out animate-tooltipPop"
            style={{
              opacity: activeTooltip === tooltipKey ? 1 : 0,
              top: tooltipPos.top,
              left: tooltipPos.left,
              transform: 'translateY(-50%)',
            }}
          >
            {item.label}
          </span>
        )}
      </div>
      {/* Render children if open */}
      {hasChildren && isOpen && (
        <div className="">
          {item.children.map((child: any, idx: number) => (
            <SidebarItem
              key={child.label + (level + 1)}
              item={child}
              collapsed={collapsed}
              openDropdowns={openDropdowns}
              toggleDropdown={toggleDropdown}
              level={level + 1}
              setActiveTooltip={setActiveTooltip}
              activeTooltip={activeTooltip}
              tooltipTimeoutRef={tooltipTimeoutRef}
              setTooltipPos={setTooltipPos}
              tooltipPos={tooltipPos}
              sidebarRef={sidebarRef}
              anyDropdownOpen={anyDropdownOpen}
              parentIsOpen={isOpen || parentIsOpen}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

// Helper to check if an item or any ancestor is open (so the whole open dropdown and all descendants are unblurred)
function isInOpenDropdownPath(dropdownKey: string, openDropdowns: Record<string, boolean>): boolean {
  let key = dropdownKey;
  while (key) {
    if (openDropdowns[key]) return true;
    const lastDash = key.lastIndexOf("-");
    if (lastDash === -1) break;
    key = key.slice(0, lastDash);
  }
  return false;
}

// Render sidebar items recursively
function renderSidebarItems(
  items: any[],
  collapsed: boolean,
  openDropdowns: Record<string, boolean>,
  toggleDropdown: (key: string, level: number) => void,
  level = 0,
  setActiveTooltip?: (key: string | null) => void,
  activeTooltip?: string | null,
  tooltipTimeoutRef?: React.MutableRefObject<NodeJS.Timeout | null>,
  setTooltipPos?: (pos: { top: number, left: number } | undefined) => void,
  tooltipPos?: { top: number, left: number },
  sidebarRef?: React.RefObject<HTMLDivElement>,
  anyDropdownOpen?: boolean,
  parentIsOpen?: boolean
) {
  return items.map((item, idx) => {
    const dropdownKey = (level === 0 ? `item-${item.label}` : `item-${item.label}-${level}`);
    const isOpen = openDropdowns[dropdownKey] === true;
    return (
      <SidebarItem
        key={item.label + level}
        item={item}
        collapsed={collapsed}
        openDropdowns={openDropdowns}
        toggleDropdown={toggleDropdown}
        level={level}
        setActiveTooltip={setActiveTooltip}
        activeTooltip={activeTooltip}
        tooltipTimeoutRef={tooltipTimeoutRef}
        setTooltipPos={setTooltipPos}
        tooltipPos={tooltipPos}
        sidebarRef={sidebarRef}
        anyDropdownOpen={anyDropdownOpen}
        parentIsOpen={parentIsOpen}
      />
    );
  });
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  // Sidebar width: 90px when collapsed, 300px when expanded
  const sidebarWidth = collapsed ? "w-[90px]" : "";
  const sidebarInlineStyle = collapsed ? { width: '90px' } : { width: '300px' };

  // Sidebar ref for dynamic width
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Mobile: toggle sidebar
  const handleMobileToggle = () => setMobileOpen((open: boolean) => !open);

  // Dropdown state (main sections: accordion, children: multi-open)
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  // Close all dropdowns when sidebar is collapsed
  React.useEffect(() => {
    if (collapsed) {
      setOpenDropdowns({});
    }
  }, [collapsed]);

  const toggleDropdown = (key: string, level: number) => {
    setOpenDropdowns((prev) => {
      const isCurrentlyOpen = !!prev[key];
      if (level === 0) {
        if (isCurrentlyOpen) {
          // Closing: close all descendants
          const newState = { ...prev, [key]: false };
          Object.keys(newState).forEach(k => {
            if (k !== key && k.startsWith(key + '-')) {
              delete newState[k];
            }
          });
          return newState;
        } else {
          // Opening: close all other main dropdowns and their descendants
          const newState: Record<string, boolean> = {};
          newState[key] = true;
          return newState;
        }
      } else {
        if (isCurrentlyOpen) {
          // Closing: close all descendants
          const newState = { ...prev, [key]: false };
          Object.keys(newState).forEach(k => {
            if (k !== key && k.startsWith(key + '-')) {
              delete newState[k];
            }
          });
          return newState;
        } else {
          // Opening: just open this child
          return { ...prev, [key]: true };
        }
      }
    });
  };

  // Compute if any dropdown is open
  const anyDropdownOpen = Object.values(openDropdowns).some(Boolean);

  // Logo image click handler: toggle collapsed state
  const handleLogoIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsed((prev) => !prev);
  };

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const tooltipTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number, left: number } | undefined>(undefined);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-[#232e3c] p-2 rounded text-white shadow-lg"
        onClick={handleMobileToggle}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-screen z-30 bg-[#111417] text-white flex flex-col shadow-lg
          transition-[width,transform] duration-400 ease-in-out overflow-visible
          ${sidebarWidth}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
        style={{ transitionProperty: 'width, transform', ...sidebarInlineStyle }}
      >
        <div
          className={`sidebar-logo flex items-center gap-2 h-14 transition-all duration-200 ${collapsed ? "px-2 justify-center text-center" : "px-4 justify-start"}`}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-8 w-8"
            onClick={handleLogoIconClick}
            style={{ cursor: 'pointer' }}
          />
          {/* Only hide the logo text in collapsed mode, never the logo image */}
          {!collapsed && (
            <Link
              to="/dashboard"
              className="text-2xl font-bold tracking-wide text-white transition-opacity duration-200 opacity-100 w-auto ml-2 overflow-hidden hover:text-[#d21919]"
              tabIndex={0}
              onClick={e => e.stopPropagation()}
            >
              BloodSource
            </Link>
          )}
        </div>
        {/* Blur wrapper for all sidebar content except logo */}
        <div className="flex flex-col flex-1 h-full min-h-0">
          <nav className="sidebar-scrollable flex-1 px-2 space-y-4 overflow-y-auto scrollbar-hide">
            {sidebarSections.map((section, idx) => {
              const sectionKey = `section-${section.header}`;
              const sectionOpen = openDropdowns[sectionKey] === true; // default collapsed
              const sectionName = section.header.replace(/^[^ ]+ /, "");
              return (
                <div key={section.header}>
                  {/* Section header: only icon in collapsed mode */}
                  <div
                    className={`flex items-center text-xs font-bold tracking-wider text-gray-400 px-6 mb-1 mt-6 select-none transition-all duration-200 ${collapsed ? "justify-center text-center" : "opacity-100 w-auto"} ${anyDropdownOpen && !sectionOpen ? 'blur-[4px]' : ''}`}
                    onClick={() => {
                      setOpenDropdowns((prev) => {
                        // Accordion: close all other sections and all dropdowns
                        const newState: Record<string, boolean> = {};
                        if (!prev[sectionKey]) newState[sectionKey] = true;
                        return newState;
                      });
                      if (collapsed) {
                        setActiveTooltip(sectionKey);
                        if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
                        tooltipTimeoutRef.current = setTimeout(() => setActiveTooltip(null), 1500);
                      }
                    }}
                    onMouseEnter={() => {
                      if (collapsed) {
                        setActiveTooltip(sectionKey);
                        if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
                      }
                    }}
                    onMouseLeave={() => {
                      if (collapsed) {
                        setActiveTooltip(null);
                        if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
                        setTooltipPos(undefined);
                      }
                    }}
                  >
                    {/* Only show emoji in collapsed mode, full header in expanded mode */}
                    {collapsed ? (
                      <span
                        className="text-lg w-full text-center relative"
                        aria-hidden
                      >
                        {section.header.split(' ')[0]}
                        {/* Custom tooltip on hover or click */}
                        {activeTooltip === sectionKey && (
                          <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-900 text-xs text-white shadow z-50 whitespace-nowrap">
                            {sectionName}
                          </span>
                        )}
                      </span>
                    ) : (
                      <>
                        <span className="flex-1 ml-2">{section.header}</span>
                        <ChevronDownIcon
                          className={`h-4 w-4 ml-2 transition-transform duration-400 ease-in-out ${sectionOpen ? "rotate-180" : "rotate-0"}`}
                        />
                      </>
                    )}
                  </div>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out ${sectionOpen && !collapsed ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                    style={{ transitionProperty: 'max-height, opacity' }}
                  >
                    {sectionOpen && renderSidebarItems(section.items, collapsed, openDropdowns, toggleDropdown, 0, setActiveTooltip, activeTooltip, tooltipTimeoutRef, setTooltipPos, tooltipPos, sidebarRef, anyDropdownOpen, sectionOpen)}
                  </div>
                </div>
              );
            })}
          </nav>
          <div
            className="mt-auto p-4 text-xs text-gray-400 transition-all duration-200 flex flex-col justify-center items-center text-center"
            style={{ minHeight: "48px" }}
          >
            <span>&copy; {new Date().getFullYear()} <span style={{ color: '#d21919' }}>BloodSource</span></span>
          </div>
        </div>
      </aside>
      {/* Overlay for mobile when sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={handleMobileToggle}
        />
      )}
    </>
  );
};

export default AdminSidebar;
