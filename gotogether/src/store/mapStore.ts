import { create } from 'zustand'
import { TripNode, Connection, MapViewport, WhiteboardNote, MapState } from '@/types/node'

interface MapStore extends MapState {
  // Actions
  addNode: (node: TripNode) => void
  updateNode: (id: string, updates: Partial<TripNode>) => void
  deleteNode: (id: string) => void
  selectNode: (id: string | null) => void
  
  addConnection: (connection: Connection) => void
  updateConnection: (id: string, updates: Partial<Connection>) => void
  deleteConnection: (id: string) => void
  
  updateViewport: (viewport: Partial<MapViewport>) => void
  
  addWhiteboardNote: (note: WhiteboardNote) => void
  updateWhiteboardNote: (id: string, updates: Partial<WhiteboardNote>) => void
  deleteWhiteboardNote: (id: string) => void
  
  toggleWhiteboard: () => void
  setCollaborating: (collaborating: boolean) => void
  
  // Bulk operations
  setNodes: (nodes: TripNode[]) => void
  setConnections: (connections: Connection[]) => void
  setWhiteboardNotes: (notes: WhiteboardNote[]) => void
  
  // Collaboration
  syncWithCollaborators: (data: Partial<MapState>) => void
}

export const useMapStore = create<MapStore>((set, get) => ({
  // Initial state
  nodes: [],
  connections: [],
  viewport: {
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 12,
    pitch: 45,
    bearing: 0
  },
  selectedNodeId: null,
  whiteboardNotes: [],
  isWhiteboardOpen: false,
  isCollaborating: false,

  // Node actions
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),

  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, ...updates } : node
    )
  })),

  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== id),
    connections: state.connections.filter(
      conn => conn.fromNodeId !== id && conn.toNodeId !== id
    ),
    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
  })),

  selectNode: (id) => set({ selectedNodeId: id }),

  // Connection actions
  addConnection: (connection) => set((state) => ({
    connections: [...state.connections, connection]
  })),

  updateConnection: (id, updates) => set((state) => ({
    connections: state.connections.map(conn => 
      conn.id === id ? { ...conn, ...updates } : conn
    )
  })),

  deleteConnection: (id) => set((state) => ({
    connections: state.connections.filter(conn => conn.id !== id)
  })),

  // Viewport actions
  updateViewport: (viewport) => set((state) => ({
    viewport: { ...state.viewport, ...viewport }
  })),

  // Whiteboard actions
  addWhiteboardNote: (note) => set((state) => ({
    whiteboardNotes: [...state.whiteboardNotes, note]
  })),

  updateWhiteboardNote: (id, updates) => set((state) => ({
    whiteboardNotes: state.whiteboardNotes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    )
  })),

  deleteWhiteboardNote: (id) => set((state) => ({
    whiteboardNotes: state.whiteboardNotes.filter(note => note.id !== id)
  })),

  toggleWhiteboard: () => set((state) => ({
    isWhiteboardOpen: !state.isWhiteboardOpen
  })),

  setCollaborating: (collaborating) => set({ isCollaborating: collaborating }),

  // Bulk operations
  setNodes: (nodes) => set({ nodes }),
  setConnections: (connections) => set({ connections }),
  setWhiteboardNotes: (notes) => set({ whiteboardNotes: notes }),

  // Collaboration
  syncWithCollaborators: (data) => set((state) => ({
    ...state,
    ...data
  }))
}))

// Selectors for optimized re-renders
export const useNodes = () => useMapStore(state => state.nodes)
export const useConnections = () => useMapStore(state => state.connections)
export const useViewport = () => useMapStore(state => state.viewport)
export const useSelectedNode = () => useMapStore(state => 
  state.nodes.find(node => node.id === state.selectedNodeId)
)
export const useWhiteboardNotes = () => useMapStore(state => state.whiteboardNotes)
export const useIsWhiteboardOpen = () => useMapStore(state => state.isWhiteboardOpen)
export const useIsCollaborating = () => useMapStore(state => state.isCollaborating)

// Action selectors - use individual selectors to avoid object recreation
export const useAddNode = () => useMapStore(state => state.addNode)
export const useUpdateNode = () => useMapStore(state => state.updateNode)
export const useDeleteNode = () => useMapStore(state => state.deleteNode)
export const useSelectNode = () => useMapStore(state => state.selectNode)
export const useAddConnection = () => useMapStore(state => state.addConnection)
export const useUpdateConnection = () => useMapStore(state => state.updateConnection)
export const useDeleteConnection = () => useMapStore(state => state.deleteConnection)
export const useUpdateViewport = () => useMapStore(state => state.updateViewport)
export const useAddWhiteboardNote = () => useMapStore(state => state.addWhiteboardNote)
export const useUpdateWhiteboardNote = () => useMapStore(state => state.updateWhiteboardNote)
export const useDeleteWhiteboardNote = () => useMapStore(state => state.deleteWhiteboardNote)
export const useToggleWhiteboard = () => useMapStore(state => state.toggleWhiteboard)
export const useSetCollaborating = () => useMapStore(state => state.setCollaborating)
export const useSetNodes = () => useMapStore(state => state.setNodes)
export const useSetConnections = () => useMapStore(state => state.setConnections)
export const useSetWhiteboardNotes = () => useMapStore(state => state.setWhiteboardNotes)
export const useSyncWithCollaborators = () => useMapStore(state => state.syncWithCollaborators)
