import {
  onBodyMouseDown,
  onBodyMouseMove,
  onBodyMouseUp
} from '../segments/drag_and_drop'
// import { onWindowBeforeUnload } from '../util/fetch_nonblocking'
import { onGlobalKeyDown } from './keyboard_commands'
import { onResize } from './window_resize'
import { addPageVisibilityChangeListeners } from './focus'

export function addEventListeners () {
  // window.addEventListener('storage', onStorageChange)

  window.addEventListener('resize', onResize)

  window.addEventListener('pointerdown', onBodyMouseDown)
  window.addEventListener('pointermove', onBodyMouseMove)
  window.addEventListener('pointerup', onBodyMouseUp)
  window.addEventListener('keydown', onGlobalKeyDown)

  // window.addEventListener('beforeunload', onWindowBeforeUnload)

  addPageVisibilityChangeListeners()
}
