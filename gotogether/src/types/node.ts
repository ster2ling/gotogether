export interface TripNode {
  id: string;
  lat: number;
  lng: number;
  type: "lodging" | "activity" | "flight" | "restaurant" | "chat" | "task" | "note";
  data: {
    image?: string;
    title: string;
    description?: string;
    price?: number;
    rating?: number;
    actions?: Array<{ label: string; action: () => void }>;
    startTime?: string;
    endTime?: string;
    duration?: number;
    address?: string;
    phone?: string;
    website?: string;
    notes?: string;
    status?: "pending" | "confirmed" | "cancelled";
  };
  position?: {
    x: number;
    y: number;
  };
  isSelected?: boolean;
  isDragging?: boolean;
  isExpanded?: boolean;
}

export interface Connection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  type: "route" | "dependency" | "timeline" | "related";
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface WhiteboardNote {
  id: string;
  x: number;
  y: number;
  content: string;
  color: string;
  type: "note" | "idea" | "reminder";
  isDragging?: boolean;
}

export interface MapState {
  nodes: TripNode[];
  connections: Connection[];
  viewport: MapViewport;
  selectedNodeId: string | null;
  whiteboardNotes: WhiteboardNote[];
  isWhiteboardOpen: boolean;
  isCollaborating: boolean;
}
