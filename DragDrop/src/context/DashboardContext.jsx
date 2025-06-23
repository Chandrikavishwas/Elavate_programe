import { createContext, useContext, useReducer, useEffect } from 'react';

const DashboardContext = createContext();

const initialState = {
  widgets: [],
  availableWidgets: [
    { id: 'clock', name: 'Clock',  type: 'clock' },
    { id: 'notes', name: 'Notes',  type: 'notes' },
    { id: 'todo', name: 'To-do List',  type: 'todo' },
    { id: 'calendar', name: 'Calendar',  type: 'calendar' }
  ],
  draggedWidget: null,
  isDragging: false
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'ADD_WIDGET':
      const newWidget = {
        id: `${action.payload.type}-${Date.now()}`,
        type: action.payload.type,
        name: action.payload.name,
        position: { x: action.payload.x || 0, y: action.payload.y || 0 },
        size: { width: 300, height: 250 },
        color: getRandomColor(),
        data: getInitialWidgetData(action.payload.type)
      };
      return {...state, widgets: [...state.widgets, newWidget]};

    case 'REMOVE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter(widget => widget.id !== action.payload)
      };

    case 'UPDATE_WIDGET_POSITION':
      return {
        ...state,
        widgets: state.widgets.map(widget =>
          widget.id === action.payload.id
            ? { ...widget, position: action.payload.position }
            : widget
        )
      };

    case 'UPDATE_WIDGET_DATA':
      return {
        ...state,
        widgets: state.widgets.map(widget =>
          widget.id === action.payload.id
            ? { ...widget, data: { ...widget.data, ...action.payload.data } }
            : widget
        )
      };

    case 'SET_DRAGGED_WIDGET':
      return {
        ...state,
        draggedWidget: action.payload,
        isDragging: !!action.payload
      };

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        widgets: action.payload || []
      };

    default:
      return state;
  }
}

function getRandomColor() {
  const colors = ['pink', 'purple', 'blue', 'green', 'orange'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getInitialWidgetData(type) {
  switch (type) {
    case 'notes':
      return { content: 'Click to add your notes...' };
    case 'todo':
      return { items: [], newItem: '' };
    case 'calendar':
      return { selectedDate: new Date().toISOString().split('T')[0] };
    default:
      return {};
  }
}

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-widgets');
    if (saved) {
      try {
        const widgets = JSON.parse(saved);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: widgets });
      } catch (error) {
        console.error('Failed to load dashboard from storage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-widgets', JSON.stringify(state.widgets));
  }, [state.widgets]);

  const addWidget = (widgetType, position) => {
    const widgetTemplate = state.availableWidgets.find(w => w.type === widgetType);
    if (widgetTemplate) {
      dispatch({
        type: 'ADD_WIDGET',
        payload: {
          type: widgetType,
          name: widgetTemplate.name,
          x: position?.x,
          y: position?.y
        }
      });
    }
  };

  const removeWidget = (widgetId) => {
    dispatch({ type: 'REMOVE_WIDGET', payload: widgetId });
  };

  const updateWidgetPosition = (widgetId, position) => {
    dispatch({
      type: 'UPDATE_WIDGET_POSITION',
      payload: { id: widgetId, position }
    });
  };

  const updateWidgetData = (widgetId, data) => {
    dispatch({
      type: 'UPDATE_WIDGET_DATA',
      payload: { id: widgetId, data }
    });
  };

  const setDraggedWidget = (widget) => {
    dispatch({ type: 'SET_DRAGGED_WIDGET', payload: widget });
  };

  const value = {
    ...state,
    addWidget,
    removeWidget,
    updateWidgetPosition,
    updateWidgetData,
    setDraggedWidget
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}