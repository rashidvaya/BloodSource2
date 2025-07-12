import { Button } from "@/components/ui/button";
import { 
  Home, 
  Layers, 
  Mail, 
  FileText, 
  Layers3, 
  Grid3x3, 
  Map, 
  BarChart3, 
  File, 
  Stamp, 
  Shield,
  ChevronRight,
  Box
} from "lucide-react";

interface SidebarItem {
  icon: any;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
}

interface SidebarSection {
  section: string;
  items: SidebarItem[];
}

export default function DashboardSidebar() {
  const sidebarItems: SidebarSection[] = [
    {
      section: "MAIN",
      items: [
        { icon: Home, label: "Dashboards", active: true, hasSubmenu: true },
        { icon: Layers, label: "Widgets" },
      ]
    },
    {
      section: "GENERAL",
      items: [
        { icon: Mail, label: "Components", hasSubmenu: true },
        { icon: Box, label: "Elements", hasSubmenu: true },
        { icon: FileText, label: "Forms", hasSubmenu: true },
        { icon: Layers3, label: "Advanced UI", hasSubmenu: true },
        { icon: Grid3x3, label: "Basic UI", hasSubmenu: true },
      ]
    },
    {
      section: "LEVELS",
      items: [
        { icon: FileText, label: "NestedMenu", hasSubmenu: true },
      ]
    },
    {
      section: "MAPS & CHARTS",
      items: [
        { icon: Map, label: "Maps", hasSubmenu: true },
        { icon: BarChart3, label: "Charts", hasSubmenu: true },
      ]
    },
    {
      section: "PAGES",
      items: [
        { icon: File, label: "Pages", hasSubmenu: true },
        { icon: Stamp, label: "Stamp", hasSubmenu: true },
        { icon: Shield, label: "Authentication", hasSubmenu: true },
      ]
    },
  ];

  return (
    <div className="w-64 bg-dark-bg border-r border-gray-700 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Box className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-lg font-semibold">synto</span>
        </div>
        
        <div className="space-y-6">
          {sidebarItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-gray-400 text-sm font-medium mb-3">{section.section}</h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant="ghost"
                    className={`w-full justify-start px-3 py-2 h-auto ${
                      item.active 
                        ? "text-white bg-gray-700" 
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.hasSubmenu && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
