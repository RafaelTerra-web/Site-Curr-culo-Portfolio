import {
  BarChart3,
  Building2,
  Calendar,
  Camera,
  Code2,
  Droplets,
  FileQuestion,
  FileText,
  GitBranch,
  HardHat,
  Home,
  Map,
  Monitor,
  Route,
  Ruler,
  Terminal,
  Users,
  Wallet,
  Workflow,
} from 'lucide-react'

const icons = {
  BarChart3,
  Building2,
  Calendar,
  Camera,
  Code2,
  Droplets,
  FileText,
  GitBranch,
  HardHat,
  Home,
  Map,
  Monitor,
  Road: Route,
  Ruler,
  Terminal,
  Users,
  Wallet,
  Workflow,
}

export function getIcon(name) {
  return icons[name] || FileQuestion
}
