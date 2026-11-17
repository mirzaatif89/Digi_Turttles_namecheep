import {
  Bot,
  Camera,
  ChartNoAxesCombined,
  Code2,
  Gem,
  Globe,
  GraduationCap,
  Megaphone,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShoppingCart,
  Sparkles,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/cms/schema";

export const SERVICE_ICONS: Record<IconName, LucideIcon> = {
  Target,
  Megaphone,
  Bot,
  Search,
  Gem,
  GraduationCap,
  ChartNoAxesCombined,
  Palette,
  Code2,
  Camera,
  Video,
  PenTool,
  Rocket,
  ShoppingCart,
  Globe,
  Sparkles,
};

export function serviceIcon(name: string | undefined): LucideIcon {
  return SERVICE_ICONS[name as IconName] ?? Sparkles;
}
