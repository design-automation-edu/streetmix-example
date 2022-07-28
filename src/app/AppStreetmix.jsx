import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'
import InfoBubble from '../info_bubble/InfoBubble'
import PaletteContainer from '../palette/PaletteContainer'
import EnvironmentEditor from '../streets/EnvironmentEditor'
import SegmentDragLayer from '../segments/SegmentDragLayer'
import DebugHoverPolygon from '../info_bubble/DebugHoverPolygon'
import StreetView from './StreetView'
import { setStreetSectionTop } from './window_resize'

export function AppStreetmix () {
  useEffect(() => {
    setStreetSectionTop()
  }, [])
  return (
      <DndProvider
        backend={MultiBackend}
        options={HTML5toTouch}
        context={window}
      >
        <div className="main-screen">

          <StreetView />
        </div>
      </DndProvider>
  )
}

          // <InfoBubble />
          // <DebugHoverPolygon />
          // <PaletteContainer />
          // <EnvironmentEditor />
          // <SegmentDragLayer />